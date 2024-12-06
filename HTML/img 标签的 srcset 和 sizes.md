在 HTML 中，`img` 元素的 `srcset` 属性提供了一种让浏览器选择最合适图片的机制。它允许你为不同的设备、屏幕分辨率、显示尺寸等提供不同版本的图片。

### 基于像素密度 (`x` 单位)

这种方式用于为不同像素密度（如 1x、2x、3x）的屏幕提供不同的图像版本，通常用于响应式图像，以适应高清屏幕（如 Retina 屏幕）。

#### 示例：

```html
<img src="image1.jpg" 
     srcset="image1.jpg 1x, image2.jpg 2x, image3.jpg 3x" 
     alt="Responsive image example">
```

- **`image1.jpg 1x`**：适用于标准分辨率显示器（1x DPR）。
- **`image2.jpg 2x`**：适用于高分辨率显示器（2x DPR，例如 Retina 屏幕）。
- **`image3.jpg 3x`**：适用于超高分辨率显示器（3x DPR）。

在这种用法下，浏览器会根据设备的 **设备像素比（DPR）** 选择最适合的图像。

可以通过`window.devicePixelRatio`拿到 **设备像素比（DPR）**

### 基于宽度 (`w` 单位)

这种方式允许根据视口的宽度选择图片资源，适用于响应式设计。通常与 `sizes` 属性配合使用，浏览器会根据实际视口宽度计算出最合适的图片进行加载。

算法：先通过`sizes`中的临界点计算出对应的宽度，然后寻找`srcset`宽度最接近或稍大于这个显示宽度的图片，并加载它。

#### 示例1：

```html
<img src="image-small.jpg"
     srcset="image-small.jpg 320w, image-medium.jpg 640w, image-large.jpg 1024w"
     sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
     alt="Responsive image example">
```

- **`image-small.jpg 320w`**：宽度为 320 像素的图片。
- **`image-medium.jpg 640w`**：宽度为 640 像素的图片。
- **`image-large.jpg 1024w`**：宽度为 1024 像素的图片。

`sizes` 属性定义了不同的视口宽度下，图片占据视口宽度的比例：

这里`max-width`为真（也就是宽度不超过max-width，不低于min-width）才会执行左边的宽度设置

- 在视口宽度 **≤ 600px** 时，图片占据 100% 宽度。
- 在视口宽度 **≤ 1200px** 时，图片占据 50% 宽度，否则图片占据 33% 宽度。

#### 示例2：

```html
<img src="image-128.png"
     srcset="image-128.png 128w, image-256.png 256w, image-512.png 512w"
     sizes="(max-width: 360px) 340px, 128px" />
```

- **`image-128.png 128w`**：宽度为 128 像素的图片。
- **`image-256.png 256w`**：宽度为 256 像素的图片。
- **`image-512.png 512w`**：宽度为 512 像素的图片。

`sizes` 属性定义了不同的视口宽度下，图片占据视口宽度的比例：

- **当视口宽度 ≤ 360px** 时，浏览器会将图片显示为 340px，并加载 `512w` 的图片。
- **当视口宽度 > 360px** 时，浏览器将图片显示为 128px，并加载 `128w` 的图片。

