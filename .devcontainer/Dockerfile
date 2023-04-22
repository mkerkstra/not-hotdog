FROM node:18-bullseye as base

WORKDIR /workspace
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        postgresql-client \
        zsh \
        python3 \
        python3-pip \
        libprotobuf-dev \
        protobuf-compiler \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENV PNPM_HOME=/home/.pnpm
ENV PATH=$PATH:/$PNPM_HOME
RUN mkdir -p ${PNPM_HOME} && chmod a+rwx ${PNPM_HOME}
COPY .npmrc .npmrc
RUN corepack enable && corepack prepare pnpm@7.28.0 && \
    su node -c "pnpm i -g prisma snaplet @nestjs/cli"

USER node
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" -N
