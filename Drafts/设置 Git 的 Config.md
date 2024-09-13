
## Windows 位置

```
C:\Users\<用户>\.gitconfig
```

一般长下面这样

```sh
[core]
    editor = \"C:\\Users\\<用户>\\AppData\\Local\\Programs\\Microsoft VS Code\\bin\\code\" --wait
[http]
    proxy = http://127.0.0.1:10809
[https]
    proxy = http://127.0.0.1:10809
```
## 设置代理

设置到`http://127.0.0.1:10809`

```sh
git config --global http.proxy http://127.0.0.1:10809
git config --global https.proxy http://127.0.0.1:10809
```

