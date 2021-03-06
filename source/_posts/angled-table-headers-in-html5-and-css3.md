title: Angled Table Headers in HTML5 and CSS3
date: 2012/2/17 16:09:42
alias: blog/464/
tags:
- CSS3
- HTML5
- Software
- Development
photos:
- /journal_images/Windows-Live-Writer/Angled-Table-Headers-in-HTML5-and-CSS3_D8EB/DxGQuickNavComp_2.jpg|The original design comp
---
[![The original design comp](/journal_images/Windows-Live-Writer/Angled-Table-Headers-in-HTML5-and-CSS3_D8EB/DxGQuickNavComp_thumb.jpg "The original design comp")](/journal_images/Windows-Live-Writer/Angled-Table-Headers-in-HTML5-and-CSS3_D8EB/DxGQuickNavComp_2.jpg)

I got the design comp above for one of my projects at [EffectiveUI](http://www.effectiveui.com) and immediately thought, “How am I going to be able to do that in HTML and CSS?'”  The table headers are generated dynamically by system defined sections and could be different for different groups of users, so using an image for the table header was impractical.  I knew CSS3 gave me some new options using 2D transforms, but browser support was uneven.  Another problem in this design that looks like a really minor feature is the carrot under the “QuickNav” text.  Fortunately, the requirements of this project are that we are just supporting the latest versions of IE, Firefox, Chrome, and Safari, so CSS3 2D transforms it is.

My initial attempt didn’t go so well as you can see below.  Not only were the browser implementations of the 2D transforms uneven, but the documentation available online was less than complete as well. 

[![DxGAngledHeaders1](/journal_images/Windows-Live-Writer/Angled-Table-Headers-in-HTML5-and-CSS3_D8EB/DxGAngledHeaders1_thumb.png "DxGAngledHeaders1")](/journal_images/Windows-Live-Writer/Angled-Table-Headers-in-HTML5-and-CSS3_D8EB/DxGAngledHeaders1_2.png)

So all of my headers didn’t line up with their columns and the text was way out of whack too.  It turns out that the browsers calculate the position of an element first, then transform it, so I had to adjust the positioning of the elements to end up where I wanted them.  After some playing with the Skew() and Rotate() CSS3 2D transform methods, I discovered that I needed a little extra markup in each <th> cell to get the display to show up correctly.  Even with that being said, the end markup is still very clean to generate the table:

```xml
<div class="quick-nav-container">
    <h4>QuickNav</h4>
    <a class="close" href="#">x</a>
    <div class="quick-nav">
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th class="skew"><div class="odd"><span>All</span></div></th>
                    <th class="skew"><div class=""><span>General</span></div></th>
                    <th class="skew"><div class="odd"><span>Typography</span></div></th>
                    <th class="skew"><div class=""><span>Colors</span></div></th>
                    <th class="skew"><div class="odd"><span>Buttons</span></div></th>
                    <th class="skew"><div class=""><span>Form Elements</span></div></th>
                    <th class="skew"><div class="odd"><span>Windows</span></div></th>
                    <th class="skew"><div class=""><span>Utilities</span></div></th>
                    <th class="skew"><div class="odd"><span>Images</span></div></th>
                    <th class="skew"><div class=""><span>Iconography</span></div></th>
                    <th class="skew"><div class="odd"><span>Layout Grids</span></div></th>
                    <th class="skew"><div class=""><span>Page Templates</span></div></th>
                    <th class="skew"><div class="odd"><span>Media</span></div></th>
                    <th class="skew"><div class=""><span>Misc.</span></div></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="project-name">EffectiveUI DxG</td>
                    <td class="odd"><a href="/Search/SearchByProject?projectName=EffectiveUI%20DxG">&#187;</a></td>
                    <td class=""><a href="/Search/QuickNav?projectId=1&amp;sectionId=1">&#187;</a></td>
                    <td class="odd"><a href="/Search/QuickNav?projectId=1&amp;sectionId=2">&#187;</a></td>
                    <td class=""><a href="/Search/QuickNav?projectId=1&amp;sectionId=3">&#187;</a></td>
                    <td class="odd"><a href="/Search/QuickNav?projectId=1&amp;sectionId=4">&#187;</a></td>
                    <td class=""><a href="/Search/QuickNav?projectId=1&amp;sectionId=5">&#187;</a></td>
                    <td class="odd"><a href="/Search/QuickNav?projectId=1&amp;sectionId=6">&#187;</a></td>
                    <td class=""><a href="/Search/QuickNav?projectId=1&amp;sectionId=7">&#187;</a></td>
                    <td class="odd"><a href="/Search/QuickNav?projectId=1&amp;sectionId=8">&#187;</a></td>
                    <td class=""><a href="/Search/QuickNav?projectId=1&amp;sectionId=9">&#187;</a></td>
                    <td class="odd"><a href="/Search/QuickNav?projectId=1&amp;sectionId=10">&#187;</a></td>
                    <td class=""><a href="/Search/QuickNav?projectId=1&amp;sectionId=11">&#187;</a></td>
                    <td class="odd"><a href="/Search/QuickNav?projectId=1&amp;sectionId=12">&#187;</a></td>
                    <td class=""><a href="/Search/QuickNav?projectId=1&amp;sectionId=13">&#187;</a></td>
                </tr>
                <tr>
                    <td class="project-name">Test Project</td>
                    <td class="odd"><a href="/Search/SearchByProject?projectName=Test%20Project">&#187;</a></td>
                    <td class=""><a href="/Search/QuickNav?projectId=2&amp;sectionId=1">&#187;</a></td>
                    <td class="odd"><a href="/Search/QuickNav?projectId=2&amp;sectionId=2">&#187;</a></td>
                    <td class=""><a href="/Search/QuickNav?projectId=2&amp;sectionId=3">&#187;</a></td>
                    <td class="odd"><a href="/Search/QuickNav?projectId=2&amp;sectionId=4">&#187;</a></td>
                    <td class=""><a href="/Search/QuickNav?projectId=2&amp;sectionId=5">&#187;</a></td>
                    <td class="odd"><a href="/Search/QuickNav?projectId=2&amp;sectionId=6">&#187;</a></td>
                    <td class=""><a href="/Search/QuickNav?projectId=2&amp;sectionId=7">&#187;</a></td>
                    <td class="odd"><a href="/Search/QuickNav?projectId=2&amp;sectionId=8">&#187;</a></td>
                    <td class=""><a href="/Search/QuickNav?projectId=2&amp;sectionId=9">&#187;</a></td>
                    <td class="odd"><a href="/Search/QuickNav?projectId=2&amp;sectionId=10">&#187;</a></td>
                    <td class=""><a href="/Search/QuickNav?projectId=2&amp;sectionId=11">&#187;</a></td>
                    <td class="odd"><a href="/Search/QuickNav?projectId=2&amp;sectionId=12">&#187;</a></td>
                    <td class=""><a href="/Search/QuickNav?projectId=2&amp;sectionId=13">&#187;</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
```

As you can see in the code above, I used no images to achieve this effect.  The X close button in the upper right is a simple anchor tag with the border-radius property set to make it appear to be a circle.  The most interesting pieces to note for the angled headers are the <th class=”skew”> tags and the <div> and <span> tags contained within.  Those div and span tags are the extra markup needed to make all of the 2D transforms play nice with each other to generate the 45 degree angled headers. 

The CSS used to generate the table is as follows:

```css
.quick-nav-container {
    background-color: #666666;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    position: absolute;
    z-index: 100;
    padding: 30px 14px 14px 14px;
    display: none;
}

.quick-nav-container h4 {
    position:absolute;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: bold;
    width: 112px;
    top: 0px;
    left: 0px;
    text-align: center;
    padding: 8px;
}

/* creates triangle */
.quick-nav-container h4:after {
    content:"";
    position:absolute;
    bottom:-10px; /* value = - border-top-width - border-bottom-width */
    left:56px; /* controls horizontal position */
    border-width:10px 10px 0; /* vary these values to change the angle of the vertex */
    border-style:solid;
    border-color:#666666 transparent;
    /* reduce the damage in FF3.0 */
    display:block; 
    width:0;
    z-index: 1;
}

.quick-nav-container a.close {
    position: absolute;
    top: 4px;
    right: -12px;
    width: 16px;
    height: 16px;
    text-decoration: none;
    color: #333333;
    background-color: #FFFFFF;
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
    border-radius: 8px;
    display: block;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
}

.quick-nav {
    position: relative;
    background-color: #FFFFFF;
    font-size: 10px;
    padding: 20px 90px 20px 20px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
}

.quick-nav a {
    color: #333333;
    text-decoration: none;
    font-size: 14px;
}

.quick-nav table th.skew {
    height: 60px;
    width: 40px;
    position: relative;
    vertical-align: bottom;
}

.quick-nav table th.skew > div {
    position: relative;
    top: 0px;
    left: 30px;
    height: 100%;
    transform:skew(-45deg,0deg);
    -ms-transform:skew(-45deg,0deg); /* IE 9 */
    -moz-transform:skew(-45deg,0deg); /* Firefox */
    -webkit-transform:skew(-45deg,0deg); /* Safari and Chrome */
    -o-transform:skew(-45deg,0deg); /* Opera */    
    overflow: hidden;
    border-top: 1px solid #CCCCCC;
    border-left: 1px solid #CCCCCC;
    border-right: 1px solid #CCCCCC;
}

.quick-nav table th.skew span {
    transform:skew(45deg,0deg) rotate(315deg);
    -ms-transform:skew(45deg,0deg) rotate(315deg); /* IE 9 */
    -moz-transform:skew(45deg,0deg) rotate(315deg); /* Firefox */
    -webkit-transform:skew(45deg,0deg) rotate(315deg); /* Safari and Chrome */
    -o-transform:skew(45deg,0deg) rotate(315deg); /* Opera */        
    position: absolute;
    bottom: 15px;
    left: 1px;
    display: inline-block;
    width: 100%;
    text-align: left;
}

.quick-nav table td {
    width: 40px;
    height: 35px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #CCCCCC;
}

.quick-nav table td a {
    display: block;
    width: 100%;
    text-align: center;
}

.quick-nav table td.project-name {
    width: auto;
    text-align: right;
    font-weight: bold;
    border: none;
    padding-right: 8px;
}

.quick-nav table .odd {
    background-color: #E8E8E8;
}
```

The most important sections are highlighted above in the selectors for `.quick-nav table th.skew`, `.quick-nav table th.skew > div`, and `.quick-nav table th.skew span.`  This is where the rotation and absolute positioning happens to make the rotation happen correctly.  For the carrot below, `QuickNav`, I used the speech bubbles technique described by Nicolas Gallagher at [http://nicolasgallagher.com/pure-css-speech-bubbles/](http://nicolasgallagher.com/pure-css-speech-bubbles/).  The final result is below, pixel for pixel perfect with the design comp and a new technique that I will definitely be keeping in my back pocket for future projects.

[![The completed angled headers](/journal_images/Windows-Live-Writer/Angled-Table-Headers-in-HTML5-and-CSS3_D8EB/DxGAngledHeadersComplete_thumb.png "The completed angled headers")](/journal_images/Windows-Live-Writer/Angled-Table-Headers-in-HTML5-and-CSS3_D8EB/DxGAngledHeadersComplete_2.png)