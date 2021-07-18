# Adding Nuget Packages

Packages we want to add:

| Name                                          | Usage                                                                                                                 |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Microsoft.EntityFrameworkCore                 | This framework is an ORM (Object-Relational Mapper) that allows developers to work with a database using .NET objects |
| Microsoft.EntityFrameworkCore.SqlServer       | Allows the ORM to use Microsoft SQL Server (database communication)                                                   |
| Microsoft.EntityFrameworkCore.Tools           | Tools for database migrations                                                                                         |
| HotChocolate.AspNetCore                       | Hot Chocolate GraphQL endpoint                                                                                        |
| HotChocolate.Data                             | Hot Chocolate Data management                                                                                         |
| HotChocolate.Data.EntityFramework             | Hot Chocolate Data management for Entity Framework                                                                    |
| HotChocolate.AspNetCore.Authorization         | Hot Chocolate Authorization Library                                                                                   |
| Microsoft.AspNetCore.Authentication.JwtBearer | JWT library to generate Bearer tokens                                                                                 |
| Octokit                                       | GitHub .NET library                                                                                                   |

### Use Manage Package for Solution (UI)

We also need to install some libraries/extensions to the project to help us create the API. At the top of the screen go to **Tools** -> **Nuget Package Manager** -> **Manage Nuget Package for Solution.**

![4-adding-nuget-packages/Untitled.png](4-adding-nuget-packages/Untitled.png)

Search each package from the above table and install it. e.g Microsoft.EntityFrameworkCore

![4-adding-nuget-packages/Untitled%201.png](4-adding-nuget-packages/Untitled%201.png)

### Use Package Manager Console (CLI, command line)

![4-adding-nuget-packages/Untitled%202.png](4-adding-nuget-packages/Untitled%202.png)

```bash
Install-Package Microsoft.EntityFrameworkCore
Install-Package Microsoft.EntityFrameworkCore.SqlServer
Install-Package Microsoft.EntityFrameworkCore.Tools
Install-Package HotChocolate.AspNetCore
Install-Package HotChocolate.Data
Install-Package HotChocolate.Data.EntityFramework
Install-Package HotChocolate.AspNetCore.Authorization
Install-Package Microsoft.AspNetCore.Authentication.JwtBearer
Install-Package Octokit
```
