# start-git README

A Visual Studio Code extension for opening git shell on windows.

## Configurations
``` json
{
    "startgit": {
        "shellPath": "path of git shell",
        "cwd": "git word directory"
    }
}
```

### shellPath

*required*

It's the `git-bash.exe` file in `git installation directory`

### cwd

*option*

Default is current `vsc rootpath`

## Key Binding

`ctrl+alt+g`