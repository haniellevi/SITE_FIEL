# Plano Estratégico: Transformação Mobile-First (B2B Premium)

A Fiel Alimentos precisa de um ecossistema digital que converta tanto o distribuidor acessando de um computador no escritório quanto o lojista fazendo pedidos pelo celular no galpão. Para isso, a arquitetura deve ser pensada **primeiro para a tela pequena** (Mobile-First) e, em seguida, expandida fluidamente para o Desktop.

## 1. Reestruturação do CSS (Inversão de Media Queries)
Atualmente, o CSS pode ter sido escrito no modelo "Desktop-First" (regras baseadas em telas grandes, com `@media (max-width)` quebrando para mobile).
**Ação:** Inverteremos a lógica.
- **Base CSS:** O código raiz do `styles-v2.css` ditará como o site funciona no celular (telas menores que `768px`). Flexbox em `column`, grid em `1fr`, fontes otimizadas para leitura próxima.
- **Expansão (Desktop):** Usaremos `@media (min-width: 768px)` e `@media (min-width: 1024px)` para expandir colunas, aumentar banners e redistribuir os cartões de dor e inovação em grids lado a lado.
- **Resultado:** Redução no tempo de carregamento no 3G/4G, pois o navegador mobile não precisa ler regras de desktop para depois sobrescrevê-las.

## 2. Experiência de Usuário e "Polegar" (UI/UX)
Compradores B2B são rápidos e objetivos. O uso via celular requer alocação cirúrgica dos botões.
- **Sticky CTA Bottom:** Um botão flutuante discreto, mas fixo na base da tela ("Falar com Consultor" ou ícone do WhatsApp) para que o gatilho de contato esteja sempre a 1 clique de distância, sem precisar "rolar" até o final.
- **Áreas de Toque (Tap Targets):** Aumentar o espaçamento mínimo de todos os links, botões do acordeão (FAQ) e abas da Calculadora para no mínimo **48x48px**. Zero cliques acidentais.
- **Navegação (Hamburger Menu):** Substituir itens textuais complexos por um menu lateral "off-canvas" escorregadio, com fonte em 1.5rem para facilitar o clique com o polegar.

## 3. Adaptação dos Elementos Críticos
- **Hero Section:** No mobile, a ordem deve ser: Etiqueta -> Título -> Parágrafos -> **Logo** -> Botões. O texto prende a atenção, a logo valida a autoridade, o botão aciona. No desktop, mantemos a leitura "Texto na esquerda, Logo na direita" (Z-pattern).
- **Mapa SVG de Distribuição:** Fazer o SVG escalonar automaticamente (`width: 100%; height: auto;`). Se no celular ficar minúsculo, podemos adicionar a funcionalidade "Drag/Pinch-to-zoom" nativa com um trecho em JavaScript, permitindo exploração focada do Nordeste.
- **A Calculadora de Invisibilidade:** Exibir as 3 abas (Mês, Ano, 5 Anos) organizadas em linha (mesmo no mobile), mas com fonte responsiva `clamp()`. O número final gigante (`R$ 120.000`) se ajusta sem vazar da tela do iPhone SE ou Galaxy antigo.

## 4. Performance Bruta B2B (Métricas Google)
- Promover "Lazy Loading" agressivo nas imagens da matriz e certificados, garantindo pontuação máxima (\>90) no Google PageSpeed Insights Mobile. Em B2B, um site de carregamento instantâneo passa imagem de uma operação logística eficiente.

## 5. Próximos Passos Imediatos
1. Fazer backup da branch atual do `styles-v2.css`.
2. Extrair e padronizar variáveis CSS de grid e tipografia.
3. Reordenar a cascata do CSS para `min-width`.
4. Implementar testes táteis com ferramentas de dev mobile.
