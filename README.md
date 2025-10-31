#  Library Management System

A **full-stack web application** for managing library users and books.  
Built with **ASP.NET Core 8 Web API** (backend) and **Angular 20 + Bootstrap 5** (frontend).

---

##  Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Angular 20, TypeScript, Bootstrap 5 |
| **Backend** | ASP.NET Core 8 Web API, C# |
| **Database** | SQL Server  |
| **Logging** | Serilog |
| **Build Tool** | Node.js, npm |
| **IDE** | Visual Studio / VS Code |

---

## ✨ Features

### User Management
- View all users with pagination or range
- Create new user
- Search user by ID
- Bulk insert sample users
- View user details

###  Performance
- Supports lazy loading and range-based fetching  
- Uses `AsNoTracking()` in EF Core for faster reads  
- Serilog-based backend logging

---

## 🏗️ Project Output

### Backend Api Output:
<img width="1366" height="768" alt="api-single-user-create" src="https://github.com/user-attachments/assets/b089504c-5182-435a-bc31-4f1c4139ff43" />
<img width="1366" height="768" alt="api-Bulk-user" src="https://github.com/user-attachments/assets/1c4740dc-0838-441e-bc82-6ca3de7647b8" />
<img width="1366" height="768" alt="api-list-user" src="https://github.com/user-attachments/assets/752bc886-f6c6-4830-b47b-bafac8c37ed5" />
<img width="1366" height="768" alt="api-search-id" src="https://github.com/user-attachments/assets/0ab9682d-0258-4f42-8f0e-731ee07a9d1d" />

### Frontend Output:
<img width="1366" height="768" alt="user-list" src="https://github.com/user-attachments/assets/e4b0d198-7711-41ae-954c-0f6e41c02173" />
<img width="1366" height="768" alt="view-list-1" src="https://github.com/user-attachments/assets/5da72af4-6914-4e59-8578-195e9de68f44" />
<img width="1366" height="768" alt="view-list-2" src="https://github.com/user-attachments/assets/84c2b8af-8cc8-4173-b989-11e21a06fbc5" />
<img width="1366" height="768" alt="create-single-user" src="https://github.com/user-attachments/assets/daa7ba15-16c5-4ba8-b4bb-caf22d4bc26b" />
<img width="1366" height="768" alt="bulk-create" src="https://github.com/user-attachments/assets/28f03baa-7e1a-4e38-b0e3-b5c845b1bdf1" />
<img width="1366" height="768" alt="search-id" src="https://github.com/user-attachments/assets/21baa531-f757-47ac-b98c-06a7966a644f" />

###🧰 Tools & Dependencies
##Backend

-Microsoft.EntityFrameworkCore
-Microsoft.AspNetCore.Mvc
-Serilog
-Swashbuckle.AspNetCore (Swagger)

##Frontend

-@angular/core, @angular/forms, @angular/router
-bootstrap@5
-rxjs, zone.js


