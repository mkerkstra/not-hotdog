#!/bin/bash
set -e

# Install Node.js dependencies using pnpm
pnpm i

# Install Python dependencies using pip
find . -name requirements.txt -exec pip install -r {} \;

# Generate our prisma schema, seed the database
pnpm generate

# copy the zshrc
cp .devcontainer/.zshrc ~/.zshrc
