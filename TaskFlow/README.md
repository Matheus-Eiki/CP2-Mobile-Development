# TaskFlow — Gerenciador de Tarefas

Aplicativo mobile desenvolvido com **React Native, Expo e TypeScript**, criado para facilitar a organização e o acompanhamento de tarefas por meio de uma interface simples, intuitiva e adaptável aos temas claro e escuro.

## 📋 Sobre o projeto

O TaskFlow é um aplicativo de gerenciamento de tarefas que permite visualizar, cadastrar, editar, consultar detalhes e excluir tarefas. A aplicação possui navegação por abas, autenticação com usuário de demonstração e armazenamento local para preservar os dados entre sessões.

O projeto foi desenvolvido utilizando React Native com Expo e React Navigation, permitindo sua execução em dispositivos móveis e no navegador.

## ✨ Funcionalidades

### Autenticação
- Tela de login com credenciais de demonstração predefinidas.
- Validação das credenciais informadas.
- Acesso às telas principais após a autenticação.
- Opção de sair da conta.
- Persistência local da sessão, conforme a implementação de autenticação.

**Credenciais de demonstração**

| Campo | Valor |
|---|---|
| E-mail | `demo@taskapp.com` |
| Senha | `123456` |

Essas credenciais são fixas e não podem ser alteradas pela interface do aplicativo. Para modificá-las, seria necessário alterar a implementação de autenticação no código-fonte.

### Gerenciamento de tarefas
- Cadastro de novas tarefas.
- Listagem das tarefas cadastradas.
- Visualização dos detalhes de uma tarefa.
- Edição de tarefas existentes.
- Exclusão de tarefas com confirmação.
- Filtragem por status.
- Exibição de mensagens quando não existem tarefas ou quando nenhum resultado corresponde ao filtro.

### Página inicial
- Visão geral das tarefas.
- Resumo das tarefas por status.
- Acesso à listagem completa de tarefas.

### Personalização
- Tema claro e tema escuro.
- Cores compartilhadas entre telas e componentes.
- Salvamento local da preferência de tema.

### Armazenamento local
O AsyncStorage é utilizado para armazenar dados localmente, de acordo com a implementação de cada funcionalidade, incluindo a preferência de tema e os dados de tarefas e autenticação.

Os dados ficam associados ao armazenamento do aplicativo ou navegador em que foram salvos. Não há garantia de sincronização automática entre diferentes dispositivos.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| React Native | Desenvolvimento da interface multiplataforma |
| Expo | Execução e desenvolvimento do aplicativo |
| TypeScript | Tipagem estática e organização do código |
| React Navigation | Navegação entre telas e abas |
| AsyncStorage | Persistência local de dados |
| React Hooks | Gerenciamento de estado e lógica reutilizável |
| JavaScript / JSX | Estrutura e lógica da aplicação |

## 📁 Estrutura do projeto

A organização principal do projeto segue esta estrutura:

```text
TaskFlow/
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
├── src/
│   ├── components/
│   │   ├── CustomButton.tsx
│   │   ├── CustomInput.tsx
│   │   ├── EmptyState.tsx
│   │   ├── FilterBar.tsx
│   │   ├── Header.tsx
│   │   └── StatusBadge.tsx
│   │
│   ├── screens/
│   │   ├── auth/
│   │   │   └── LoginScreen.tsx
│   │   ├── home/
│   │   │   └── HomeScreen.tsx
│   │   ├── tasks/
│   │   │   ├── TaskListScreen.tsx
│   │   │   ├── TaskFormScreen.tsx
│   │   │   └── TaskDetailScreen.tsx
│   │   └── settings/
│   │       └── SettingsScreen.tsx
│   │
│   ├── routes/
│   │   ├── AppRoutes.tsx
│   │   └── TabRoutes.tsx
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── TaskContext.tsx
│   │   └── ThemeContext.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useTasks.ts
│   │   └── useTheme.ts
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── authStorage.ts
│   │   └── taskStorage.ts
│   │
│   ├── types/
│   │   ├── navigation.ts
│   │   ├── task.ts
│   │   └── user.ts
│   │
│   └── utils/
│       ├── formatDate.ts
│       ├── generateId.ts
│       └── validation.ts
│
└── README.md
```

**Observação:** a estrutura acima representa a organização prevista do projeto. Alguns arquivos podem ter nomes ou caminhos diferentes na versão atual, dependendo das alterações feitas durante a integração das implementações.

