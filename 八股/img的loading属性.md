# img 的 loading 属性

默认行为是 `auto`，但一般属于`eager`

```html
<img src="img.png" loading="lazy" />
```

首屏图片设置为`eager`立即加载，其他图片设置为`lazy`推迟加载以节省流量

## eager

不论图片在哪里，都立即加载

## lazy

懒加载，只有图片距离用户视口近的时候，图片才会加载

用户没有滚动到距离图片近的时候则永远不加载，节省流量
