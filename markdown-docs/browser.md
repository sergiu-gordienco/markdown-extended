## How to use **m_markdown.js** ?

Goto: [Index](/), [Syntax](syntax.md), [About - _before download_](about.md)

Like a simple functionality of **markdown** string encode.

```html
<script src="m_markdown.js"></script>
<script>console.log( 'Markdown is **sweet**'.markdown() );</script>
```

To build Browser functionality like this documentation

```html
<link rel="stylesheet" href="m_markdown.css" />
<script type="text/javascript" src="m_markdown.js"></script>
<script type="text/javascript" src="m_urlcapture.js"></script>
<script type="text/javascript" src="m_urlload.js"></script>
<div class="m-markdown-browser-example"></div>
<script type="text/javascript">
	var browser	= m_markdown.setBrowser({
		// force to load an url
		// url		: "http://my-site.com/markdown-docs/index.md",
		base	: "http://my-site.com/markdown-docs/",
		node	: document.querySelector('.m-markdown-browser-example')
	}, function (eventName, methods) {
		if (eventName === "init") {
			window.browser	= methods;
		}
	});
</script>
```

!iframe-100%x450[pasteview example](https://www.cloudwebcode.com/app/pasteview/i/cd-ne3lvl-1k6pq3/index.html?embed=1&as-code=1&l=en)

Goto: [Index](/), [Syntax](syntax.md), [About - _before download_](about.md), [Download](download.md)

[Fork Markdown Extended](https://github.com/sergiu-gordienco/markdown-extended) on **GitHub**
