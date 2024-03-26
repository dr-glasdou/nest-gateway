<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Nest Gateway

## Dev

1. Clone the repository
2. Install the dependencies with `pnpm install`
3. Create a `.env` from the `.env.template` file
4. Run Nats server

```bash
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 -p 6222:6222 nats:latest
```

5. Run the app with `pnpm start:dev`
