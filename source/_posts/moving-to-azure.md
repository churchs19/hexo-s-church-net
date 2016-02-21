title: Moving to Azure
date: 2012/12/30 20:01:00
alias: blog/483/
tags:
- Mobile
- C#
- Windows Phone
- Development
- ASP.NET
- Azure
photos:
- /journal_images/Windows-Live-Writer/Moving-to-Azure_E3C5/Windows%20Azure%20Logo_772e2e85-4690-4e1b-b75a-9719ae5f1c12.png|Windows Azure
---
Wow. It’s hard to believe that it’s been two months since I last wrote something on here. In the interim, I’ve been some minor architecture work under the covers here at s-church.net. I moved the site to ASP.NET MVC 4 and .NET 4.5 and upgraded to Entity Framework for database access. The site is also now hosted on the new [Windows Azure Web Sites](http://www.windowsazure.com/en-us/home/scenarios/web-sites/) with a [SQL Azure](http://www.windowsazure.com/en-us/home/features/data-management/) database. I was very pleasantly surprised as to how easy it was to get up and running on [Azure](http://www.windowsazure.com/). Publishing the completed site to Azure was as simple as downloading the publish profile for my Azure site and then selecting that profile as the destination from the Publish command in the Visual Studio 2012 Web Application project menu. The publish process updates the database connection string as necessary to connect to the associated SQL Azure data store.

I’m also in the process of building a couple of new Windows Phone apps using the [Azure Mobile Services backend](http://www.windowsazure.com/en-us/home/scenarios/mobile-services/). It’s not quite as straightforward to use Azure Mobile Services in Windows Phone 7.5 because I have to use the REST interface directly instead of the packaged clients available for Windows Store, Windows Phone 8, and iOS apps, but it’s still a big step forward from the Microsoft Sync Framework backend that I’ve used in the past. Sync Framework requires a dedicated server where I can do binary installs, which is quite a bit more expensive from a hosting perspective.

Once completed, the whole setup should be considerably cheaper than the hosting combination of Amazon Web Services and CrystalTech/The Small Business Authority that I’ve been using for over a year now and should also be more reliable since everything is co-located again.