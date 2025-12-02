# ----------------------------------------------------------------------
# ESTÁGIO 1: BUILD (Compilação do Go)
# ----------------------------------------------------------------------
FROM golang:1.22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -ldflags="-s -w" -o /go-worker .

# ----------------------------------------------------------------------
# ESTÁGIO 2: RUN (Imagem final ultra-leve)
# ----------------------------------------------------------------------
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=builder /go-worker .

CMD ["./go-worker"]