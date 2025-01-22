# Peleg-Billing | v1.0.0 | Bugs will be fixed tommrow ( refund )

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](link_to_releases)
[![License](https://img.shields.io/badge/license-GNU-green.svg)](https://opensource.org/licenses/MIT)
[![Issues](https://img.shields.io/github/issues/peleg-development/peleg-billing)](https://github.com/peleg-development/peleg-billing/issues)
[![Contributors](https://img.shields.io/github/contributors/peleg-development/peleg-billing)](none)


https://discord.gg/6xjSVb2HXj for updates join my discord server 
### Overview: 

Elevate your server’s job experience with **Peleg-Billing**, an advanced billing system designed to enhance gameplay and streamline transactions. Our system features a unique, clean, and user-friendly interface, making it easy for workers to manage and issue bills with precision.

### **Key Features**

- **Intuitive Billing Interface:** Bill players effortlessly with configurable options or create custom bills by simply entering the reason and amount. The system allows for selecting multiple bills at once, providing flexibility and efficiency.

- **Anti-Trolling Measures:** Combat misuse with custom cooldowns between bills, Discord logs for each transaction, and a configurable maximum bill amount for each job. This ensures fair play and protects players from potential abuse.

- **Job Boss Management:** Empower job bosses with full access to all bills issued within their company. They can review, manage, and even refund bills, with the refunded amount being deducted from the society’s funds and returned to the player.

- **ESX and QB support!**
  
### **Why Choose Peleg-Billing?**

In many servers, the billing systems are always boaring and ugly or just buggy and usless in this system the money will be taken and received to the boss menu directly...

## Exports ( Not working for now )

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
![image](https://github.com/user-attachments/assets/ae1720be-69c5-4554-9d2a-5da84a618529)
![image](https://github.com/user-attachments/assets/6faad8d9-c8a9-45bd-b605-fcad2f7bcaa8)
![image](https://github.com/user-attachments/assets/83ce2000-8682-4552-be2e-3dc727555dac)
![image](https://github.com/user-attachments/assets/cdf1b8ac-aac8-41d7-9f0e-f882c80da6a9)
![image](https://github.com/user-attachments/assets/e4f06956-cd0e-47f0-a014-700a4b38e5ca)

