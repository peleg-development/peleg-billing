# Peleg-Billing | v1.2.6

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](link_to_releases)
[![License](https://img.shields.io/badge/license-GNU-green.svg)](https://opensource.org/licenses/MIT)
[![Issues](https://img.shields.io/github/issues/peleg-development/peleg-billing)](https://github.com/peleg-development/peleg-billing/issues)
[![Contributors](https://img.shields.io/github/contributors/peleg-development/peleg-billing)](none)
- **Support the anticheat for future updates:** [KOFI](https://ko-fi.com/peleg)


https://discord.gg/6xjSVb2HXj for updates join my discord server 

### Preview
https://www.youtube.com/watch?v=2QYfqNN4q-A

### Overview: 

Elevate your server’s job experience with **Peleg-Billing**, an advanced billing system designed to enhance gameplay and streamline transactions. Our system features a unique, clean, and user-friendly interface, making it easy for workers to manage and issue bills with precision.

### **Key Features**

- **Intuitive Billing Interface:** Bill players effortlessly with configurable options or create custom bills by simply entering the reason and amount. The system allows for selecting multiple bills at once, providing flexibility and efficiency.

- **Anti-Trolling Measures:** Combat misuse with custom cooldowns between bills, Discord logs for each transaction, and a configurable maximum bill amount for each job. This ensures fair play and protects players from potential abuse.

- **Job Boss Management:** Empower job bosses with full access to all bills issued within their company. They can review, manage, and even refund bills, with the refunded amount being deducted from the society’s funds and returned to the player.

- **ESX and QB support!**
  
### **Why Choose Peleg-Billing?**

In many servers, the billing systems are always boaring and ugly or just buggy and usless in this system the money will be taken and received to the boss menu directly...

## Exports | Not working for now only at the next version which will take some time
you can use the event paybill

### Server-side:
```lua
exports['peleg-billing']:BillPlayer(data)
```

### Client-side:
```lua
exports['peleg-billing']:BillPlayer(data)
```

### Data Structure:
```lua
data = {
    biller = 'none',  -- 'none' indicates no specific biller; to set a real biller, input the biller’s CID
    receiver = 'none' -- receiver cid 
    reason = 'reason',
    amount = 555,
}
```


### Preview
![image](https://github.com/user-attachments/assets/0de7a2bd-6128-4265-92aa-b78c12dbac8a)
![image](https://github.com/user-attachments/assets/513983fe-6077-430b-8bc4-d19f3953f95e)
![image](https://github.com/user-attachments/assets/f5e8fa88-adc0-409c-bf06-731361dbc1f6)


