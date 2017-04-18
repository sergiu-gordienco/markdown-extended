# [Helo,](#nav-top)[nav-top] discover my set of markdown syntax examples

Goto: [Index](/)

[Fork Markdown Extended](https://github.com/sergiu-gordienco/markdown-extended) on **GitHub**

In the following code I will describe a set of example, so I will show code examples and then the code functionality

## Basic Markdown formatters

Writing a paragraph with a title is so simple... Just typing text, sow below you will see the code example.

```markdown
## Basic Markdown formatters

Writing an paragraph with a title is so simple... Just typing text, sow below you will see the code example.
```

### Typing different Headers _(different sizes)_

Each header will be encoded into a **HTML** header: example `# Heading` into `<h1>Heading</h1>`

```markdown
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```


### Typing different text styles

The characters used for text styling are `\_`, `\``, `\~` and `\*`
to escape one of this chars use `\\` so you can type `\\\`` to escape `\``

* Font weight  bold:
	* __bold text__ with `__bold text__`
	or with `**bold-text**`
* Font italic:
	* _italic text_ with `_italic text_`
	or with `*italic text*`
* Text underline:
	___underline text___ with `___underline text___`
* Stroke text:
	~Stroke text~ with `~stroke text~`

### Adding links

We have multiple types of links

1. Simple links .. example [simple link to index page](/) or [CloudWebCode Site](//www.cloudwebcode.com)
``[simple link to index page](/) or [CloudWebCode Site](//www.cloudwebcode.com)``
2. Links that we open in new window [simple link to open new page](//www.google.com)[blank]
``[simple link to open new page](//www.google.com)[blank]``
3. Links for downloading **HTML5** [download link for *m_markdown css file*](../m_markdown.css)[download=m_markdown.css]
``[download link for *m_markdown css file*](../m_markdown.css)[download=m_markdown.css]``
4. Links with names and links with local address [link with *name*](/)[link-name-01] and [link with local address](#link-name-01)
``[link with *name*](/)[link-name-01] and [link with local address](#link-name-01)``


### Adding Quotes

> Text for a blockquote, it can br written on multiple
> line easily

```markdown
> Text for a blockquote, it can br written on multiple
> line easily
```

Goto: [Index](/), [Top](#nav-top)

### Adding inline code sections

1. Adding simple inline code, example: `inline-code` with \`inline-code\`
2. Adding simple row code, example: ``example of row code`` with \`\`example of row code\`\`
3. Adding set on rows of code, example:

### Adding code section using \`\`\`

Currenty we added a code with **CSS** syntax, but supported syntaxes are: **clike** - C-like ( CPP, C# ); **clojure**; **coffeescript**; **css**; **diff** - Git language ( mode : diff ); **ecl**; **erlang**; **gfm**; **go**; **groovy**; **haskell**; **haxe**; **htmlembedded**; **htmlmixed** - html; **javascript**; **jinja2**; **less**; **lua**; **markdown**; **mysql**; **ntriples**; **ocaml**; **pascal**; **perl**; **php**; **pig**; **plsql**; **properties**; **python**; **r**; **rpm**; **rst**; **ruby**; **rust**; **scheme**; **shell** - shell, bash, sh; **sieve**; **smalltalk**; **smarty**; **sparql**; **stex**; **tiddlywiki**; **tiki**; **vb**; **vbscript**; **velocity**; **verilog**; **xml**; **xquery**; **yaml**; **text**.

	```css
		... your code
	```

Result

```css
.markdown-code {
	background-color: #FFF;
	color: #333;
}
```

### Adding code section using tabulation
		.markdown-code {
			background-color: #FFF;
			color: #333;
		}```

Result

	.markdown-code {
		background-color: #FFF;
		color: #333;
	}

Goto: [Top](#nav-top), [Index](/), [Syntax](syntax.md), [How to use](browser.md), [Download](download.md)

## Definitions

[id]: http://example.com "parameter 2"
[id2]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABOtJREFUeNrkV81rXUUUPzP3vveSvEBS41P8bohSqC6iKbiooLhxpWSrO8E/oCtFLbhyIbQYUEFx4cY/oN246qJ140KFSAWtoJuAUoWatMnLzf2Y4zlnPu5M733ZduENk5k3M3fOb875nd/MVYgI9/LRcI+f3DeUUnD29c+XAHELATepaxnEO2gr8G3nMT8Wt/28njF6dundS1Sf++Hyu3t+HeUbL7zxBRu/OjfK19ceX4H5uYGDRgsZEMOGi0FojAl1w3Vj2uJ+11Eft+u6guJwSms127TaS99ffm8v8QDvnI2f3TgJw0FOHrFe8SDIFpXUYF3bxatQN9LHNZeS+6sGFLWV1lQyONzfWzdotmjRNxMOsNuffOJ+GA1zyLSCPNNSBrmGYZ5Rf0bAbOG+nPoyqjOak+VK3uGiuTjwqt0dtVE2lQ9GvNnNDgc45gvzA3lZu4V4QVnIrWQrcj8Z1RQXHjdU9nYLuHNQgvEh4BA1LkQNc8MIAA6jW2u5C4AGV5YXxIx3f1ssBxiBCkAA9qclXP/tJry48RCcOb0qbtaKwbO72RNa+j747FsYZExOAkJ9cepHHkBH1qRHgPF8Jp0QzxGRF/n1j3/g/bc2YO2xE7C4uAij0SiA7iyEPoNCVqQAEP08biiphf3QZgC70wO5vV/A+qkVMT6ZTGA4HMrOE7sC1rgUNeIBxHSjOoYpRjnKDq0YNT6l2phy/fetA3L7gzAej8V4nucCIC5ZlgVQ6D0gNmaEgA0qgwl77Tso5AppaKx3xgtDcTsb8s83127AR19eExJ7o8p5wG7QzAqB27WxTMXGsg1NLEAOhMt5TzjLbgv706+/gwfum6c5pAVVTfOoVFYfbBjSEMRpCDt/3ZZdLczllOs25zExjkGIGNQzT03EcBz7o7KC8bwWoNZjHEIG0EhtTNPvAUZWElJD5JoeanEh/3lNkPSjf00AgTbd7mI8j+1PC1HAsqrEU6apBUwIw6w0ZLScpyI2xqYT1hhemhaVFH6/OKoC2RIABOywMC5btEWtOaRHgYT9HACb64SX5iiJb5vCFsDBtILNl9dg9dElEZk+D1x4+xWrmk6Uft+5BR9/dTXEX+q+45gHWUpZAwyqoOWWMxjIeGp1As89/YgwnwunX/w8v37S5b5V059u3KTdV60QBS/0hKAmI5oV12WCkgRKj2I2GOd97y0n6t/+5U8KS+nibuxmZimhEMUJvkpUFJ0WGKvxPbGf9fz4845zu1dBMysNLbNlVMXHgxMjY+t3Ll6x4aL2J+dfhWdPP5wYpFsVXzoC0Zr6KHE/ziIhuB3GZxJiq4TGvUjyIGBY0Mqy7OyYjVdHdxLSJQQ8VoqN3ZlHKmHBNg3lRZfPTFS5HdDvNBx4l3GM2O+kuC8E6ESkleR254jdRZU763ufaL6cgNGF9tgQeNkVowaT3UNQMXusgrZa0Tn7/ZEe+I7RMWw6aZgcx1VVth6IXR8Zx6hf9QhRSLfIYELA4JHuh8kun2DGhjmQL4lh5AkvNP0RwIhHvQTc7QDgj4aymLpDIyZQSqSwM4jvDcdxoL0D2FrGL/V54Bx/NBQH/9JJVpAsV0nsQhaEuM76pox3a8Lc6Itqm22FL7L4MnHmtQ+XaOqWu7cvB8YiBOPuppqy2YPzY1E7cbv7NLt+5UL30+x/+3X8nwADAGdc48ttRnltAAAAAElFTkSuQmCC (parameter 2)

	[id]: http://example.com "parameter 2"
	[id2]: data:image/png;base64,iVBORw0K...QmCC (parameter 2)

	# for Images Iframes Objects
	[source1]: "http://image-url" "Alternative Text" WIDTH HEIGHT

	width/height can be, examples:
	100, auto, 100vw, 100vh, 100vmin, 100vmax, 100em, 100pt, 100px;

	Using:
	!image-x[Alt text][source1]
	!image-50%xauto[][source1]

	!iframe-x[Alt text][source1]
	!iframe-50%xauto[][source1]

	!object-x[Alt text][source1]
	!object-50%xauto[][source1]


### Links from definitions

[][id]

	[][id]

### Images from definitions

![Alt text][id2]

![][id2]

```
	![Alt text][id2]

	![][id2]
```

## Attaching image to code

### Example of image tag

	___Underline Code___ Image in code ![image](image url)

___Underline Code___ Image in code ![image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABOtJREFUeNrkV81rXUUUPzP3vveSvEBS41P8bohSqC6iKbiooLhxpWSrO8E/oCtFLbhyIbQYUEFx4cY/oN246qJ140KFSAWtoJuAUoWatMnLzf2Y4zlnPu5M733ZduENk5k3M3fOb875nd/MVYgI9/LRcI+f3DeUUnD29c+XAHELATepaxnEO2gr8G3nMT8Wt/28njF6dundS1Sf++Hyu3t+HeUbL7zxBRu/OjfK19ceX4H5uYGDRgsZEMOGi0FojAl1w3Vj2uJ+11Eft+u6guJwSms127TaS99ffm8v8QDvnI2f3TgJw0FOHrFe8SDIFpXUYF3bxatQN9LHNZeS+6sGFLWV1lQyONzfWzdotmjRNxMOsNuffOJ+GA1zyLSCPNNSBrmGYZ5Rf0bAbOG+nPoyqjOak+VK3uGiuTjwqt0dtVE2lQ9GvNnNDgc45gvzA3lZu4V4QVnIrWQrcj8Z1RQXHjdU9nYLuHNQgvEh4BA1LkQNc8MIAA6jW2u5C4AGV5YXxIx3f1ssBxiBCkAA9qclXP/tJry48RCcOb0qbtaKwbO72RNa+j747FsYZExOAkJ9cepHHkBH1qRHgPF8Jp0QzxGRF/n1j3/g/bc2YO2xE7C4uAij0SiA7iyEPoNCVqQAEP08biiphf3QZgC70wO5vV/A+qkVMT6ZTGA4HMrOE7sC1rgUNeIBxHSjOoYpRjnKDq0YNT6l2phy/fetA3L7gzAej8V4nucCIC5ZlgVQ6D0gNmaEgA0qgwl77Tso5AppaKx3xgtDcTsb8s83127AR19eExJ7o8p5wG7QzAqB27WxTMXGsg1NLEAOhMt5TzjLbgv706+/gwfum6c5pAVVTfOoVFYfbBjSEMRpCDt/3ZZdLczllOs25zExjkGIGNQzT03EcBz7o7KC8bwWoNZjHEIG0EhtTNPvAUZWElJD5JoeanEh/3lNkPSjf00AgTbd7mI8j+1PC1HAsqrEU6apBUwIw6w0ZLScpyI2xqYT1hhemhaVFH6/OKoC2RIABOywMC5btEWtOaRHgYT9HACb64SX5iiJb5vCFsDBtILNl9dg9dElEZk+D1x4+xWrmk6Uft+5BR9/dTXEX+q+45gHWUpZAwyqoOWWMxjIeGp1As89/YgwnwunX/w8v37S5b5V059u3KTdV60QBS/0hKAmI5oV12WCkgRKj2I2GOd97y0n6t/+5U8KS+nibuxmZimhEMUJvkpUFJ0WGKvxPbGf9fz4845zu1dBMysNLbNlVMXHgxMjY+t3Ll6x4aL2J+dfhWdPP5wYpFsVXzoC0Zr6KHE/ziIhuB3GZxJiq4TGvUjyIGBY0Mqy7OyYjVdHdxLSJQQ8VoqN3ZlHKmHBNg3lRZfPTFS5HdDvNBx4l3GM2O+kuC8E6ESkleR254jdRZU763ufaL6cgNGF9tgQeNkVowaT3UNQMXusgrZa0Tn7/ZEe+I7RMWw6aZgcx1VVth6IXR8Zx6hf9QhRSLfIYELA4JHuh8kun2DGhjmQL4lh5AkvNP0RwIhHvQTc7QDgj4aymLpDIyZQSqSwM4jvDcdxoL0D2FrGL/V54Bx/NBQH/9JJVpAsV0nsQhaEuM76pox3a8Lc6Itqm22FL7L4MnHmtQ+XaOqWu7cvB8YiBOPuppqy2YPzY1E7cbv7NLt+5UL30+x/+3X8nwADAGdc48ttRnltAAAAAElFTkSuQmCC)

### Example of image with dimensions

	!image-230x27[Alt text](image url)

!image-230x27[Alt text](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABOtJREFUeNrkV81rXUUUPzP3vveSvEBS41P8bohSqC6iKbiooLhxpWSrO8E/oCtFLbhyIbQYUEFx4cY/oN246qJ140KFSAWtoJuAUoWatMnLzf2Y4zlnPu5M733ZduENk5k3M3fOb875nd/MVYgI9/LRcI+f3DeUUnD29c+XAHELATepaxnEO2gr8G3nMT8Wt/28njF6dundS1Sf++Hyu3t+HeUbL7zxBRu/OjfK19ceX4H5uYGDRgsZEMOGi0FojAl1w3Vj2uJ+11Eft+u6guJwSms127TaS99ffm8v8QDvnI2f3TgJw0FOHrFe8SDIFpXUYF3bxatQN9LHNZeS+6sGFLWV1lQyONzfWzdotmjRNxMOsNuffOJ+GA1zyLSCPNNSBrmGYZ5Rf0bAbOG+nPoyqjOak+VK3uGiuTjwqt0dtVE2lQ9GvNnNDgc45gvzA3lZu4V4QVnIrWQrcj8Z1RQXHjdU9nYLuHNQgvEh4BA1LkQNc8MIAA6jW2u5C4AGV5YXxIx3f1ssBxiBCkAA9qclXP/tJry48RCcOb0qbtaKwbO72RNa+j747FsYZExOAkJ9cepHHkBH1qRHgPF8Jp0QzxGRF/n1j3/g/bc2YO2xE7C4uAij0SiA7iyEPoNCVqQAEP08biiphf3QZgC70wO5vV/A+qkVMT6ZTGA4HMrOE7sC1rgUNeIBxHSjOoYpRjnKDq0YNT6l2phy/fetA3L7gzAej8V4nucCIC5ZlgVQ6D0gNmaEgA0qgwl77Tso5AppaKx3xgtDcTsb8s83127AR19eExJ7o8p5wG7QzAqB27WxTMXGsg1NLEAOhMt5TzjLbgv706+/gwfum6c5pAVVTfOoVFYfbBjSEMRpCDt/3ZZdLczllOs25zExjkGIGNQzT03EcBz7o7KC8bwWoNZjHEIG0EhtTNPvAUZWElJD5JoeanEh/3lNkPSjf00AgTbd7mI8j+1PC1HAsqrEU6apBUwIw6w0ZLScpyI2xqYT1hhemhaVFH6/OKoC2RIABOywMC5btEWtOaRHgYT9HACb64SX5iiJb5vCFsDBtILNl9dg9dElEZk+D1x4+xWrmk6Uft+5BR9/dTXEX+q+45gHWUpZAwyqoOWWMxjIeGp1As89/YgwnwunX/w8v37S5b5V059u3KTdV60QBS/0hKAmI5oV12WCkgRKj2I2GOd97y0n6t/+5U8KS+nibuxmZimhEMUJvkpUFJ0WGKvxPbGf9fz4845zu1dBMysNLbNlVMXHgxMjY+t3Ll6x4aL2J+dfhWdPP5wYpFsVXzoC0Zr6KHE/ziIhuB3GZxJiq4TGvUjyIGBY0Mqy7OyYjVdHdxLSJQQ8VoqN3ZlHKmHBNg3lRZfPTFS5HdDvNBx4l3GM2O+kuC8E6ESkleR254jdRZU763ufaL6cgNGF9tgQeNkVowaT3UNQMXusgrZa0Tn7/ZEe+I7RMWw6aZgcx1VVth6IXR8Zx6hf9QhRSLfIYELA4JHuh8kun2DGhjmQL4lh5AkvNP0RwIhHvQTc7QDgj4aymLpDIyZQSqSwM4jvDcdxoL0D2FrGL/V54Bx/NBQH/9JJVpAsV0nsQhaEuM76pox3a8Lc6Itqm22FL7L4MnHmtQ+XaOqWu7cvB8YiBOPuppqy2YPzY1E7cbv7NLt+5UL30+x/+3X8nwADAGdc48ttRnltAAAAAElFTkSuQmCC)

## Mixed Example

Lorem [link with name `index`](/)[index] ipsum do ist dolor es ist amet. ___Imba do recoda___ leu im sabi foar mi det. Seumo go est success.
_embed text using underscore_ ipsum do ist dolor es ist amet. [simple link](page-2.md) Imba **bold text usin asterix** and *embed text using asterix* foar mi det. Seumo go est success.
__cold text using underscore*__ do ist dolor es ist amet. Imba do recoda

Download: [markdown.css](/parts/gadget/m%5fmarkdown/m%5fmarkdown.css)[download=markdown.css]
Download: [markdown.js](/parts/gadget/m%5fmarkdown/m%5fmarkdown.css)[download=markdown.js]

_code inline_ `var x = 23;`leu im sabi foar mi det. Seumo go est success.

```markdown
Lorem [link with name `index`](/)[index] ipsum do ist dolor es ist amet. ___Imba do recoda___ leu im sabi foar mi det. Seumo go est success.
_embed text using underscore_ ipsum do ist dolor es ist amet. [simple link](page-2.md) Imba **bold text usin asterix** and *embed text using asterix* foar mi det. Seumo go est success.
__cold text using underscore*__ do ist dolor es ist amet. Imba do recoda

_code inline_ `var x = 23;`leu im sabi foar mi det. Seumo go est success.
```

Goto: [Top](#nav-top), [Index](/), [Syntax](syntax.md), [How to use](browser.md), [Download](download.md)

## Attaching HTML5 Elements to Markdown

### HTML Object

	!object-200x23[Object Element](//www.w3schools.com/html/bookmark.swf)

_Not showed because object needs source from same origin_

### HTML Iframe

	!iframe-100%x450[pasteview example](https://www.cloudwebcode.com/app/pasteview/i/cd-nb80vd-17flei?embed=1&l=ro)

!iframe-100%x450[pasteview example](https://www.cloudwebcode.com/app/pasteview/i/cd-nb80vd-17flei?embed=1&l=ro)

### HTML5 Video Element

	!video-200x23[Video Element](//www.w3schools.com/html/movie.mp4#video/mp4;http://www.w3schools.com/html/movie.ogg#video/ogg)

!video-320x240[Video Element](//www.w3schools.com/html/movie.mp4#video/mp4;http://www.w3schools.com/html/movie.ogg#video/ogg)

### HTML5 Audio Element

	!audio[Audio Element](//www.w3schools.com/html/horse.mp3#audio/mp3;http://www.w3schools.com/html/horse.ogg#audio/ogg)

!audio[Audio Element](//www.w3schools.com/html/horse.mp3#audio/mp3;http://www.w3schools.com/html/horse.ogg#audio/ogg)

## Attaching image to code

	___Underline Code___ Image in code ![image](image url)
	!image-50x100[image](image url)

___Underline Code___ Image in code ![image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABOtJREFUeNrkV81rXUUUPzP3vveSvEBS41P8bohSqC6iKbiooLhxpWSrO8E/oCtFLbhyIbQYUEFx4cY/oN246qJ140KFSAWtoJuAUoWatMnLzf2Y4zlnPu5M733ZduENk5k3M3fOb875nd/MVYgI9/LRcI+f3DeUUnD29c+XAHELATepaxnEO2gr8G3nMT8Wt/28njF6dundS1Sf++Hyu3t+HeUbL7zxBRu/OjfK19ceX4H5uYGDRgsZEMOGi0FojAl1w3Vj2uJ+11Eft+u6guJwSms127TaS99ffm8v8QDvnI2f3TgJw0FOHrFe8SDIFpXUYF3bxatQN9LHNZeS+6sGFLWV1lQyONzfWzdotmjRNxMOsNuffOJ+GA1zyLSCPNNSBrmGYZ5Rf0bAbOG+nPoyqjOak+VK3uGiuTjwqt0dtVE2lQ9GvNnNDgc45gvzA3lZu4V4QVnIrWQrcj8Z1RQXHjdU9nYLuHNQgvEh4BA1LkQNc8MIAA6jW2u5C4AGV5YXxIx3f1ssBxiBCkAA9qclXP/tJry48RCcOb0qbtaKwbO72RNa+j747FsYZExOAkJ9cepHHkBH1qRHgPF8Jp0QzxGRF/n1j3/g/bc2YO2xE7C4uAij0SiA7iyEPoNCVqQAEP08biiphf3QZgC70wO5vV/A+qkVMT6ZTGA4HMrOE7sC1rgUNeIBxHSjOoYpRjnKDq0YNT6l2phy/fetA3L7gzAej8V4nucCIC5ZlgVQ6D0gNmaEgA0qgwl77Tso5AppaKx3xgtDcTsb8s83127AR19eExJ7o8p5wG7QzAqB27WxTMXGsg1NLEAOhMt5TzjLbgv706+/gwfum6c5pAVVTfOoVFYfbBjSEMRpCDt/3ZZdLczllOs25zExjkGIGNQzT03EcBz7o7KC8bwWoNZjHEIG0EhtTNPvAUZWElJD5JoeanEh/3lNkPSjf00AgTbd7mI8j+1PC1HAsqrEU6apBUwIw6w0ZLScpyI2xqYT1hhemhaVFH6/OKoC2RIABOywMC5btEWtOaRHgYT9HACb64SX5iiJb5vCFsDBtILNl9dg9dElEZk+D1x4+xWrmk6Uft+5BR9/dTXEX+q+45gHWUpZAwyqoOWWMxjIeGp1As89/YgwnwunX/w8v37S5b5V059u3KTdV60QBS/0hKAmI5oV12WCkgRKj2I2GOd97y0n6t/+5U8KS+nibuxmZimhEMUJvkpUFJ0WGKvxPbGf9fz4845zu1dBMysNLbNlVMXHgxMjY+t3Ll6x4aL2J+dfhWdPP5wYpFsVXzoC0Zr6KHE/ziIhuB3GZxJiq4TGvUjyIGBY0Mqy7OyYjVdHdxLSJQQ8VoqN3ZlHKmHBNg3lRZfPTFS5HdDvNBx4l3GM2O+kuC8E6ESkleR254jdRZU763ufaL6cgNGF9tgQeNkVowaT3UNQMXusgrZa0Tn7/ZEe+I7RMWw6aZgcx1VVth6IXR8Zx6hf9QhRSLfIYELA4JHuh8kun2DGhjmQL4lh5AkvNP0RwIhHvQTc7QDgj4aymLpDIyZQSqSwM4jvDcdxoL0D2FrGL/V54Bx/NBQH/9JJVpAsV0nsQhaEuM76pox3a8Lc6Itqm22FL7L4MnHmtQ+XaOqWu7cvB8YiBOPuppqy2YPzY1E7cbv7NLt+5UL30+x/+3X8nwADAGdc48ttRnltAAAAAElFTkSuQmCC)
!image-50x100[image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABOtJREFUeNrkV81rXUUUPzP3vveSvEBS41P8bohSqC6iKbiooLhxpWSrO8E/oCtFLbhyIbQYUEFx4cY/oN246qJ140KFSAWtoJuAUoWatMnLzf2Y4zlnPu5M733ZduENk5k3M3fOb875nd/MVYgI9/LRcI+f3DeUUnD29c+XAHELATepaxnEO2gr8G3nMT8Wt/28njF6dundS1Sf++Hyu3t+HeUbL7zxBRu/OjfK19ceX4H5uYGDRgsZEMOGi0FojAl1w3Vj2uJ+11Eft+u6guJwSms127TaS99ffm8v8QDvnI2f3TgJw0FOHrFe8SDIFpXUYF3bxatQN9LHNZeS+6sGFLWV1lQyONzfWzdotmjRNxMOsNuffOJ+GA1zyLSCPNNSBrmGYZ5Rf0bAbOG+nPoyqjOak+VK3uGiuTjwqt0dtVE2lQ9GvNnNDgc45gvzA3lZu4V4QVnIrWQrcj8Z1RQXHjdU9nYLuHNQgvEh4BA1LkQNc8MIAA6jW2u5C4AGV5YXxIx3f1ssBxiBCkAA9qclXP/tJry48RCcOb0qbtaKwbO72RNa+j747FsYZExOAkJ9cepHHkBH1qRHgPF8Jp0QzxGRF/n1j3/g/bc2YO2xE7C4uAij0SiA7iyEPoNCVqQAEP08biiphf3QZgC70wO5vV/A+qkVMT6ZTGA4HMrOE7sC1rgUNeIBxHSjOoYpRjnKDq0YNT6l2phy/fetA3L7gzAej8V4nucCIC5ZlgVQ6D0gNmaEgA0qgwl77Tso5AppaKx3xgtDcTsb8s83127AR19eExJ7o8p5wG7QzAqB27WxTMXGsg1NLEAOhMt5TzjLbgv706+/gwfum6c5pAVVTfOoVFYfbBjSEMRpCDt/3ZZdLczllOs25zExjkGIGNQzT03EcBz7o7KC8bwWoNZjHEIG0EhtTNPvAUZWElJD5JoeanEh/3lNkPSjf00AgTbd7mI8j+1PC1HAsqrEU6apBUwIw6w0ZLScpyI2xqYT1hhemhaVFH6/OKoC2RIABOywMC5btEWtOaRHgYT9HACb64SX5iiJb5vCFsDBtILNl9dg9dElEZk+D1x4+xWrmk6Uft+5BR9/dTXEX+q+45gHWUpZAwyqoOWWMxjIeGp1As89/YgwnwunX/w8v37S5b5V059u3KTdV60QBS/0hKAmI5oV12WCkgRKj2I2GOd97y0n6t/+5U8KS+nibuxmZimhEMUJvkpUFJ0WGKvxPbGf9fz4845zu1dBMysNLbNlVMXHgxMjY+t3Ll6x4aL2J+dfhWdPP5wYpFsVXzoC0Zr6KHE/ziIhuB3GZxJiq4TGvUjyIGBY0Mqy7OyYjVdHdxLSJQQ8VoqN3ZlHKmHBNg3lRZfPTFS5HdDvNBx4l3GM2O+kuC8E6ESkleR254jdRZU763ufaL6cgNGF9tgQeNkVowaT3UNQMXusgrZa0Tn7/ZEe+I7RMWw6aZgcx1VVth6IXR8Zx6hf9QhRSLfIYELA4JHuh8kun2DGhjmQL4lh5AkvNP0RwIhHvQTc7QDgj4aymLpDIyZQSqSwM4jvDcdxoL0D2FrGL/V54Bx/NBQH/9JJVpAsV0nsQhaEuM76pox3a8Lc6Itqm22FL7L4MnHmtQ+XaOqWu7cvB8YiBOPuppqy2YPzY1E7cbv7NLt+5UL30+x/+3X8nwADAGdc48ttRnltAAAAAElFTkSuQmCC)

Goto: [Top](#nav-top), [Index](/), [Syntax](syntax.md), [How to use](browser.md), [Download](download.md)

## Code using \x60 `

	``var x = 345;``

Result ``var x = 345;``

## code using tabulation

	.markdown-code {
		background-color: #FFF;
		color: #333;
		font: 13px Helvetica, arial, freesans, clean, sans-serif;
		word-wrap: break-word;
		line-height: 1.7;
		padding: 0 20px 20px 20px;
		-webkit-font-smoothing: antialiased;

		display		: block;
		text-align	: left;
		float		: initial;
		clear		: initial;
	}


## CSS code using

	```css
		... your code
	```

Result

```css
.markdown-code {
	background-color: #FFF;
	color: #333;
	font: 13px Helvetica, arial, freesans, clean, sans-serif;
	word-wrap: break-word;
	line-height: 1.7;
	padding: 0 20px 20px 20px;
	-webkit-font-smoothing: antialiased;

	display		: block;
	text-align	: left;
	float		: initial;
	clear		: initial;
}
```

```css
* {
	display		: block;
	text-align	: left;
	float		: initial;
	clear		: initial;
}
```

Goto: [Top](#nav-top), [Index](/), [Syntax](syntax.md), [How to use](browser.md), [Download](download.md)
