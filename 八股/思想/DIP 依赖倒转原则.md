## 基本原理

- ​**高层模块不依赖低层模块**：两者应共同依赖**抽象接口**​（如接口、抽象类）
- ​**抽象不依赖细节**：接口或抽象类定义行为规范，具体实现类依赖抽象，而非抽象依赖实现细节

## 示例：消息通知系统

### 传统实现（违反DIP）

```ts
// 低层模块：邮件通知类
class EmailService {
  sendEmail(message: string) {
    console.log(`发送邮件：${message}`);
  }
}

// 高层模块：通知管理器（直接依赖具体实现）
class NotificationManager {
  private emailService = new EmailService();

  notify(message: string) {
    this.emailService.sendEmail(message);
  }
}
```

上述代码的问题是，如果我想要把`EmailService`更换成`SMSService`，需要更改高层代码`NotificationManager`

增的越多，改的越多

### DIP实现

```ts
// 步骤1：定义抽象接口（抽象不依赖细节）
interface MessageService {
  send(message: string): void;
}

// 步骤2：低层模块实现接口（细节依赖抽象）
class EmailService implements MessageService {
  send(message: string) {
    console.log(`邮件通知：${message}`);
  }
}

class SMSService implements MessageService {
  send(message: string) {
    console.log(`短信通知：${message}`);
  }
}

// 步骤3：高层模块依赖抽象
class NotificationManager {
  constructor(private service: MessageService) {} // 通过依赖注入

  notify(message: string) {
    this.service.send(message);
  }
}

// 使用示例
const emailService = new EmailService();
const smsService = new SMSService();

// 可灵活切换通知方式，无需修改高层模块
const manager1 = new NotificationManager(emailService);
manager1.notify("您的订单已发货"); // 邮件通知

const manager2 = new NotificationManager(smsService);
manager2.notify("账户登录成功"); // 短信通知
```

上述代码高层模块和底层模块都面向接口，只要接口不变，底层模块可以随意更改，高层模块也可以方便适配
