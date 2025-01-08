# Peleg-Billing | V1.0 | Almost Finished!

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](link_to_releases)
[![License](https://img.shields.io/badge/license-GNU-green.svg)](https://opensource.org/licenses/MIT)
[![Issues](https://img.shields.io/github/issues/ku-development/krs-billing)](https://github.com/ku-development/krs-billing/issues)
[![Contributors](https://img.shields.io/github/contributors/ku-development/krs-billing)](none)


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

## Exports

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
![image](https://github.com/user-attachments/assets/375bfedb-1e8c-470f-a7ee-d0dadbddbe1c)
![image](https://github.com/user-attachments/assets/b09a3e71-4436-4c64-bb38-fa03626ea38f)
![image](https://github.com/user-attachments/assets/73fcf9b9-6ca2-46c7-a274-d82353180d6c)
![image](https://github.com/user-attachments/assets/9ded02a7-4d04-4413-910c-50d79de9fda9)
![image](https://github.com/user-attachments/assets/779313d1-1202-4ca4-ac96-fe6ea224308f)
![image](https://github.com/user-attachments/assets/77468abf-1d5f-4143-8c89-17d86ef4803e)
![image](https://github.com/user-attachments/assets/c427789a-dbd5-4498-9bf4-91601e3c4e77)
![image](https://github.com/user-attachments/assets/4c7f5e7f-6362-405d-a99e-bbe395491492)
![image](https://github.com/user-attachments/assets/ba7bc85d-c1b7-4a95-98a7-5d2249b45a79)

