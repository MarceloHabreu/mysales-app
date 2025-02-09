# Sales App - Sistema de Gerenciamento de Vendas

## 📌 Descrição do Projeto

O **Sales App** é uma aplicação web desenvolvida como parte do curso de **Desenvolvimento Fullstack** da Udemy, utilizando **Next.js** no frontend e **Spring Boot** no backend. O projeto permite o gerenciamento de produtos, clientes e vendas, além da geração de relatórios detalhados para análise de dados.

📽️ **Assista ao vídeo da aplicação no LinkedIn:** [Clique aqui](https://www.linkedin.com/feed/update/urn:li:activity:7294466530505883649/)

## 🚀 Funcionalidades

- 🛍️ **Gerenciamento de Produtos e Clientes**
- 💰 **Registro e acompanhamento de vendas mensais**
- 📊 **Visualização de dados sobre estoque, clientes e lucro mensal**
- 📑 **Geração de relatórios detalhados com filtros personalizados**
- 🔐 **Autenticação segura com Auth0 e GitHub Auth**

## 🛠 Tecnologias Utilizadas

### 🔹 **Frontend**
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PrimeReact](https://primereact.org/) & [Lucide React](https://lucide.dev/)
- [Chart.js](https://www.chartjs.org/)
- [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup)
- [SweetAlert2](https://sweetalert2.github.io/)
- [SWR](https://swr.vercel.app/) & [Axios](https://axios-http.com/ptbr/docs/intro)

### 🔹 **Backend**
- [Spring Boot](https://spring.io/projects/spring-boot)
- [PostgreSQL](https://www.postgresql.org/)
- [JasperStudio](https://community.jaspersoft.com/project/jaspersoft-studio)

### 🔹 **Arquitetura e Padrões**
- **Padrão MVC** (Controllers, Repositories, Models, DTOs, Projections e Services)
- **Renderização estática e dinâmica** (SSG, ISR, SSR no Next.js)
- **REST API com autenticação JWT**

## 🌍 Hospedagem

- 🚀 **Frontend:** [Vercel](https://vercel.com/)
- 🏗️ **Backend e Banco de Dados:** [Railway](https://railway.app/)

## 📂 Como Executar o Projeto

### 🔧 **Pré-requisitos**
Certifique-se de ter instalado:
- **Node.js** e **Yarn/NPM** para o frontend
- **Java 17+** e **Maven** para o backend
- **PostgreSQL** configurado

### 🚀 **Passo a Passo**

#### **1️⃣ Clone o repositório**
```sh
git clone https://github.com/MarceloHabreu/sales-app.git
cd sales-app
```

#### **2️⃣ Configuração do Backend**
```sh
cd backend
mvn spring-boot:run
```

#### **3️⃣ Configuração do Frontend**
```sh
cd frontend
yarn install  # ou npm install
yarn dev      # ou npm run dev
```
Acesse **http://localhost:3000** para visualizar a aplicação.

## 📌 Próximos Passos

✔️ Melhorar a experiência do usuário (UI/UX) 
✔️ Implementar novas funcionalidades 
✔️ Otimizar consultas ao banco de dados
✔️ Refatoração do código seguindo boas práticas 

## 📎 Links

🔗 **Repositório:** [MarceloHabreu/sales-app](https://github.com/MarceloHabreu/sales-app)  
🔗 **Aplicação:** [app-mysales.vercel.app](https://app-mysales.vercel.app)

## 🎉 Contribuição
Fique à vontade para abrir **issues** e enviar **pull requests**. Toda contribuição é bem-vinda! 

📢 **Feedbacks são sempre bem-vindos!** 💬