### Responsabilidade das pastas

- `components/`: componentes reutilizáveis da interface.
- `screens/`: telas de autenticação, página inicial, tarefas e configurações.
- `routes/`: configuração da navegação entre telas.
- `context/`: estados compartilhados de autenticação, tarefas e tema.
- `hooks/`: acesso simplificado aos contextos e às funcionalidades compartilhadas.
- `services/`: serviços e operações de armazenamento e acesso a dados.
- `types/`: interfaces e tipos utilizados pelo TypeScript.
- `utils/`: funções auxiliares para validação, datas e geração de identificadores.

## ⚙️ Pré-requisitos

Antes de executar o projeto, instale:

1. **Node.js LTS**, disponível em https://nodejs.org/
2. **Git**, caso precise clonar o repositório.
3. Um editor de código, como o Visual Studio Code.
4. Um navegador atualizado ou o aplicativo Expo Go em um dispositivo compatível.

Para verificar se o Node.js e o npm estão instalados, abra o terminal e execute:

```bash
node -v
npm -v
```

Os dois comandos devem retornar números de versão.

## 🚀 Como instalar e executar

### 1. Abrir a pasta do projeto

No Windows, abra o terminal do Visual Studio Code ou o PowerShell.

Entre na pasta do projeto:

```powershell
cd "C:..\..\TaskFlow"
```

Se o projeto estiver em outro local, substitua o caminho pelo endereço correto da pasta.

Confira se o terminal está na raiz do projeto:

```powershell
dir
```

Você deverá encontrar arquivos como `package.json` e `App.tsx`.

### 2. Instalar as dependências

Execute:

```bash
npm install
```

Esse comando instala as dependências declaradas no `package.json`.

### 3. Conferir as dependências do Expo

O projeto foi ajustado para utilizar o Expo SDK 55. Para conferir e alinhar as dependências compatíveis com o SDK instalado, execute:

```bash
npx expo install --fix
```

Depois, verifique o projeto:

```bash
npx expo-doctor
```

Se houver avisos, confira as dependências e os caminhos indicados antes de continuar.

### 4. Iniciar o aplicativo

Na raiz do projeto, execute:

```bash
npx expo start
```

O Expo iniciará o servidor de desenvolvimento e apresentará as opções disponíveis no terminal.

### 5. Executar no navegador

Para iniciar diretamente na versão web:

```bash
npx expo start --web --clear
```

O parâmetro `--clear` limpa o cache do Metro, o que pode ajudar depois de alterações em dependências ou arquivos de configuração.

Se a versão web apresentar um erro relacionado a renderização estática ou ao servidor, verifique a configuração web no `app.json` e as dependências instaladas. Não é necessário migrar o projeto para Expo Router: a navegação principal foi estruturada com React Navigation.

### 6. Executar no celular

1. Instale o Expo Go em um dispositivo compatível.
2. Inicie o servidor com `npx expo start`.
3. Leia o QR Code exibido no terminal ou na interface do Expo.
4. Aguarde o aplicativo carregar.

O computador e o celular normalmente precisam estar na mesma rede para a conexão local funcionar. Se houver dificuldades, verifique as opções de conexão disponibilizadas pelo Expo.

## 🔐 Como entrar no aplicativo

Na tela de login, utilize exatamente estas informações:

```text
E-mail: demo@taskapp.com
Senha: 123456
```

As credenciais são imutáveis pela interface do usuário. Não é necessário realizar um cadastro para utilizar essa conta de demonstração.

Após o login, o usuário terá acesso às áreas principais do TaskFlow.

## 🧭 Navegação do aplicativo

O aplicativo utiliza React Navigation com navegação por abas.

| Aba | Funcionalidade |
|---|---|
| Home | Exibe um resumo das tarefas |
| Tasks | Apresenta a listagem, os filtros e as ações das tarefas |
| Settings | Reúne as configurações do aplicativo, incluindo o tema quando disponibilizado pela tela |

A área de tarefas também utiliza navegação entre a listagem, o formulário de criação ou edição e a visualização dos detalhes.

## 📝 Como utilizar as tarefas

### Criar uma tarefa
1. Entre na aba **Tasks**.
2. Selecione **+ Nova tarefa**.
3. Preencha os campos apresentados no formulário.
4. Salve a tarefa.

