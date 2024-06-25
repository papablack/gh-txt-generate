# gh-txt-generate package

## Install

NPM (WIP):

```shell
npm install -g gh-txt-generate
```

or

**GIT**:

```shell
git clone git@github.com:papablack/gh-txt-generate.git .

npm install

npx gh-txt-generate run ./output/fluentui_components_code.txt microsoft/fluentui:master /packages/web-components/src
```

## Usage

*(optional_search is "/" by default, can be RegEx)*

**npm**:

```shell
npx gh-txt-generate run [output_txt_path] [repo_owner]/[repo_name]:[repo_branch] [optional_search]
```

**yarn**:

```shell
yarn gh-txt-generate run [output_txt_path] [repo_owner]/[repo_name]:[repo_branch]  [optional_search]
```

## Example command

Command to download FluentUI components:

```shell
(npx/yarn) gh-txt-generate run ./output/fluentui_components_code.txt microsoft/fluentui:master /packages/web-components/src
```

Command to download RWS framework client:

```shell
(npx/yarn) gh-txt-generate run ./output/RWS_client_code.txt papablack/rws-client:master /src
```