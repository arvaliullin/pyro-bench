FROM golang:latest

RUN apt update && apt upgrade -y
RUN apt install --yes curl unzip bash neofetch

ENV BUN_INSTALL="/usr/local"

RUN curl -fsSL https://bun.sh/install | bash

WORKDIR /opt/build

COPY . .

RUN /usr/bin/bash /opt/build/scripts/build.sh
RUN neofetch
RUN bun --version