### Visualizar uma tarefa
Selecione a tarefa na listagem para abrir sua tela de detalhes.

### Editar uma tarefa
Utilize a opção **Editar** na tarefa ou na tela de detalhes, conforme a interface disponível.

### Excluir uma tarefa
Selecione **Excluir** e confirme a operação. No navegador, a confirmação é feita por uma caixa de diálogo; em dispositivos nativos, é utilizado o alerta do React Native.

### Filtrar tarefas
Utilize a barra de filtros para visualizar todas as tarefas ou somente as que correspondem ao status selecionado.

Os nomes dos status disponíveis dependem das opções implementadas no componente de filtro.

## 🎨 Tema claro e escuro

O gerenciamento de tema é centralizado no `ThemeContext.tsx`.

O hook `useTheme.ts` permite que as telas e os componentes acessem as cores e as funções do contexto sem duplicar a lógica.

As cores incluem propriedades como:

- `primary`: cor principal da interface.
- `primaryMuted`: variação suave da cor principal.
- `background`: cor de fundo das telas.
- `surface`: cor de cartões e superfícies.
- `text`: cor do texto principal.
- `mutedText`: cor de textos secundários.
- `border`: cor das bordas.
- `danger`, `success` e `warning`: cores para estados e mensagens.

A preferência de tema é salva no AsyncStorage para que possa ser recuperada quando o aplicativo for aberto novamente.

## 💾 Persistência de dados

O projeto utiliza armazenamento local para preservar informações entre execuções, conforme os serviços e contextos implementados.

O armazenamento local não equivale a um banco de dados remoto. Desinstalar o aplicativo, limpar os dados do navegador ou apagar o armazenamento pode remover as informações salvas.

Para sincronização entre usuários e dispositivos, seria necessário integrar um backend ou serviço de banco de dados remoto.

## 🧪 Solução de problemas

### O comando `npm install` falha
- Confira se o terminal está na pasta correta.
- Verifique a instalação do Node.js.
- Leia a mensagem de erro para identificar a dependência que falhou.

### O Expo apresenta uma tela em branco
Execute:

```bash
npx expo start --clear
```

Confira também se o `package.json` utiliza a entrada configurada para React Navigation e se o `App.tsx` está no local esperado.

### O terminal informa que uma dependência está incompatível
Execute:

```bash
npx expo install --fix
npx expo-doctor
```

Evite misturar versões incompatíveis de Expo, React e React Native.

### O tema apresenta erros de importação
Confira se o `ThemeContext` está definido e exportado apenas uma vez em `src/context/ThemeContext.tsx` e se `src/hooks/useTheme.ts` importa esse contexto:

```tsx
import { ThemeContext } from '../context/ThemeContext';
```

O aplicativo também deve estar envolvido pelo `ThemeProvider` para que as telas possam utilizar `useTheme()`.

### As tarefas não aparecem depois de reabrir o aplicativo
Confira a implementação de `TaskContext.tsx` e do serviço `taskStorage.ts`, verificando se as operações de inclusão, edição e exclusão salvam os dados no AsyncStorage e se o carregamento inicial recupera esses dados.

### O login não funciona
Verifique se o e-mail e a senha foram digitados corretamente:

- E-mail: `demo@taskapp.com`
- Senha: `123456`

As credenciais não devem ser alteradas na interface.

## 🔒 Considerações de segurança

As credenciais de demonstração são destinadas a testes e apresentações acadêmicas. Se estiverem definidas diretamente no código-fonte, não devem ser consideradas um mecanismo seguro de autenticação para produção.

Uma versão de produção deve utilizar autenticação validada por um backend, armazenamento apropriado de credenciais e controles de acesso para os dados.

## 👨‍💻 Desenvolvimento

Para iniciar o desenvolvimento, abra a raiz do projeto, instale as dependências e execute o servidor Expo.

```bash
npm install
npx expo start
```

Ao alterar os arquivos, o Expo poderá atualizar o aplicativo automaticamente. Se necessário, reinicie o servidor limpando o cache.

## 📄 Licença

Projeto desenvolvido para fins acadêmicos. Uma licença específica deverá ser definida caso o projeto seja distribuído ou utilizado comercialmente.
```

RM559483 - Matheus Ikeda
RM560723 - Davis Junior
RM560340 - Matheus Machado
