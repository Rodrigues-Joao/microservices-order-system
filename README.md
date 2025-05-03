![status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

# 🧾 OrderFlow Microservices

> ⚠️ Este projeto ainda está em desenvolvimento. Funcionalidades podem mudar a qualquer momento.

Sistema de pedidos construído com arquitetura de **microsserviços**...

Sistema de pedidos construído com arquitetura de **microsserviços** e comunicação assíncrona via **RabbitMQ**. Este projeto demonstra como dividir a responsabilidade de um sistema em serviços independentes e integrados por eventos.

---

## 📦 Visão Geral

Fluxo completo simulado de um pedido:

1. **pedido-service**: cria pedidos e publica eventos `pedido_criado`.
2. **estoque-service**: escuta `pedido_criado`, verifica disponibilidade dos produtos e envia `estoque_reservado`.
3. **pagamento-service**: escuta `estoque_reservado` e simula o processamento do pagamento.

---

## 🧱 Arquitetura

```
[Cliente] --> [pedido-service] --(pedido_criado)--> [estoque-service] --(estoque_reservado)--> [pagamento-service]
```

Todos os serviços comunicam-se via **RabbitMQ**.

---

## 🚀 Como rodar o projeto

> Pré-requisitos: Docker + Docker Compose

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/orderflow-microservices.git
cd orderflow-microservices
```

### 2. Inicie os serviços

```bash
docker-compose up --build
```

> Isso sobe:
>
> - RabbitMQ
> - Postgres
> - order-service (porta 3000)

<!-- > - inventory-service
> - payment-service -->

### 3. Faça um pedido

Envie um `POST` para `http://localhost:3000/order` com o seguinte corpo:

```json
{
  "userId": "4369134f-b048-4262-b81e-fc8e2d25072f",
  "items": [
    {
      "productId": "9707a917-88db-4475-94c5-fa469f869d3b",
      "name": "Camiseta Azul",
      "price": 50,
      "quantity": 1
    },
    {
      "productId": "4369134f-b048-4262-b81e-fc8e2d25072f",
      "name": "Calça Jeans",
      "price": 120,
      "quantity": 1
    }
  ]
}
```

Você verá os eventos sendo propagados e processados entre os serviços no console.

---

## 🛠 Tecnologias

- Node.js + Express
- RabbitMQ
- Docker & Docker Compose
- Arquitetura orientada a eventos

---

## 📂 Estrutura do Projeto

```
microservices-order-system/
├── docker-compose.yml
└── services
    ├── order/
    ├── payment/
    └── inventory/
```

---

## 🧪 Futuras melhorias

- Integração com microsserviços de clientes e produtos
- Interface frontend para pedidos

---

## 📄 Licença

MIT
