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
  "clienteId": "abc123",
  "itens": [
    {
      "produtoId": "prod-001",
      "nome": "Camiseta Azul",
      "precoUnitario": 50
    },
    {
      "produtoId": "prod-002",
      "nome": "Calça Jeans",
      "precoUnitario": 120
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
- DDD
- TDD

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
