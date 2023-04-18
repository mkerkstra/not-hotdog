#!/usr/bin/env bash
set -e

pnpm i \
&& pnpm generate \
&& cp .devcontainer/.zshrc ~/.zshrc
