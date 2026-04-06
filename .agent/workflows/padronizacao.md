---
description: Garantir que o agente sempre consulte as skills disponíveis e siga para outputs do usuario.
---

### 1. Consultar Skills
Antes de iniciar qualquer tarefa de desenvolvimento, SEMPRE:
- Verificar o diretório `.agent/skills/` para ver quais skills estão disponíveis
- Ler as skills relevantes para a tarefa em questão
- Seguir as melhores práticas e padrões definidos nas skills

### 2. Idioma
- Todas as respostas, explicações e comunicações devem ser em **português brasileiro (pt-BR)**
- Comentários no código podem permanecer em inglês.
- Mensagens de commit, documentação e READMEs devem ser em português brasileiro

### 3. Design System

- Seguir estritamente o design system do projeto localizado em /client/src/index.css
- Verificar tokens de cores, tipografia, espaçamentos e componentes antes de implementar qualquer interface
- Nunca criar variantes ou estilos customizados sem consultar primeiro o design system
- Reutilize componentes existentes, não crie componentes novos antes de verificar se já existe um que serve para finalidade semelhante e possa ser reaproveitado.