# start-git

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

It's the `git-bash.exe`(not `git-cmd.exe`) file in `git installation directory`

### cwd

*option*

Default is current `vsc rootpath`

## Default Key Binding

`ctrl+alt+g`

## More
- [details doc](https://github.com/polunzh/app/blob/master/start-git/README.md)
- [issue](https://github.com/polunzh/app/issues)