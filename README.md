# M. Kerk's Fullstack Template

### Apps and Packages

- `client`: a [Next.js](https://nextjs.org/) app
- `data`: a [Prisma](https://www.prisma.io/) client

- `eslint-config-kerk`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

# Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

# Contributing

## Devcontainer
Devcontainer is a feature of VSCode that allows you to run a project in a containerized environment. This is useful for projects that have a lot of dependencies or require a specific environment to run. This project uses devcontainer to run the Next.js server and the database.

### Prerequisites
* [Docker](https://docs.docker.com/get-docker/)
* [VSCode](https://code.visualstudio.com/download)

If you use VSCode, you can use the devcontainer to get started quickly. You use the devcontainer to run the project in a containerized environment. This will spin up a database and a Next.js server. You can access the Next.js server at `localhost:3000`.

As described in the [devcontainer docs](https://code.visualstudio.com/docs/remote/containers), you can open the project in a container by opening the project in VSCode and clicking the green button in the bottom left corner of the window.

### Windows
We recommend using ssh to clone the repository. Otherwise you have to share [creds](https://code.visualstudio.com/docs/remote/troubleshooting#_sharing-git-credentials-between-windows-and-wsl)

Make sure you are using wsl2 with a recent ubuntu distro.