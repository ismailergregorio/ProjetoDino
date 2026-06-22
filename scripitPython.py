from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

import json
import time

URL = "https://dinosaurpictures.org/"

options = Options()
# options.add_argument("--headless=new")  # Descomente para executar sem abrir o navegador

driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=options
)

wait = WebDriverWait(driver, 15)

driver.get(URL)
time.sleep(5)

print("=" * 60)
print("CARREGANDO CATÁLOGO...")
print("=" * 60)

cards_encontrados = set()

while True:
    # Exibe todos os cards carregados até o momento
    cards = driver.find_elements(By.CSS_SELECTOR, ".gallery-item.fade-in")

    for card in cards:
        try:
            nome = card.get_attribute("data-name")
            if nome not in cards_encontrados:
                cards_encontrados.add(nome)
                print(f"[{len(cards_encontrados):4d}] {nome}")
        except:
            pass

    try:
        botao = wait.until(
            EC.element_to_be_clickable((By.ID, "gallery-load-more"))
        )

        driver.execute_script(
            "arguments[0].scrollIntoView({block:'center'});",
            botao
        )

        time.sleep(1)
        driver.execute_script("arguments[0].click();", botao)

        print(f"\n>>> Total carregado: {len(cards_encontrados)}")
        print("-" * 60)
        time.sleep(2)

    except:
        print("\nTodos os cards foram carregados de forma estrutural!")
        break


print("\n[Otimização] Rolando a página para forçar o carregamento das imagens (Lazy Load)...")
# Pegamos todos os cards finais após clicar em todos os botões
cards = driver.find_elements(By.CSS_SELECTOR, ".gallery-item.fade-in")

resultado = []

for i, card in enumerate(cards):
    try:
        nome = card.get_attribute("data-name")
        periodo = card.get_attribute("data-period")
        regiao = card.get_attribute("data-regions")
        dieta = card.get_attribute("data-eats")
        tipo = card.get_attribute("data-type")

        # Rola a tela até o card atual para fazer a imagem carregar
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", card)
        
        # Uma pequena pausa a cada 10 cards para não sobrecarregar e dar tempo de renderizar
        if i % 10 == 0:
            time.sleep(0.2)

        link = card.find_element(By.TAG_NAME, "a").get_attribute("href")

        # Tenta pegar o 'src'. Se estiver vazio ou for um placeholder, tenta pegar o 'data-src'
        img_element = card.find_element(By.CSS_SELECTOR, "img.gallery-item-image")
        imagem = img_element.get_attribute("src")
        
        # Tratamento caso o site use data-src para Lazy Loading
        if not imagem or "placeholder" in imagem or "data:image" in imagem:
            data_src = img_element.get_attribute("data-src")
            if data_src:
                imagem = data_src

        resultado.append({
            "nome": nome,
            "periodo": periodo,
            "regiao": regiao,
            "dieta": dieta,
            "tipo": tipo,
            "pagina": link,
            "imagem": imagem
        })
        
        if i % 20 == 0 or i == len(cards) - 1:
            print(f"Extraindo dados e imagens: {i + 1}/{len(cards)}")

    except Exception as erro:
        print(f"Erro em {nome if 'nome' in locals() else 'Item desconhecido'}: {erro}")

driver.quit()

# Salva tudo no JSON estruturado como lista
with open("imagens.json", "w", encoding="utf-8") as arquivo:
    json.dump(
        resultado,
        arquivo,
        indent=4,
        ensure_ascii=False
    )

print("\n" + "=" * 60)
print(f"Total de dinossauros extraídos com imagem: {len(resultado)}")
print("Arquivo imagens.json criado com sucesso!")
print("=" * 60)