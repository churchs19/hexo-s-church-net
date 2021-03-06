title: Using the ASP.NET Web API Beta
date: 2012/4/2 15:21:00
alias: blog/468/
tags:
- Development
- Software
- ASP.NET
---
Over the last week, I was building some data services for a demo project for our non-profit subsidiary, [EffectiveSC](http://www.effectivesc.org), and we decided to use this quick project as an opportunity to get familiar with the [ASP.NET Web API](http://www.asp.net/web-api) beta that is part of the ASP.NET MVC 4 beta.  My first impressions of the Web API are generally very positive.  I was able to get a basic Create-Read-Update-Delete (CRUD) service up and running using the appropriate HTTP verbs (PUT, GET, POST, DELETE respectively) in just a couple of hours and the service automatically translated my model to JSON or XML based on the Accepts header in the incoming request.

You can add the ASP.NET Web API to an existing project by running the following from the [NuGet Package Manager](http://www.nuget.org) console:

```
Install-Package AspNetWebApi
```

or create a new project with the ASP.NET MVC 4 Web Application template installed with the [ASP.NET MVC 4 beta](http://www.asp.net/mvc/mvc4).

If you create a new project, the Web API template creates a new controller, ValuesController, that inherits from the new [ApiController class](http://msdn.microsoft.com/en-us/library/system.web.http.apicontroller\(v=vs.108\).aspx).  This new class looks something like this:

```cs
public class BadgeController : ApiController
{
    // GET /api/badge
    public IEnumerable<EarnedBadge> Get()
    {
        RelationalDataModel data = new RelationalDataModel();
        return data.EarnedBadges;
    }

    // GET /api/badge/5
    public EarnedBadge Get(long id)
    {
        ...
    }

    // POST /api/badge
    public void Post(EarnedBadge value)
    {
        ...
    }

    // PUT /api/badge/5
    public long Put(EarnedBadge value)
    {
        ...
    }

    // DELETE /api/badge/5
    public void Delete(int id)
    {
        throw new HttpResponseException(HttpStatusCode.MethodNotAllowed);
    }
}
```

In my case, I was sending a EarnedBadge object as my model.  In each of the methods, I simply performed the required query operations against my Entity Framework Code First data store and the framework took care of all of the serialization.  The EarnedBadge object was defined as:

```cs
public class EarnedBadge
{
    [Key]
    public long EarnedBadgeId { get; set; }
    [Required]
    public long ProviderId { get; set; }
    [Required]
    public long BadgeId { get; set; }
    [Required]
    public long UserId { get; set; }
    [Required]
    public DateTime EarnedDateTime { get; set; }
    public string Note { get; set; }
}
```

While this is a pretty simple object, the serialization resulted in the following results for JSON and XML respectively:

```JavaScript
{        
    "EarnedBadgeId":123456789,        
    "ProviderId":123456789,        
    "BadgeId":123456789,        
    "UserId":123456789,        
    "EarnedDateTime":"2012-03-28T00:54:06.843",        
    "Note":"string"    
}
```

and

```xml
<?xml version="1.0" encoding="utf-8"?>
<EarnedBadge>    
    <EarnedBadgeId>123456789</EarnedBadgeId>    
    <ProviderId>123456789</ProviderId>    
    <BadgeId>123456789</BadgeId>    
    <UserId>123456789</UserId>    
    <EarnedDateTime>2012-02-18T00:54:06.843</EarnedDateTime>
    <Note>String</Note>
</EarnedBadge>
```

I did use the [JSON.NET formatter as described by Henrik Nielsen](http://blogs.msdn.com/b/henrikn/archive/20120218/using-json-net-with-asp-net-web-api.aspx) in order to format the dates into ISO-8601 format which is a little easier for JavaScript-based clients to consume. From my perspective, one of the nicest features of using the ASP.NET Web API is the control it gives over the HTTP response messages, especially for exceptions. The new HttpResponseException allows me to control the HTTP status codes that are sent when errors occur such as the HTTP 405 Method Not Allowed for the Delete method in the example above.  This allows me to build the service in a truly RESTful fashion and to send meaningful error messages back to the client.

Another really impressive feature is the built in [OData](http://www.odata.org) query support.  Any IEnumerable or IQueryable object that is returned by the service is automatically queryable using the OData query string parameter syntax which makes building paging and searching of data sets really easy.

The one feature that I really like in WCF’s REST implementation that isn’t available yet in the ASP.NET Web API is the auto-generated service API documentation.  The ASP.NET Web API team has confirmed that this feature will be available in the final release.  It appears that, for most of the service work that I do at [EffectiveUI](http://www.effectiveui.com), the Web API will be the way to go moving forward.  [A good discussion of the ASP.NET Web API vs. WCF can be found at iDesign](http://idesign.net/articles/asp_net_web_api_vs_wcf.htm) and it largely mirrors my my own thoughts on the comparison.

I hope my initial thoughts and experiences prove useful and I’d love to hear how others are using this new tool.