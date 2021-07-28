# Create an empty Project using Visual Studio

Open Visual Studio 2019 -> Create a new Project -> ASP.NET Core Web API

![images/3-create-an-empty-project-using-visual-studio/Untitled.png](images/3-create-an-empty-project-using-visual-studio/Untitled.png)

![images/3-create-an-empty-project-using-visual-studio/Untitled%201.png](images/3-create-an-empty-project-using-visual-studio/Untitled%201.png)

Give your project a name. _(Note: the name of the project will not matter, as shown in the presentation I used MSA-Yearbook instead of MSAYearbook from the docs. Just make sure your namespaces and imports are consistent with your project name)_

![images/3-create-an-empty-project-using-visual-studio/Untitled%202.png](images/3-create-an-empty-project-using-visual-studio/Untitled%202.png)

Choose NET 5 and deselect OpenAPI support as we will not be using it.

![images/3-create-an-empty-project-using-visual-studio/Untitled%203.png](images/3-create-an-empty-project-using-visual-studio/Untitled%203.png)

We have created an empty API project which will create a basic REST API. At this point, you can Click IIS Express to run the project. The newly created API project comes with a default API WeatherForecastController.cs, It should show you the following data.

![images/3-create-an-empty-project-using-visual-studio/Untitled%204.png](images/3-create-an-empty-project-using-visual-studio/Untitled%204.png)

After running with IIS Express (on macOS it is different) the follow webpage should open up.

![images/3-create-an-empty-project-using-visual-studio/Untitled%205.png](images/3-create-an-empty-project-using-visual-studio/Untitled%205.png)

## Summary

In this part, we went through how to create a template project in Visual Studio. We will be using this empty template project to build our API on top of.

[**<< Part #4 - Nuget Packages >>**](images/4-adding-nuget-packages.md)
