(function() {
	// \0rolldown/runtime.js
	var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod, mod.exports), cb = null), mod.exports);
	// node_modules/wxt/dist/utils/define-content-script.mjs
	function defineContentScript(definition) {
		return definition;
	}
	// node_modules/wxt/dist/browser.mjs
	/**
	* Contains the `browser` export which you should use to access the extension
	* APIs in your project:
	*
	* ```ts
	* import { browser } from 'wxt/browser';
	*
	* browser.runtime.onInstalled.addListener(() => {
	*   // ...
	* });
	* ```
	*
	* @module wxt/browser
	*/
	var browser = globalThis.browser?.runtime?.id ? globalThis.browser : globalThis.chrome;
	// node_modules/@mozilla/readability/Readability.js
	var require_Readability = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		/**
		* Public constructor.
		* @param {HTMLDocument} doc     The document to parse.
		* @param {Object}       options The options object.
		*/
		function Readability(doc, options) {
			if (options && options.documentElement) {
				doc = options;
				options = arguments[2];
			} else if (!doc || !doc.documentElement) throw new Error("First argument to Readability constructor should be a document object.");
			options = options || {};
			this._doc = doc;
			this._docJSDOMParser = this._doc.firstChild.__JSDOMParser__;
			this._articleTitle = null;
			this._articleByline = null;
			this._articleDir = null;
			this._articleSiteName = null;
			this._attempts = [];
			this._metadata = {};
			this._debug = !!options.debug;
			this._maxElemsToParse = options.maxElemsToParse || this.DEFAULT_MAX_ELEMS_TO_PARSE;
			this._nbTopCandidates = options.nbTopCandidates || this.DEFAULT_N_TOP_CANDIDATES;
			this._charThreshold = options.charThreshold || this.DEFAULT_CHAR_THRESHOLD;
			this._classesToPreserve = this.CLASSES_TO_PRESERVE.concat(options.classesToPreserve || []);
			this._keepClasses = !!options.keepClasses;
			this._serializer = options.serializer || function(el) {
				return el.innerHTML;
			};
			this._disableJSONLD = !!options.disableJSONLD;
			this._allowedVideoRegex = options.allowedVideoRegex || this.REGEXPS.videos;
			this._linkDensityModifier = options.linkDensityModifier || 0;
			this._flags = this.FLAG_STRIP_UNLIKELYS | this.FLAG_WEIGHT_CLASSES | this.FLAG_CLEAN_CONDITIONALLY;
			if (this._debug) {
				let logNode = function(node) {
					if (node.nodeType == node.TEXT_NODE) return `${node.nodeName} ("${node.textContent}")`;
					let attrPairs = Array.from(node.attributes || [], function(attr) {
						return `${attr.name}="${attr.value}"`;
					}).join(" ");
					return `<${node.localName} ${attrPairs}>`;
				};
				this.log = function() {
					if (typeof console !== "undefined") {
						let args = Array.from(arguments, (arg) => {
							if (arg && arg.nodeType == this.ELEMENT_NODE) return logNode(arg);
							return arg;
						});
						args.unshift("Reader: (Readability)");
						console.log(...args);
					} else if (typeof dump !== "undefined") {
						var msg = Array.prototype.map.call(arguments, function(x) {
							return x && x.nodeName ? logNode(x) : x;
						}).join(" ");
						dump("Reader: (Readability) " + msg + "\n");
					}
				};
			} else this.log = function() {};
		}
		Readability.prototype = {
			FLAG_STRIP_UNLIKELYS: 1,
			FLAG_WEIGHT_CLASSES: 2,
			FLAG_CLEAN_CONDITIONALLY: 4,
			ELEMENT_NODE: 1,
			TEXT_NODE: 3,
			DEFAULT_MAX_ELEMS_TO_PARSE: 0,
			DEFAULT_N_TOP_CANDIDATES: 5,
			DEFAULT_TAGS_TO_SCORE: "section,h2,h3,h4,h5,h6,p,td,pre".toUpperCase().split(","),
			DEFAULT_CHAR_THRESHOLD: 500,
			REGEXPS: {
				unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
				okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i,
				positive: /article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story/i,
				negative: /-ad-|hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|footer|gdpr|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|widget/i,
				extraneous: /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single|utility/i,
				byline: /byline|author|dateline|writtenby|p-author/i,
				replaceFonts: /<(\/?)font[^>]*>/gi,
				normalize: /\s{2,}/g,
				videos: /\/\/(www\.)?((dailymotion|youtube|youtube-nocookie|player\.vimeo|v\.qq)\.com|(archive|upload\.wikimedia)\.org|player\.twitch\.tv)/i,
				shareElements: /(\b|_)(share|sharedaddy)(\b|_)/i,
				nextLink: /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i,
				prevLink: /(prev|earl|old|new|<|«)/i,
				tokenize: /\W+/g,
				whitespace: /^\s*$/,
				hasContent: /\S$/,
				hashUrl: /^#.+/,
				srcsetUrl: /(\S+)(\s+[\d.]+[xw])?(\s*(?:,|$))/g,
				b64DataUrl: /^data:\s*([^\s;,]+)\s*;\s*base64\s*,/i,
				commas: /\u002C|\u060C|\uFE50|\uFE10|\uFE11|\u2E41|\u2E34|\u2E32|\uFF0C/g,
				jsonLdArticleTypes: /^Article|AdvertiserContentArticle|NewsArticle|AnalysisNewsArticle|AskPublicNewsArticle|BackgroundNewsArticle|OpinionNewsArticle|ReportageNewsArticle|ReviewNewsArticle|Report|SatiricalArticle|ScholarlyArticle|MedicalScholarlyArticle|SocialMediaPosting|BlogPosting|LiveBlogPosting|DiscussionForumPosting|TechArticle|APIReference$/,
				adWords: /^(ad(vertising|vertisement)?|pub(licité)?|werb(ung)?|广告|Реклама|Anuncio)$/iu,
				loadingWords: /^((loading|正在加载|Загрузка|chargement|cargando)(…|\.\.\.)?)$/iu
			},
			UNLIKELY_ROLES: [
				"menu",
				"menubar",
				"complementary",
				"navigation",
				"alert",
				"alertdialog",
				"dialog"
			],
			DIV_TO_P_ELEMS: /* @__PURE__ */ new Set([
				"BLOCKQUOTE",
				"DL",
				"DIV",
				"IMG",
				"OL",
				"P",
				"PRE",
				"TABLE",
				"UL"
			]),
			ALTER_TO_DIV_EXCEPTIONS: [
				"DIV",
				"ARTICLE",
				"SECTION",
				"P",
				"OL",
				"UL"
			],
			PRESENTATIONAL_ATTRIBUTES: [
				"align",
				"background",
				"bgcolor",
				"border",
				"cellpadding",
				"cellspacing",
				"frame",
				"hspace",
				"rules",
				"style",
				"valign",
				"vspace"
			],
			DEPRECATED_SIZE_ATTRIBUTE_ELEMS: [
				"TABLE",
				"TH",
				"TD",
				"HR",
				"PRE"
			],
			PHRASING_ELEMS: [
				"ABBR",
				"AUDIO",
				"B",
				"BDO",
				"BR",
				"BUTTON",
				"CITE",
				"CODE",
				"DATA",
				"DATALIST",
				"DFN",
				"EM",
				"EMBED",
				"I",
				"IMG",
				"INPUT",
				"KBD",
				"LABEL",
				"MARK",
				"MATH",
				"METER",
				"NOSCRIPT",
				"OBJECT",
				"OUTPUT",
				"PROGRESS",
				"Q",
				"RUBY",
				"SAMP",
				"SCRIPT",
				"SELECT",
				"SMALL",
				"SPAN",
				"STRONG",
				"SUB",
				"SUP",
				"TEXTAREA",
				"TIME",
				"VAR",
				"WBR"
			],
			CLASSES_TO_PRESERVE: ["page"],
			HTML_ESCAPE_MAP: {
				lt: "<",
				gt: ">",
				amp: "&",
				quot: "\"",
				apos: "'"
			},
			/**
			* Run any post-process modifications to article content as necessary.
			*
			* @param Element
			* @return void
			**/
			_postProcessContent(articleContent) {
				this._fixRelativeUris(articleContent);
				this._simplifyNestedElements(articleContent);
				if (!this._keepClasses) this._cleanClasses(articleContent);
			},
			/**
			* Iterates over a NodeList, calls `filterFn` for each node and removes node
			* if function returned `true`.
			*
			* If function is not passed, removes all the nodes in node list.
			*
			* @param NodeList nodeList The nodes to operate on
			* @param Function filterFn the function to use as a filter
			* @return void
			*/
			_removeNodes(nodeList, filterFn) {
				if (this._docJSDOMParser && nodeList._isLiveNodeList) throw new Error("Do not pass live node lists to _removeNodes");
				for (var i = nodeList.length - 1; i >= 0; i--) {
					var node = nodeList[i];
					var parentNode = node.parentNode;
					if (parentNode) {
						if (!filterFn || filterFn.call(this, node, i, nodeList)) parentNode.removeChild(node);
					}
				}
			},
			/**
			* Iterates over a NodeList, and calls _setNodeTag for each node.
			*
			* @param NodeList nodeList The nodes to operate on
			* @param String newTagName the new tag name to use
			* @return void
			*/
			_replaceNodeTags(nodeList, newTagName) {
				if (this._docJSDOMParser && nodeList._isLiveNodeList) throw new Error("Do not pass live node lists to _replaceNodeTags");
				for (const node of nodeList) this._setNodeTag(node, newTagName);
			},
			/**
			* Iterate over a NodeList, which doesn't natively fully implement the Array
			* interface.
			*
			* For convenience, the current object context is applied to the provided
			* iterate function.
			*
			* @param  NodeList nodeList The NodeList.
			* @param  Function fn       The iterate function.
			* @return void
			*/
			_forEachNode(nodeList, fn) {
				Array.prototype.forEach.call(nodeList, fn, this);
			},
			/**
			* Iterate over a NodeList, and return the first node that passes
			* the supplied test function
			*
			* For convenience, the current object context is applied to the provided
			* test function.
			*
			* @param  NodeList nodeList The NodeList.
			* @param  Function fn       The test function.
			* @return void
			*/
			_findNode(nodeList, fn) {
				return Array.prototype.find.call(nodeList, fn, this);
			},
			/**
			* Iterate over a NodeList, return true if any of the provided iterate
			* function calls returns true, false otherwise.
			*
			* For convenience, the current object context is applied to the
			* provided iterate function.
			*
			* @param  NodeList nodeList The NodeList.
			* @param  Function fn       The iterate function.
			* @return Boolean
			*/
			_someNode(nodeList, fn) {
				return Array.prototype.some.call(nodeList, fn, this);
			},
			/**
			* Iterate over a NodeList, return true if all of the provided iterate
			* function calls return true, false otherwise.
			*
			* For convenience, the current object context is applied to the
			* provided iterate function.
			*
			* @param  NodeList nodeList The NodeList.
			* @param  Function fn       The iterate function.
			* @return Boolean
			*/
			_everyNode(nodeList, fn) {
				return Array.prototype.every.call(nodeList, fn, this);
			},
			_getAllNodesWithTag(node, tagNames) {
				if (node.querySelectorAll) return node.querySelectorAll(tagNames.join(","));
				return [].concat.apply([], tagNames.map(function(tag) {
					var collection = node.getElementsByTagName(tag);
					return Array.isArray(collection) ? collection : Array.from(collection);
				}));
			},
			/**
			* Removes the class="" attribute from every element in the given
			* subtree, except those that match CLASSES_TO_PRESERVE and
			* the classesToPreserve array from the options object.
			*
			* @param Element
			* @return void
			*/
			_cleanClasses(node) {
				var classesToPreserve = this._classesToPreserve;
				var className = (node.getAttribute("class") || "").split(/\s+/).filter((cls) => classesToPreserve.includes(cls)).join(" ");
				if (className) node.setAttribute("class", className);
				else node.removeAttribute("class");
				for (node = node.firstElementChild; node; node = node.nextElementSibling) this._cleanClasses(node);
			},
			/**
			* Tests whether a string is a URL or not.
			*
			* @param {string} str The string to test
			* @return {boolean} true if str is a URL, false if not
			*/
			_isUrl(str) {
				try {
					new URL(str);
					return true;
				} catch {
					return false;
				}
			},
			/**
			* Converts each <a> and <img> uri in the given element to an absolute URI,
			* ignoring #ref URIs.
			*
			* @param Element
			* @return void
			*/
			_fixRelativeUris(articleContent) {
				var baseURI = this._doc.baseURI;
				var documentURI = this._doc.documentURI;
				function toAbsoluteURI(uri) {
					if (baseURI == documentURI && uri.charAt(0) == "#") return uri;
					try {
						return new URL(uri, baseURI).href;
					} catch (ex) {}
					return uri;
				}
				var links = this._getAllNodesWithTag(articleContent, ["a"]);
				this._forEachNode(links, function(link) {
					var href = link.getAttribute("href");
					if (href) {
						if (href.indexOf("javascript:") === 0) {
							if (link.childNodes.length === 1 && link.childNodes[0].nodeType === this.TEXT_NODE) {
								var text = this._doc.createTextNode(link.textContent);
								link.parentNode.replaceChild(text, link);
							} else {
								var container = this._doc.createElement("span");
								while (link.firstChild) container.appendChild(link.firstChild);
								link.parentNode.replaceChild(container, link);
							}
						} else link.setAttribute("href", toAbsoluteURI(href));
					}
				});
				var medias = this._getAllNodesWithTag(articleContent, [
					"img",
					"picture",
					"figure",
					"video",
					"audio",
					"source"
				]);
				this._forEachNode(medias, function(media) {
					var src = media.getAttribute("src");
					var poster = media.getAttribute("poster");
					var srcset = media.getAttribute("srcset");
					if (src) media.setAttribute("src", toAbsoluteURI(src));
					if (poster) media.setAttribute("poster", toAbsoluteURI(poster));
					if (srcset) {
						var newSrcset = srcset.replace(this.REGEXPS.srcsetUrl, function(_, p1, p2, p3) {
							return toAbsoluteURI(p1) + (p2 || "") + p3;
						});
						media.setAttribute("srcset", newSrcset);
					}
				});
			},
			_simplifyNestedElements(articleContent) {
				var node = articleContent;
				while (node) {
					if (node.parentNode && ["DIV", "SECTION"].includes(node.tagName) && !(node.id && node.id.startsWith("readability"))) {
						if (this._isElementWithoutContent(node)) {
							node = this._removeAndGetNext(node);
							continue;
						} else if (this._hasSingleTagInsideElement(node, "DIV") || this._hasSingleTagInsideElement(node, "SECTION")) {
							var child = node.children[0];
							for (var i = 0; i < node.attributes.length; i++) child.setAttributeNode(node.attributes[i].cloneNode());
							node.parentNode.replaceChild(child, node);
							node = child;
							continue;
						}
					}
					node = this._getNextNode(node);
				}
			},
			/**
			* Get the article title as an H1.
			*
			* @return string
			**/
			_getArticleTitle() {
				var doc = this._doc;
				var curTitle = "";
				var origTitle = "";
				try {
					curTitle = origTitle = doc.title.trim();
					if (typeof curTitle !== "string") curTitle = origTitle = this._getInnerText(doc.getElementsByTagName("title")[0]);
				} catch (e) {}
				var titleHadHierarchicalSeparators = false;
				function wordCount(str) {
					return str.split(/\s+/).length;
				}
				if (/ [\|\-\\\/>»] /.test(curTitle)) {
					titleHadHierarchicalSeparators = / [\\\/>»] /.test(curTitle);
					let allSeparators = Array.from(origTitle.matchAll(/ [\|\-\\\/>»] /gi));
					curTitle = origTitle.substring(0, allSeparators.pop().index);
					if (wordCount(curTitle) < 3) curTitle = origTitle.replace(/^[^\|\-\\\/>»]*[\|\-\\\/>»]/gi, "");
				} else if (curTitle.includes(": ")) {
					var headings = this._getAllNodesWithTag(doc, ["h1", "h2"]);
					var trimmedTitle = curTitle.trim();
					if (!this._someNode(headings, function(heading) {
						return heading.textContent.trim() === trimmedTitle;
					})) {
						curTitle = origTitle.substring(origTitle.lastIndexOf(":") + 1);
						if (wordCount(curTitle) < 3) curTitle = origTitle.substring(origTitle.indexOf(":") + 1);
						else if (wordCount(origTitle.substr(0, origTitle.indexOf(":"))) > 5) curTitle = origTitle;
					}
				} else if (curTitle.length > 150 || curTitle.length < 15) {
					var hOnes = doc.getElementsByTagName("h1");
					if (hOnes.length === 1) curTitle = this._getInnerText(hOnes[0]);
				}
				curTitle = curTitle.trim().replace(this.REGEXPS.normalize, " ");
				var curTitleWordCount = wordCount(curTitle);
				if (curTitleWordCount <= 4 && (!titleHadHierarchicalSeparators || curTitleWordCount != wordCount(origTitle.replace(/[\|\-\\\/>»]+/g, "")) - 1)) curTitle = origTitle;
				return curTitle;
			},
			/**
			* Prepare the HTML document for readability to scrape it.
			* This includes things like stripping javascript, CSS, and handling terrible markup.
			*
			* @return void
			**/
			_prepDocument() {
				var doc = this._doc;
				this._removeNodes(this._getAllNodesWithTag(doc, ["style"]));
				if (doc.body) this._replaceBrs(doc.body);
				this._replaceNodeTags(this._getAllNodesWithTag(doc, ["font"]), "SPAN");
			},
			/**
			* Finds the next node, starting from the given node, and ignoring
			* whitespace in between. If the given node is an element, the same node is
			* returned.
			*/
			_nextNode(node) {
				var next = node;
				while (next && next.nodeType != this.ELEMENT_NODE && this.REGEXPS.whitespace.test(next.textContent)) next = next.nextSibling;
				return next;
			},
			/**
			* Replaces 2 or more successive <br> elements with a single <p>.
			* Whitespace between <br> elements are ignored. For example:
			*   <div>foo<br>bar<br> <br><br>abc</div>
			* will become:
			*   <div>foo<br>bar<p>abc</p></div>
			*/
			_replaceBrs(elem) {
				this._forEachNode(this._getAllNodesWithTag(elem, ["br"]), function(br) {
					var next = br.nextSibling;
					var replaced = false;
					while ((next = this._nextNode(next)) && next.tagName == "BR") {
						replaced = true;
						var brSibling = next.nextSibling;
						next.remove();
						next = brSibling;
					}
					if (replaced) {
						var p = this._doc.createElement("p");
						br.parentNode.replaceChild(p, br);
						next = p.nextSibling;
						while (next) {
							if (next.tagName == "BR") {
								var nextElem = this._nextNode(next.nextSibling);
								if (nextElem && nextElem.tagName == "BR") break;
							}
							if (!this._isPhrasingContent(next)) break;
							var sibling = next.nextSibling;
							p.appendChild(next);
							next = sibling;
						}
						while (p.lastChild && this._isWhitespace(p.lastChild)) p.lastChild.remove();
						if (p.parentNode.tagName === "P") this._setNodeTag(p.parentNode, "DIV");
					}
				});
			},
			_setNodeTag(node, tag) {
				this.log("_setNodeTag", node, tag);
				if (this._docJSDOMParser) {
					node.localName = tag.toLowerCase();
					node.tagName = tag.toUpperCase();
					return node;
				}
				var replacement = node.ownerDocument.createElement(tag);
				while (node.firstChild) replacement.appendChild(node.firstChild);
				node.parentNode.replaceChild(replacement, node);
				if (node.readability) replacement.readability = node.readability;
				for (var i = 0; i < node.attributes.length; i++) replacement.setAttributeNode(node.attributes[i].cloneNode());
				return replacement;
			},
			/**
			* Prepare the article node for display. Clean out any inline styles,
			* iframes, forms, strip extraneous <p> tags, etc.
			*
			* @param Element
			* @return void
			**/
			_prepArticle(articleContent) {
				this._cleanStyles(articleContent);
				this._markDataTables(articleContent);
				this._fixLazyImages(articleContent);
				this._cleanConditionally(articleContent, "form");
				this._cleanConditionally(articleContent, "fieldset");
				this._clean(articleContent, "object");
				this._clean(articleContent, "embed");
				this._clean(articleContent, "footer");
				this._clean(articleContent, "link");
				this._clean(articleContent, "aside");
				var shareElementThreshold = this.DEFAULT_CHAR_THRESHOLD;
				this._forEachNode(articleContent.children, function(topCandidate) {
					this._cleanMatchedNodes(topCandidate, function(node, matchString) {
						return this.REGEXPS.shareElements.test(matchString) && node.textContent.length < shareElementThreshold;
					});
				});
				this._clean(articleContent, "iframe");
				this._clean(articleContent, "input");
				this._clean(articleContent, "textarea");
				this._clean(articleContent, "select");
				this._clean(articleContent, "button");
				this._cleanHeaders(articleContent);
				this._cleanConditionally(articleContent, "table");
				this._cleanConditionally(articleContent, "ul");
				this._cleanConditionally(articleContent, "div");
				this._replaceNodeTags(this._getAllNodesWithTag(articleContent, ["h1"]), "h2");
				this._removeNodes(this._getAllNodesWithTag(articleContent, ["p"]), function(paragraph) {
					return this._getAllNodesWithTag(paragraph, [
						"img",
						"embed",
						"object",
						"iframe"
					]).length === 0 && !this._getInnerText(paragraph, false);
				});
				this._forEachNode(this._getAllNodesWithTag(articleContent, ["br"]), function(br) {
					var next = this._nextNode(br.nextSibling);
					if (next && next.tagName == "P") br.remove();
				});
				this._forEachNode(this._getAllNodesWithTag(articleContent, ["table"]), function(table) {
					var tbody = this._hasSingleTagInsideElement(table, "TBODY") ? table.firstElementChild : table;
					if (this._hasSingleTagInsideElement(tbody, "TR")) {
						var row = tbody.firstElementChild;
						if (this._hasSingleTagInsideElement(row, "TD")) {
							var cell = row.firstElementChild;
							cell = this._setNodeTag(cell, this._everyNode(cell.childNodes, this._isPhrasingContent) ? "P" : "DIV");
							table.parentNode.replaceChild(cell, table);
						}
					}
				});
			},
			/**
			* Initialize a node with the readability object. Also checks the
			* className/id for special names to add to its score.
			*
			* @param Element
			* @return void
			**/
			_initializeNode(node) {
				node.readability = { contentScore: 0 };
				switch (node.tagName) {
					case "DIV":
						node.readability.contentScore += 5;
						break;
					case "PRE":
					case "TD":
					case "BLOCKQUOTE":
						node.readability.contentScore += 3;
						break;
					case "ADDRESS":
					case "OL":
					case "UL":
					case "DL":
					case "DD":
					case "DT":
					case "LI":
					case "FORM":
						node.readability.contentScore -= 3;
						break;
					case "H1":
					case "H2":
					case "H3":
					case "H4":
					case "H5":
					case "H6":
					case "TH": node.readability.contentScore -= 5;
				}
				node.readability.contentScore += this._getClassWeight(node);
			},
			_removeAndGetNext(node) {
				var nextNode = this._getNextNode(node, true);
				node.remove();
				return nextNode;
			},
			/**
			* Traverse the DOM from node to node, starting at the node passed in.
			* Pass true for the second parameter to indicate this node itself
			* (and its kids) are going away, and we want the next node over.
			*
			* Calling this in a loop will traverse the DOM depth-first.
			*
			* @param {Element} node
			* @param {boolean} ignoreSelfAndKids
			* @return {Element}
			*/
			_getNextNode(node, ignoreSelfAndKids) {
				if (!ignoreSelfAndKids && node.firstElementChild) return node.firstElementChild;
				if (node.nextElementSibling) return node.nextElementSibling;
				do
					node = node.parentNode;
				while (node && !node.nextElementSibling);
				return node && node.nextElementSibling;
			},
			_textSimilarity(textA, textB) {
				var tokensA = textA.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
				var tokensB = textB.toLowerCase().split(this.REGEXPS.tokenize).filter(Boolean);
				if (!tokensA.length || !tokensB.length) return 0;
				return 1 - tokensB.filter((token) => !tokensA.includes(token)).join(" ").length / tokensB.join(" ").length;
			},
			/**
			* Checks whether an element node contains a valid byline
			*
			* @param node {Element}
			* @param matchString {string}
			* @return boolean
			*/
			_isValidByline(node, matchString) {
				var rel = node.getAttribute("rel");
				var itemprop = node.getAttribute("itemprop");
				var bylineLength = node.textContent.trim().length;
				return (rel === "author" || itemprop && itemprop.includes("author") || this.REGEXPS.byline.test(matchString)) && !!bylineLength && bylineLength < 100;
			},
			_getNodeAncestors(node, maxDepth) {
				maxDepth = maxDepth || 0;
				var i = 0, ancestors = [];
				while (node.parentNode) {
					ancestors.push(node.parentNode);
					if (maxDepth && ++i === maxDepth) break;
					node = node.parentNode;
				}
				return ancestors;
			},
			/***
			* grabArticle - Using a variety of metrics (content score, classname, element types), find the content that is
			*         most likely to be the stuff a user wants to read. Then return it wrapped up in a div.
			*
			* @param page a document to run upon. Needs to be a full document, complete with body.
			* @return Element
			**/
			_grabArticle(page) {
				this.log("**** grabArticle ****");
				var doc = this._doc;
				var isPaging = page !== null;
				page = page ? page : this._doc.body;
				if (!page) {
					this.log("No body found in document. Abort.");
					return null;
				}
				var pageCacheHtml = page.innerHTML;
				while (true) {
					this.log("Starting grabArticle loop");
					var stripUnlikelyCandidates = this._flagIsActive(this.FLAG_STRIP_UNLIKELYS);
					var elementsToScore = [];
					var node = this._doc.documentElement;
					let shouldRemoveTitleHeader = true;
					while (node) {
						if (node.tagName === "HTML") this._articleLang = node.getAttribute("lang");
						var matchString = node.className + " " + node.id;
						if (!this._isProbablyVisible(node)) {
							this.log("Removing hidden node - " + matchString);
							node = this._removeAndGetNext(node);
							continue;
						}
						if (node.getAttribute("aria-modal") == "true" && node.getAttribute("role") == "dialog") {
							node = this._removeAndGetNext(node);
							continue;
						}
						if (!this._articleByline && !this._metadata.byline && this._isValidByline(node, matchString)) {
							var endOfSearchMarkerNode = this._getNextNode(node, true);
							var next = this._getNextNode(node);
							var itemPropNameNode = null;
							while (next && next != endOfSearchMarkerNode) {
								var itemprop = next.getAttribute("itemprop");
								if (itemprop && itemprop.includes("name")) {
									itemPropNameNode = next;
									break;
								} else next = this._getNextNode(next);
							}
							this._articleByline = (itemPropNameNode ?? node).textContent.trim();
							node = this._removeAndGetNext(node);
							continue;
						}
						if (shouldRemoveTitleHeader && this._headerDuplicatesTitle(node)) {
							this.log("Removing header: ", node.textContent.trim(), this._articleTitle.trim());
							shouldRemoveTitleHeader = false;
							node = this._removeAndGetNext(node);
							continue;
						}
						if (stripUnlikelyCandidates) {
							if (this.REGEXPS.unlikelyCandidates.test(matchString) && !this.REGEXPS.okMaybeItsACandidate.test(matchString) && !this._hasAncestorTag(node, "table") && !this._hasAncestorTag(node, "code") && node.tagName !== "BODY" && node.tagName !== "A") {
								this.log("Removing unlikely candidate - " + matchString);
								node = this._removeAndGetNext(node);
								continue;
							}
							if (this.UNLIKELY_ROLES.includes(node.getAttribute("role"))) {
								this.log("Removing content with role " + node.getAttribute("role") + " - " + matchString);
								node = this._removeAndGetNext(node);
								continue;
							}
						}
						if ((node.tagName === "DIV" || node.tagName === "SECTION" || node.tagName === "HEADER" || node.tagName === "H1" || node.tagName === "H2" || node.tagName === "H3" || node.tagName === "H4" || node.tagName === "H5" || node.tagName === "H6") && this._isElementWithoutContent(node)) {
							node = this._removeAndGetNext(node);
							continue;
						}
						if (this.DEFAULT_TAGS_TO_SCORE.includes(node.tagName)) elementsToScore.push(node);
						if (node.tagName === "DIV") {
							var p = null;
							var childNode = node.firstChild;
							while (childNode) {
								var nextSibling = childNode.nextSibling;
								if (this._isPhrasingContent(childNode)) {
									if (p !== null) p.appendChild(childNode);
									else if (!this._isWhitespace(childNode)) {
										p = doc.createElement("p");
										node.replaceChild(p, childNode);
										p.appendChild(childNode);
									}
								} else if (p !== null) {
									while (p.lastChild && this._isWhitespace(p.lastChild)) p.lastChild.remove();
									p = null;
								}
								childNode = nextSibling;
							}
							if (this._hasSingleTagInsideElement(node, "P") && this._getLinkDensity(node) < .25) {
								var newNode = node.children[0];
								node.parentNode.replaceChild(newNode, node);
								node = newNode;
								elementsToScore.push(node);
							} else if (!this._hasChildBlockElement(node)) {
								node = this._setNodeTag(node, "P");
								elementsToScore.push(node);
							}
						}
						node = this._getNextNode(node);
					}
					/**
					* Loop through all paragraphs, and assign a score to them based on how content-y they look.
					* Then add their score to their parent node.
					*
					* A score is determined by things like number of commas, class names, etc. Maybe eventually link density.
					**/
					var candidates = [];
					this._forEachNode(elementsToScore, function(elementToScore) {
						if (!elementToScore.parentNode || typeof elementToScore.parentNode.tagName === "undefined") return;
						var innerText = this._getInnerText(elementToScore);
						if (innerText.length < 25) return;
						var ancestors = this._getNodeAncestors(elementToScore, 5);
						if (ancestors.length === 0) return;
						var contentScore = 0;
						contentScore += 1;
						contentScore += innerText.split(this.REGEXPS.commas).length;
						contentScore += Math.min(Math.floor(innerText.length / 100), 3);
						this._forEachNode(ancestors, function(ancestor, level) {
							if (!ancestor.tagName || !ancestor.parentNode || typeof ancestor.parentNode.tagName === "undefined") return;
							if (typeof ancestor.readability === "undefined") {
								this._initializeNode(ancestor);
								candidates.push(ancestor);
							}
							if (level === 0) var scoreDivider = 1;
							else if (level === 1) scoreDivider = 2;
							else scoreDivider = level * 3;
							ancestor.readability.contentScore += contentScore / scoreDivider;
						});
					});
					var topCandidates = [];
					for (var c = 0, cl = candidates.length; c < cl; c += 1) {
						var candidate = candidates[c];
						var candidateScore = candidate.readability.contentScore * (1 - this._getLinkDensity(candidate));
						candidate.readability.contentScore = candidateScore;
						this.log("Candidate:", candidate, "with score " + candidateScore);
						for (var t = 0; t < this._nbTopCandidates; t++) {
							var aTopCandidate = topCandidates[t];
							if (!aTopCandidate || candidateScore > aTopCandidate.readability.contentScore) {
								topCandidates.splice(t, 0, candidate);
								if (topCandidates.length > this._nbTopCandidates) topCandidates.pop();
								break;
							}
						}
					}
					var topCandidate = topCandidates[0] || null;
					var neededToCreateTopCandidate = false;
					var parentOfTopCandidate;
					if (topCandidate === null || topCandidate.tagName === "BODY") {
						topCandidate = doc.createElement("DIV");
						neededToCreateTopCandidate = true;
						while (page.firstChild) {
							this.log("Moving child out:", page.firstChild);
							topCandidate.appendChild(page.firstChild);
						}
						page.appendChild(topCandidate);
						this._initializeNode(topCandidate);
					} else if (topCandidate) {
						var alternativeCandidateAncestors = [];
						for (var i = 1; i < topCandidates.length; i++) if (topCandidates[i].readability.contentScore / topCandidate.readability.contentScore >= .75) alternativeCandidateAncestors.push(this._getNodeAncestors(topCandidates[i]));
						var MINIMUM_TOPCANDIDATES = 3;
						if (alternativeCandidateAncestors.length >= MINIMUM_TOPCANDIDATES) {
							parentOfTopCandidate = topCandidate.parentNode;
							while (parentOfTopCandidate.tagName !== "BODY") {
								var listsContainingThisAncestor = 0;
								for (var ancestorIndex = 0; ancestorIndex < alternativeCandidateAncestors.length && listsContainingThisAncestor < MINIMUM_TOPCANDIDATES; ancestorIndex++) listsContainingThisAncestor += Number(alternativeCandidateAncestors[ancestorIndex].includes(parentOfTopCandidate));
								if (listsContainingThisAncestor >= MINIMUM_TOPCANDIDATES) {
									topCandidate = parentOfTopCandidate;
									break;
								}
								parentOfTopCandidate = parentOfTopCandidate.parentNode;
							}
						}
						if (!topCandidate.readability) this._initializeNode(topCandidate);
						parentOfTopCandidate = topCandidate.parentNode;
						var lastScore = topCandidate.readability.contentScore;
						var scoreThreshold = lastScore / 3;
						while (parentOfTopCandidate.tagName !== "BODY") {
							if (!parentOfTopCandidate.readability) {
								parentOfTopCandidate = parentOfTopCandidate.parentNode;
								continue;
							}
							var parentScore = parentOfTopCandidate.readability.contentScore;
							if (parentScore < scoreThreshold) break;
							if (parentScore > lastScore) {
								topCandidate = parentOfTopCandidate;
								break;
							}
							lastScore = parentOfTopCandidate.readability.contentScore;
							parentOfTopCandidate = parentOfTopCandidate.parentNode;
						}
						parentOfTopCandidate = topCandidate.parentNode;
						while (parentOfTopCandidate.tagName != "BODY" && parentOfTopCandidate.children.length == 1) {
							topCandidate = parentOfTopCandidate;
							parentOfTopCandidate = topCandidate.parentNode;
						}
						if (!topCandidate.readability) this._initializeNode(topCandidate);
					}
					var articleContent = doc.createElement("DIV");
					if (isPaging) articleContent.id = "readability-content";
					var siblingScoreThreshold = Math.max(10, topCandidate.readability.contentScore * .2);
					parentOfTopCandidate = topCandidate.parentNode;
					var siblings = parentOfTopCandidate.children;
					for (var s = 0, sl = siblings.length; s < sl; s++) {
						var sibling = siblings[s];
						var append = false;
						this.log("Looking at sibling node:", sibling, sibling.readability ? "with score " + sibling.readability.contentScore : "");
						this.log("Sibling has score", sibling.readability ? sibling.readability.contentScore : "Unknown");
						if (sibling === topCandidate) append = true;
						else {
							var contentBonus = 0;
							if (sibling.className === topCandidate.className && topCandidate.className !== "") contentBonus += topCandidate.readability.contentScore * .2;
							if (sibling.readability && sibling.readability.contentScore + contentBonus >= siblingScoreThreshold) append = true;
							else if (sibling.nodeName === "P") {
								var linkDensity = this._getLinkDensity(sibling);
								var nodeContent = this._getInnerText(sibling);
								var nodeLength = nodeContent.length;
								if (nodeLength > 80 && linkDensity < .25) append = true;
								else if (nodeLength < 80 && nodeLength > 0 && linkDensity === 0 && nodeContent.search(/\.( |$)/) !== -1) append = true;
							}
						}
						if (append) {
							this.log("Appending node:", sibling);
							if (!this.ALTER_TO_DIV_EXCEPTIONS.includes(sibling.nodeName)) {
								this.log("Altering sibling:", sibling, "to div.");
								sibling = this._setNodeTag(sibling, "DIV");
							}
							articleContent.appendChild(sibling);
							siblings = parentOfTopCandidate.children;
							s -= 1;
							sl -= 1;
						}
					}
					if (this._debug) this.log("Article content pre-prep: " + articleContent.innerHTML);
					this._prepArticle(articleContent);
					if (this._debug) this.log("Article content post-prep: " + articleContent.innerHTML);
					if (neededToCreateTopCandidate) {
						topCandidate.id = "readability-page-1";
						topCandidate.className = "page";
					} else {
						var div = doc.createElement("DIV");
						div.id = "readability-page-1";
						div.className = "page";
						while (articleContent.firstChild) div.appendChild(articleContent.firstChild);
						articleContent.appendChild(div);
					}
					if (this._debug) this.log("Article content after paging: " + articleContent.innerHTML);
					var parseSuccessful = true;
					var textLength = this._getInnerText(articleContent, true).length;
					if (textLength < this._charThreshold) {
						parseSuccessful = false;
						page.innerHTML = pageCacheHtml;
						this._attempts.push({
							articleContent,
							textLength
						});
						if (this._flagIsActive(this.FLAG_STRIP_UNLIKELYS)) this._removeFlag(this.FLAG_STRIP_UNLIKELYS);
						else if (this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) this._removeFlag(this.FLAG_WEIGHT_CLASSES);
						else if (this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) this._removeFlag(this.FLAG_CLEAN_CONDITIONALLY);
						else {
							this._attempts.sort(function(a, b) {
								return b.textLength - a.textLength;
							});
							if (!this._attempts[0].textLength) return null;
							articleContent = this._attempts[0].articleContent;
							parseSuccessful = true;
						}
					}
					if (parseSuccessful) {
						var ancestors = [parentOfTopCandidate, topCandidate].concat(this._getNodeAncestors(parentOfTopCandidate));
						this._someNode(ancestors, function(ancestor) {
							if (!ancestor.tagName) return false;
							var articleDir = ancestor.getAttribute("dir");
							if (articleDir) {
								this._articleDir = articleDir;
								return true;
							}
							return false;
						});
						return articleContent;
					}
				}
			},
			/**
			* Converts some of the common HTML entities in string to their corresponding characters.
			*
			* @param str {string} - a string to unescape.
			* @return string without HTML entity.
			*/
			_unescapeHtmlEntities(str) {
				if (!str) return str;
				var htmlEscapeMap = this.HTML_ESCAPE_MAP;
				return str.replace(/&(quot|amp|apos|lt|gt);/g, function(_, tag) {
					return htmlEscapeMap[tag];
				}).replace(/&#(?:x([0-9a-f]+)|([0-9]+));/gi, function(_, hex, numStr) {
					var num = parseInt(hex || numStr, hex ? 16 : 10);
					if (num == 0 || num > 1114111 || num >= 55296 && num <= 57343) num = 65533;
					return String.fromCodePoint(num);
				});
			},
			/**
			* Try to extract metadata from JSON-LD object.
			* For now, only Schema.org objects of type Article or its subtypes are supported.
			* @return Object with any metadata that could be extracted (possibly none)
			*/
			_getJSONLD(doc) {
				var scripts = this._getAllNodesWithTag(doc, ["script"]);
				var metadata;
				this._forEachNode(scripts, function(jsonLdElement) {
					if (!metadata && jsonLdElement.getAttribute("type") === "application/ld+json") try {
						var content = jsonLdElement.textContent.replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, "");
						var parsed = JSON.parse(content);
						if (Array.isArray(parsed)) {
							parsed = parsed.find((it) => {
								return it["@type"] && it["@type"].match(this.REGEXPS.jsonLdArticleTypes);
							});
							if (!parsed) return;
						}
						var schemaDotOrgRegex = /^https?\:\/\/schema\.org\/?$/;
						if (!(typeof parsed["@context"] === "string" && parsed["@context"].match(schemaDotOrgRegex) || typeof parsed["@context"] === "object" && typeof parsed["@context"]["@vocab"] == "string" && parsed["@context"]["@vocab"].match(schemaDotOrgRegex))) return;
						if (!parsed["@type"] && Array.isArray(parsed["@graph"])) parsed = parsed["@graph"].find((it) => {
							return (it["@type"] || "").match(this.REGEXPS.jsonLdArticleTypes);
						});
						if (!parsed || !parsed["@type"] || !parsed["@type"].match(this.REGEXPS.jsonLdArticleTypes)) return;
						metadata = {};
						if (typeof parsed.name === "string" && typeof parsed.headline === "string" && parsed.name !== parsed.headline) {
							var title = this._getArticleTitle();
							var nameMatches = this._textSimilarity(parsed.name, title) > .75;
							if (this._textSimilarity(parsed.headline, title) > .75 && !nameMatches) metadata.title = parsed.headline;
							else metadata.title = parsed.name;
						} else if (typeof parsed.name === "string") metadata.title = parsed.name.trim();
						else if (typeof parsed.headline === "string") metadata.title = parsed.headline.trim();
						if (parsed.author) {
							if (typeof parsed.author.name === "string") metadata.byline = parsed.author.name.trim();
							else if (Array.isArray(parsed.author) && parsed.author[0] && typeof parsed.author[0].name === "string") metadata.byline = parsed.author.filter(function(author) {
								return author && typeof author.name === "string";
							}).map(function(author) {
								return author.name.trim();
							}).join(", ");
						}
						if (typeof parsed.description === "string") metadata.excerpt = parsed.description.trim();
						if (parsed.publisher && typeof parsed.publisher.name === "string") metadata.siteName = parsed.publisher.name.trim();
						if (typeof parsed.datePublished === "string") metadata.datePublished = parsed.datePublished.trim();
					} catch (err) {
						this.log(err.message);
					}
				});
				return metadata ? metadata : {};
			},
			/**
			* Attempts to get excerpt and byline metadata for the article.
			*
			* @param {Object} jsonld — object containing any metadata that
			* could be extracted from JSON-LD object.
			*
			* @return Object with optional "excerpt" and "byline" properties
			*/
			_getArticleMetadata(jsonld) {
				var metadata = {};
				var values = {};
				var metaElements = this._doc.getElementsByTagName("meta");
				var propertyPattern = /\s*(article|dc|dcterm|og|twitter)\s*:\s*(author|creator|description|published_time|title|site_name)\s*/gi;
				var namePattern = /^\s*(?:(dc|dcterm|og|twitter|parsely|weibo:(article|webpage))\s*[-\.:]\s*)?(author|creator|pub-date|description|title|site_name)\s*$/i;
				this._forEachNode(metaElements, function(element) {
					var elementName = element.getAttribute("name");
					var elementProperty = element.getAttribute("property");
					var content = element.getAttribute("content");
					if (!content) return;
					var matches = null;
					var name = null;
					if (elementProperty) {
						matches = elementProperty.match(propertyPattern);
						if (matches) {
							name = matches[0].toLowerCase().replace(/\s/g, "");
							values[name] = content.trim();
						}
					}
					if (!matches && elementName && namePattern.test(elementName)) {
						name = elementName;
						if (content) {
							name = name.toLowerCase().replace(/\s/g, "").replace(/\./g, ":");
							values[name] = content.trim();
						}
					}
				});
				metadata.title = jsonld.title || values["dc:title"] || values["dcterm:title"] || values["og:title"] || values["weibo:article:title"] || values["weibo:webpage:title"] || values.title || values["twitter:title"] || values["parsely-title"];
				if (!metadata.title) metadata.title = this._getArticleTitle();
				const articleAuthor = typeof values["article:author"] === "string" && !this._isUrl(values["article:author"]) ? values["article:author"] : void 0;
				metadata.byline = jsonld.byline || values["dc:creator"] || values["dcterm:creator"] || values.author || values["parsely-author"] || articleAuthor;
				metadata.excerpt = jsonld.excerpt || values["dc:description"] || values["dcterm:description"] || values["og:description"] || values["weibo:article:description"] || values["weibo:webpage:description"] || values.description || values["twitter:description"];
				metadata.siteName = jsonld.siteName || values["og:site_name"];
				metadata.publishedTime = jsonld.datePublished || values["article:published_time"] || values["parsely-pub-date"] || null;
				metadata.title = this._unescapeHtmlEntities(metadata.title);
				metadata.byline = this._unescapeHtmlEntities(metadata.byline);
				metadata.excerpt = this._unescapeHtmlEntities(metadata.excerpt);
				metadata.siteName = this._unescapeHtmlEntities(metadata.siteName);
				metadata.publishedTime = this._unescapeHtmlEntities(metadata.publishedTime);
				return metadata;
			},
			/**
			* Check if node is image, or if node contains exactly only one image
			* whether as a direct child or as its descendants.
			*
			* @param Element
			**/
			_isSingleImage(node) {
				while (node) {
					if (node.tagName === "IMG") return true;
					if (node.children.length !== 1 || node.textContent.trim() !== "") return false;
					node = node.children[0];
				}
				return false;
			},
			/**
			* Find all <noscript> that are located after <img> nodes, and which contain only one
			* <img> element. Replace the first image with the image from inside the <noscript> tag,
			* and remove the <noscript> tag. This improves the quality of the images we use on
			* some sites (e.g. Medium).
			*
			* @param Element
			**/
			_unwrapNoscriptImages(doc) {
				var imgs = Array.from(doc.getElementsByTagName("img"));
				this._forEachNode(imgs, function(img) {
					for (var i = 0; i < img.attributes.length; i++) {
						var attr = img.attributes[i];
						switch (attr.name) {
							case "src":
							case "srcset":
							case "data-src":
							case "data-srcset": return;
						}
						if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) return;
					}
					img.remove();
				});
				var noscripts = Array.from(doc.getElementsByTagName("noscript"));
				this._forEachNode(noscripts, function(noscript) {
					if (!this._isSingleImage(noscript)) return;
					var tmp = doc.createElement("div");
					tmp.innerHTML = noscript.innerHTML;
					var prevElement = noscript.previousElementSibling;
					if (prevElement && this._isSingleImage(prevElement)) {
						var prevImg = prevElement;
						if (prevImg.tagName !== "IMG") prevImg = prevElement.getElementsByTagName("img")[0];
						var newImg = tmp.getElementsByTagName("img")[0];
						for (var i = 0; i < prevImg.attributes.length; i++) {
							var attr = prevImg.attributes[i];
							if (attr.value === "") continue;
							if (attr.name === "src" || attr.name === "srcset" || /\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
								if (newImg.getAttribute(attr.name) === attr.value) continue;
								var attrName = attr.name;
								if (newImg.hasAttribute(attrName)) attrName = "data-old-" + attrName;
								newImg.setAttribute(attrName, attr.value);
							}
						}
						noscript.parentNode.replaceChild(tmp.firstElementChild, prevElement);
					}
				});
			},
			/**
			* Removes script tags from the document.
			*
			* @param Element
			**/
			_removeScripts(doc) {
				this._removeNodes(this._getAllNodesWithTag(doc, ["script", "noscript"]));
			},
			/**
			* Check if this node has only whitespace and a single element with given tag
			* Returns false if the DIV node contains non-empty text nodes
			* or if it contains no element with given tag or more than 1 element.
			*
			* @param Element
			* @param string tag of child element
			**/
			_hasSingleTagInsideElement(element, tag) {
				if (element.children.length != 1 || element.children[0].tagName !== tag) return false;
				return !this._someNode(element.childNodes, function(node) {
					return node.nodeType === this.TEXT_NODE && this.REGEXPS.hasContent.test(node.textContent);
				});
			},
			_isElementWithoutContent(node) {
				return node.nodeType === this.ELEMENT_NODE && !node.textContent.trim().length && (!node.children.length || node.children.length == node.getElementsByTagName("br").length + node.getElementsByTagName("hr").length);
			},
			/**
			* Determine whether element has any children block level elements.
			*
			* @param Element
			*/
			_hasChildBlockElement(element) {
				return this._someNode(element.childNodes, function(node) {
					return this.DIV_TO_P_ELEMS.has(node.tagName) || this._hasChildBlockElement(node);
				});
			},
			/***
			* Determine if a node qualifies as phrasing content.
			* https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content
			**/
			_isPhrasingContent(node) {
				return node.nodeType === this.TEXT_NODE || this.PHRASING_ELEMS.includes(node.tagName) || (node.tagName === "A" || node.tagName === "DEL" || node.tagName === "INS") && this._everyNode(node.childNodes, this._isPhrasingContent);
			},
			_isWhitespace(node) {
				return node.nodeType === this.TEXT_NODE && node.textContent.trim().length === 0 || node.nodeType === this.ELEMENT_NODE && node.tagName === "BR";
			},
			/**
			* Get the inner text of a node - cross browser compatibly.
			* This also strips out any excess whitespace to be found.
			*
			* @param Element
			* @param Boolean normalizeSpaces (default: true)
			* @return string
			**/
			_getInnerText(e, normalizeSpaces) {
				normalizeSpaces = typeof normalizeSpaces === "undefined" ? true : normalizeSpaces;
				var textContent = e.textContent.trim();
				if (normalizeSpaces) return textContent.replace(this.REGEXPS.normalize, " ");
				return textContent;
			},
			/**
			* Get the number of times a string s appears in the node e.
			*
			* @param Element
			* @param string - what to split on. Default is ","
			* @return number (integer)
			**/
			_getCharCount(e, s) {
				s = s || ",";
				return this._getInnerText(e).split(s).length - 1;
			},
			/**
			* Remove the style attribute on every e and under.
			* TODO: Test if getElementsByTagName(*) is faster.
			*
			* @param Element
			* @return void
			**/
			_cleanStyles(e) {
				if (!e || e.tagName.toLowerCase() === "svg") return;
				for (var i = 0; i < this.PRESENTATIONAL_ATTRIBUTES.length; i++) e.removeAttribute(this.PRESENTATIONAL_ATTRIBUTES[i]);
				if (this.DEPRECATED_SIZE_ATTRIBUTE_ELEMS.includes(e.tagName)) {
					e.removeAttribute("width");
					e.removeAttribute("height");
				}
				var cur = e.firstElementChild;
				while (cur !== null) {
					this._cleanStyles(cur);
					cur = cur.nextElementSibling;
				}
			},
			/**
			* Get the density of links as a percentage of the content
			* This is the amount of text that is inside a link divided by the total text in the node.
			*
			* @param Element
			* @return number (float)
			**/
			_getLinkDensity(element) {
				var textLength = this._getInnerText(element).length;
				if (textLength === 0) return 0;
				var linkLength = 0;
				this._forEachNode(element.getElementsByTagName("a"), function(linkNode) {
					var href = linkNode.getAttribute("href");
					var coefficient = href && this.REGEXPS.hashUrl.test(href) ? .3 : 1;
					linkLength += this._getInnerText(linkNode).length * coefficient;
				});
				return linkLength / textLength;
			},
			/**
			* Get an elements class/id weight. Uses regular expressions to tell if this
			* element looks good or bad.
			*
			* @param Element
			* @return number (Integer)
			**/
			_getClassWeight(e) {
				if (!this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) return 0;
				var weight = 0;
				if (typeof e.className === "string" && e.className !== "") {
					if (this.REGEXPS.negative.test(e.className)) weight -= 25;
					if (this.REGEXPS.positive.test(e.className)) weight += 25;
				}
				if (typeof e.id === "string" && e.id !== "") {
					if (this.REGEXPS.negative.test(e.id)) weight -= 25;
					if (this.REGEXPS.positive.test(e.id)) weight += 25;
				}
				return weight;
			},
			/**
			* Clean a node of all elements of type "tag".
			* (Unless it's a youtube/vimeo video. People love movies.)
			*
			* @param Element
			* @param string tag to clean
			* @return void
			**/
			_clean(e, tag) {
				var isEmbed = [
					"object",
					"embed",
					"iframe"
				].includes(tag);
				this._removeNodes(this._getAllNodesWithTag(e, [tag]), function(element) {
					if (isEmbed) {
						for (var i = 0; i < element.attributes.length; i++) if (this._allowedVideoRegex.test(element.attributes[i].value)) return false;
						if (element.tagName === "object" && this._allowedVideoRegex.test(element.innerHTML)) return false;
					}
					return true;
				});
			},
			/**
			* Check if a given node has one of its ancestor tag name matching the
			* provided one.
			* @param  HTMLElement node
			* @param  String      tagName
			* @param  Number      maxDepth
			* @param  Function    filterFn a filter to invoke to determine whether this node 'counts'
			* @return Boolean
			*/
			_hasAncestorTag(node, tagName, maxDepth, filterFn) {
				maxDepth = maxDepth || 3;
				tagName = tagName.toUpperCase();
				var depth = 0;
				while (node.parentNode) {
					if (maxDepth > 0 && depth > maxDepth) return false;
					if (node.parentNode.tagName === tagName && (!filterFn || filterFn(node.parentNode))) return true;
					node = node.parentNode;
					depth++;
				}
				return false;
			},
			/**
			* Return an object indicating how many rows and columns this table has.
			*/
			_getRowAndColumnCount(table) {
				var rows = 0;
				var columns = 0;
				var trs = table.getElementsByTagName("tr");
				for (var i = 0; i < trs.length; i++) {
					var rowspan = trs[i].getAttribute("rowspan") || 0;
					if (rowspan) rowspan = parseInt(rowspan, 10);
					rows += rowspan || 1;
					var columnsInThisRow = 0;
					var cells = trs[i].getElementsByTagName("td");
					for (var j = 0; j < cells.length; j++) {
						var colspan = cells[j].getAttribute("colspan") || 0;
						if (colspan) colspan = parseInt(colspan, 10);
						columnsInThisRow += colspan || 1;
					}
					columns = Math.max(columns, columnsInThisRow);
				}
				return {
					rows,
					columns
				};
			},
			/**
			* Look for 'data' (as opposed to 'layout') tables, for which we use
			* similar checks as
			* https://searchfox.org/mozilla-central/rev/f82d5c549f046cb64ce5602bfd894b7ae807c8f8/accessible/generic/TableAccessible.cpp#19
			*/
			_markDataTables(root) {
				var tables = root.getElementsByTagName("table");
				for (var i = 0; i < tables.length; i++) {
					var table = tables[i];
					if (table.getAttribute("role") == "presentation") {
						table._readabilityDataTable = false;
						continue;
					}
					if (table.getAttribute("datatable") == "0") {
						table._readabilityDataTable = false;
						continue;
					}
					if (table.getAttribute("summary")) {
						table._readabilityDataTable = true;
						continue;
					}
					var caption = table.getElementsByTagName("caption")[0];
					if (caption && caption.childNodes.length) {
						table._readabilityDataTable = true;
						continue;
					}
					var dataTableDescendants = [
						"col",
						"colgroup",
						"tfoot",
						"thead",
						"th"
					];
					var descendantExists = function(tag) {
						return !!table.getElementsByTagName(tag)[0];
					};
					if (dataTableDescendants.some(descendantExists)) {
						this.log("Data table because found data-y descendant");
						table._readabilityDataTable = true;
						continue;
					}
					if (table.getElementsByTagName("table")[0]) {
						table._readabilityDataTable = false;
						continue;
					}
					var sizeInfo = this._getRowAndColumnCount(table);
					if (sizeInfo.columns == 1 || sizeInfo.rows == 1) {
						table._readabilityDataTable = false;
						continue;
					}
					if (sizeInfo.rows >= 10 || sizeInfo.columns > 4) {
						table._readabilityDataTable = true;
						continue;
					}
					table._readabilityDataTable = sizeInfo.rows * sizeInfo.columns > 10;
				}
			},
			_fixLazyImages(root) {
				this._forEachNode(this._getAllNodesWithTag(root, [
					"img",
					"picture",
					"figure"
				]), function(elem) {
					if (elem.src && this.REGEXPS.b64DataUrl.test(elem.src)) {
						var parts = this.REGEXPS.b64DataUrl.exec(elem.src);
						if (parts[1] === "image/svg+xml") return;
						var srcCouldBeRemoved = false;
						for (var i = 0; i < elem.attributes.length; i++) {
							var attr = elem.attributes[i];
							if (attr.name === "src") continue;
							if (/\.(jpg|jpeg|png|webp)/i.test(attr.value)) {
								srcCouldBeRemoved = true;
								break;
							}
						}
						if (srcCouldBeRemoved) {
							var b64starts = parts[0].length;
							if (elem.src.length - b64starts < 133) elem.removeAttribute("src");
						}
					}
					if ((elem.src || elem.srcset && elem.srcset != "null") && !elem.className.toLowerCase().includes("lazy")) return;
					for (var j = 0; j < elem.attributes.length; j++) {
						attr = elem.attributes[j];
						if (attr.name === "src" || attr.name === "srcset" || attr.name === "alt") continue;
						var copyTo = null;
						if (/\.(jpg|jpeg|png|webp)\s+\d/.test(attr.value)) copyTo = "srcset";
						else if (/^\s*\S+\.(jpg|jpeg|png|webp)\S*\s*$/.test(attr.value)) copyTo = "src";
						if (copyTo) {
							if (elem.tagName === "IMG" || elem.tagName === "PICTURE") elem.setAttribute(copyTo, attr.value);
							else if (elem.tagName === "FIGURE" && !this._getAllNodesWithTag(elem, ["img", "picture"]).length) {
								var img = this._doc.createElement("img");
								img.setAttribute(copyTo, attr.value);
								elem.appendChild(img);
							}
						}
					}
				});
			},
			_getTextDensity(e, tags) {
				var textLength = this._getInnerText(e, true).length;
				if (textLength === 0) return 0;
				var childrenLength = 0;
				var children = this._getAllNodesWithTag(e, tags);
				this._forEachNode(children, (child) => childrenLength += this._getInnerText(child, true).length);
				return childrenLength / textLength;
			},
			/**
			* Clean an element of all tags of type "tag" if they look fishy.
			* "Fishy" is an algorithm based on content length, classnames, link density, number of images & embeds, etc.
			*
			* @return void
			**/
			_cleanConditionally(e, tag) {
				if (!this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) return;
				this._removeNodes(this._getAllNodesWithTag(e, [tag]), function(node) {
					var isDataTable = function(t) {
						return t._readabilityDataTable;
					};
					var isList = tag === "ul" || tag === "ol";
					if (!isList) {
						var listLength = 0;
						var listNodes = this._getAllNodesWithTag(node, ["ul", "ol"]);
						this._forEachNode(listNodes, (list) => listLength += this._getInnerText(list).length);
						isList = listLength / this._getInnerText(node).length > .9;
					}
					if (tag === "table" && isDataTable(node)) return false;
					if (this._hasAncestorTag(node, "table", -1, isDataTable)) return false;
					if (this._hasAncestorTag(node, "code")) return false;
					if ([...node.getElementsByTagName("table")].some((tbl) => tbl._readabilityDataTable)) return false;
					var weight = this._getClassWeight(node);
					this.log("Cleaning Conditionally", node);
					if (weight + 0 < 0) return true;
					if (this._getCharCount(node, ",") < 10) {
						var p = node.getElementsByTagName("p").length;
						var img = node.getElementsByTagName("img").length;
						var li = node.getElementsByTagName("li").length - 100;
						var input = node.getElementsByTagName("input").length;
						var headingDensity = this._getTextDensity(node, [
							"h1",
							"h2",
							"h3",
							"h4",
							"h5",
							"h6"
						]);
						var embedCount = 0;
						var embeds = this._getAllNodesWithTag(node, [
							"object",
							"embed",
							"iframe"
						]);
						for (var i = 0; i < embeds.length; i++) {
							for (var j = 0; j < embeds[i].attributes.length; j++) if (this._allowedVideoRegex.test(embeds[i].attributes[j].value)) return false;
							if (embeds[i].tagName === "object" && this._allowedVideoRegex.test(embeds[i].innerHTML)) return false;
							embedCount++;
						}
						var innerText = this._getInnerText(node);
						if (this.REGEXPS.adWords.test(innerText) || this.REGEXPS.loadingWords.test(innerText)) return true;
						var contentLength = innerText.length;
						var linkDensity = this._getLinkDensity(node);
						var textishTags = [
							"SPAN",
							"LI",
							"TD"
						].concat(Array.from(this.DIV_TO_P_ELEMS));
						var textDensity = this._getTextDensity(node, textishTags);
						var isFigureChild = this._hasAncestorTag(node, "figure");
						const shouldRemoveNode = () => {
							const errs = [];
							if (!isFigureChild && img > 1 && p / img < .5) errs.push(`Bad p to img ratio (img=${img}, p=${p})`);
							if (!isList && li > p) errs.push(`Too many li's outside of a list. (li=${li} > p=${p})`);
							if (input > Math.floor(p / 3)) errs.push(`Too many inputs per p. (input=${input}, p=${p})`);
							if (!isList && !isFigureChild && headingDensity < .9 && contentLength < 25 && (img === 0 || img > 2) && linkDensity > 0) errs.push(`Suspiciously short. (headingDensity=${headingDensity}, img=${img}, linkDensity=${linkDensity})`);
							if (!isList && weight < 25 && linkDensity > .2 + this._linkDensityModifier) errs.push(`Low weight and a little linky. (linkDensity=${linkDensity})`);
							if (weight >= 25 && linkDensity > .5 + this._linkDensityModifier) errs.push(`High weight and mostly links. (linkDensity=${linkDensity})`);
							if (embedCount === 1 && contentLength < 75 || embedCount > 1) errs.push(`Suspicious embed. (embedCount=${embedCount}, contentLength=${contentLength})`);
							if (img === 0 && textDensity === 0) errs.push(`No useful content. (img=${img}, textDensity=${textDensity})`);
							if (errs.length) {
								this.log("Checks failed", errs);
								return true;
							}
							return false;
						};
						var haveToRemove = shouldRemoveNode();
						if (isList && haveToRemove) {
							for (var x = 0; x < node.children.length; x++) if (node.children[x].children.length > 1) return haveToRemove;
							if (img == node.getElementsByTagName("li").length) return false;
						}
						return haveToRemove;
					}
					return false;
				});
			},
			/**
			* Clean out elements that match the specified conditions
			*
			* @param Element
			* @param Function determines whether a node should be removed
			* @return void
			**/
			_cleanMatchedNodes(e, filter) {
				var endOfSearchMarkerNode = this._getNextNode(e, true);
				var next = this._getNextNode(e);
				while (next && next != endOfSearchMarkerNode) if (filter.call(this, next, next.className + " " + next.id)) next = this._removeAndGetNext(next);
				else next = this._getNextNode(next);
			},
			/**
			* Clean out spurious headers from an Element.
			*
			* @param Element
			* @return void
			**/
			_cleanHeaders(e) {
				let headingNodes = this._getAllNodesWithTag(e, ["h1", "h2"]);
				this._removeNodes(headingNodes, function(node) {
					let shouldRemove = this._getClassWeight(node) < 0;
					if (shouldRemove) this.log("Removing header with low class weight:", node);
					return shouldRemove;
				});
			},
			/**
			* Check if this node is an H1 or H2 element whose content is mostly
			* the same as the article title.
			*
			* @param Element  the node to check.
			* @return boolean indicating whether this is a title-like header.
			*/
			_headerDuplicatesTitle(node) {
				if (node.tagName != "H1" && node.tagName != "H2") return false;
				var heading = this._getInnerText(node, false);
				this.log("Evaluating similarity of header:", heading, this._articleTitle);
				return this._textSimilarity(this._articleTitle, heading) > .75;
			},
			_flagIsActive(flag) {
				return (this._flags & flag) > 0;
			},
			_removeFlag(flag) {
				this._flags = this._flags & ~flag;
			},
			_isProbablyVisible(node) {
				return (!node.style || node.style.display != "none") && (!node.style || node.style.visibility != "hidden") && !node.hasAttribute("hidden") && (!node.hasAttribute("aria-hidden") || node.getAttribute("aria-hidden") != "true" || node.className && node.className.includes && node.className.includes("fallback-image"));
			},
			/**
			* Runs readability.
			*
			* Workflow:
			*  1. Prep the document by removing script tags, css, etc.
			*  2. Build readability's DOM tree.
			*  3. Grab the article content from the current dom tree.
			*  4. Replace the current DOM tree with the new one.
			*  5. Read peacefully.
			*
			* @return void
			**/
			parse() {
				if (this._maxElemsToParse > 0) {
					var numTags = this._doc.getElementsByTagName("*").length;
					if (numTags > this._maxElemsToParse) throw new Error("Aborting parsing document; " + numTags + " elements found");
				}
				this._unwrapNoscriptImages(this._doc);
				var jsonLd = this._disableJSONLD ? {} : this._getJSONLD(this._doc);
				this._removeScripts(this._doc);
				this._prepDocument();
				var metadata = this._getArticleMetadata(jsonLd);
				this._metadata = metadata;
				this._articleTitle = metadata.title;
				var articleContent = this._grabArticle();
				if (!articleContent) return null;
				this.log("Grabbed: " + articleContent.innerHTML);
				this._postProcessContent(articleContent);
				if (!metadata.excerpt) {
					var paragraphs = articleContent.getElementsByTagName("p");
					if (paragraphs.length) metadata.excerpt = paragraphs[0].textContent.trim();
				}
				var textContent = articleContent.textContent;
				return {
					title: this._articleTitle,
					byline: metadata.byline || this._articleByline,
					dir: this._articleDir,
					lang: this._articleLang,
					content: this._serializer(articleContent),
					textContent,
					length: textContent.length,
					excerpt: metadata.excerpt,
					siteName: metadata.siteName || this._articleSiteName,
					publishedTime: metadata.publishedTime
				};
			}
		};
		if (typeof module === "object") module.exports = Readability;
	}));
	// node_modules/@mozilla/readability/Readability-readerable.js
	var require_Readability_readerable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var REGEXPS = {
			unlikelyCandidates: /-ad-|ai2html|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|footer|gdpr|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
			okMaybeItsACandidate: /and|article|body|column|content|main|shadow/i
		};
		function isNodeVisible(node) {
			return (!node.style || node.style.display != "none") && !node.hasAttribute("hidden") && (!node.hasAttribute("aria-hidden") || node.getAttribute("aria-hidden") != "true" || node.className && node.className.includes && node.className.includes("fallback-image"));
		}
		/**
		* Decides whether or not the document is reader-able without parsing the whole thing.
		* @param {Object} options Configuration object.
		* @param {number} [options.minContentLength=140] The minimum node content length used to decide if the document is readerable.
		* @param {number} [options.minScore=20] The minumum cumulated 'score' used to determine if the document is readerable.
		* @param {Function} [options.visibilityChecker=isNodeVisible] The function used to determine if a node is visible.
		* @return {boolean} Whether or not we suspect Readability.parse() will suceeed at returning an article object.
		*/
		function isProbablyReaderable(doc, options = {}) {
			if (typeof options == "function") options = { visibilityChecker: options };
			options = Object.assign({
				minScore: 20,
				minContentLength: 140,
				visibilityChecker: isNodeVisible
			}, options);
			var nodes = doc.querySelectorAll("p, pre, article");
			var brNodes = doc.querySelectorAll("div > br");
			if (brNodes.length) {
				var set = new Set(nodes);
				[].forEach.call(brNodes, function(node) {
					set.add(node.parentNode);
				});
				nodes = Array.from(set);
			}
			var score = 0;
			return [].some.call(nodes, function(node) {
				if (!options.visibilityChecker(node)) return false;
				var matchString = node.className + " " + node.id;
				if (REGEXPS.unlikelyCandidates.test(matchString) && !REGEXPS.okMaybeItsACandidate.test(matchString)) return false;
				if (node.matches("li p")) return false;
				var textContentLength = node.textContent.trim().length;
				if (textContentLength < options.minContentLength) return false;
				score += Math.sqrt(textContentLength - options.minContentLength);
				if (score > options.minScore) return true;
				return false;
			});
		}
		if (typeof module === "object") module.exports = isProbablyReaderable;
	}));
	// entrypoints/content.ts
	var import_readability = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = {
			Readability: require_Readability(),
			isProbablyReaderable: require_Readability_readerable()
		};
	})))();
	var content_default = defineContentScript({
		matches: ["<all_urls>"],
		runAt: "document_idle",
		main() {
			const docClone = document.cloneNode(true);
			docClone.querySelectorAll([
				"figure",
				"figcaption",
				"aside",
				"sup.reference",
				".infobox",
				".thumb",
				".hatnote",
				".navbox",
				".catlinks",
				".reflist",
				".references",
				".mw-references-wrap",
				".mw-editsection",
				"[role=\"note\"]",
				".gallery",
				".sistersitebox"
			].join(",")).forEach((el) => el.remove());
			const article = new import_readability.Readability(docClone, { charThreshold: 300 }).parse();
			if (!article || !article.textContent) return;
			if (article.textContent.replace(/\[[^\]]*\]/g, "").replace(/\n\s*↑[\s\S]*$/g, "").replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n\n").trim()) browser.runtime.sendMessage({});
		}
	});
	// node_modules/wxt/dist/utils/internal/logger.mjs
	function print$1(method, ...args) {
		if (typeof args[0] === "string") method(`[wxt] ${args.shift()}`, ...args);
		else method("[wxt]", ...args);
	}
	/** Wrapper around `console` with a "[wxt]" prefix */
	var logger$1 = {
		debug: (...args) => print$1(console.debug, ...args),
		log: (...args) => print$1(console.log, ...args),
		warn: (...args) => print$1(console.warn, ...args),
		error: (...args) => print$1(console.error, ...args)
	};
	// node_modules/wxt/dist/utils/internal/custom-events.mjs
	/**
	* Fired on `window` as `wxt:locationchange` when a content script detects a
	* same-document URL change.
	*/
	var WxtLocationChangeEvent = class WxtLocationChangeEvent extends Event {
		static EVENT_NAME = getUniqueEventName("wxt:locationchange");
		constructor(newUrl, oldUrl) {
			super(WxtLocationChangeEvent.EVENT_NAME, {});
			this.newUrl = newUrl;
			this.oldUrl = oldUrl;
		}
	};
	/**
	* Returns an event name unique to the extension and content script that's
	* running.
	*/
	function getUniqueEventName(eventName) {
		return `${browser?.runtime?.id}:content:${eventName}`;
	}
	// node_modules/wxt/dist/utils/internal/location-watcher.mjs
	var supportsNavigationApi = typeof globalThis.navigation?.addEventListener === "function";
	/**
	* Create a util that watches for URL changes, dispatching the custom event when
	* detected. Stops watching when content script is invalidated. Uses Navigation
	* API when available, otherwise falls back to polling.
	*/
	function createLocationWatcher(ctx) {
		let lastUrl;
		let watching = false;
		return { run() {
			if (watching) return;
			watching = true;
			lastUrl = new URL(location.href);
			if (supportsNavigationApi) globalThis.navigation.addEventListener("navigate", (event) => {
				const newUrl = new URL(event.destination.url);
				if (newUrl.href === lastUrl.href) return;
				window.dispatchEvent(new WxtLocationChangeEvent(newUrl, lastUrl));
				lastUrl = newUrl;
			}, { signal: ctx.signal });
			else ctx.setInterval(() => {
				const newUrl = new URL(location.href);
				if (newUrl.href !== lastUrl.href) {
					window.dispatchEvent(new WxtLocationChangeEvent(newUrl, lastUrl));
					lastUrl = newUrl;
				}
			}, 1e3);
		} };
	}
	// node_modules/wxt/dist/utils/content-script-context.mjs
	/**
	* Implements
	* [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).
	* Used to detect and stop content script code when the script is invalidated.
	*
	* It also provides several utilities like `ctx.setTimeout` and
	* `ctx.setInterval` that should be used in content scripts instead of
	* `window.setTimeout` or `window.setInterval`.
	*
	* To create context for testing, you can use the class's constructor:
	*
	* ```ts
	* import { ContentScriptContext } from 'wxt/utils/content-scripts-context';
	*
	* test('storage listener should be removed when context is invalidated', () => {
	*   const ctx = new ContentScriptContext('test');
	*   const item = storage.defineItem('local:count', { defaultValue: 0 });
	*   const watcher = vi.fn();
	*
	*   const unwatch = item.watch(watcher);
	*   ctx.onInvalidated(unwatch); // Listen for invalidate here
	*
	*   await item.setValue(1);
	*   expect(watcher).toBeCalledTimes(1);
	*   expect(watcher).toBeCalledWith(1, 0);
	*
	*   ctx.notifyInvalidated(); // Use this function to invalidate the context
	*   await item.setValue(2);
	*   expect(watcher).toBeCalledTimes(1);
	* });
	* ```
	*/
	var ContentScriptContext = class ContentScriptContext {
		static SCRIPT_STARTED_MESSAGE_TYPE = getUniqueEventName("wxt:content-script-started");
		id;
		abortController;
		locationWatcher = createLocationWatcher(this);
		constructor(contentScriptName, options) {
			this.contentScriptName = contentScriptName;
			this.options = options;
			this.id = Math.random().toString(36).slice(2);
			this.abortController = new AbortController();
			this.stopOldScripts();
			this.listenForNewerScripts();
		}
		get signal() {
			return this.abortController.signal;
		}
		abort(reason) {
			return this.abortController.abort(reason);
		}
		get isInvalid() {
			if (browser.runtime?.id == null) this.notifyInvalidated();
			return this.signal.aborted;
		}
		get isValid() {
			return !this.isInvalid;
		}
		/**
		* Add a listener that is called when the content script's context is
		* invalidated.
		*
		* @example
		*   browser.runtime.onMessage.addListener(cb);
		*   const removeInvalidatedListener = ctx.onInvalidated(() => {
		*     browser.runtime.onMessage.removeListener(cb);
		*   });
		*   // ...
		*   removeInvalidatedListener();
		*
		* @returns A function to remove the listener.
		*/
		onInvalidated(cb) {
			this.signal.addEventListener("abort", cb);
			return () => this.signal.removeEventListener("abort", cb);
		}
		/**
		* Return a promise that never resolves. Useful if you have an async function
		* that shouldn't run after the context is expired.
		*
		* @example
		*   const getValueFromStorage = async () => {
		*     if (ctx.isInvalid) return ctx.block();
		*
		*     // ...
		*   };
		*/
		block() {
			return new Promise(() => {});
		}
		/**
		* Wrapper around `window.setInterval` that automatically clears the interval
		* when invalidated.
		*
		* Intervals can be cleared by calling the normal `clearInterval` function.
		*/
		setInterval(handler, timeout) {
			const id = setInterval(() => {
				if (this.isValid) handler();
			}, timeout);
			this.onInvalidated(() => clearInterval(id));
			return id;
		}
		/**
		* Wrapper around `window.setTimeout` that automatically clears the interval
		* when invalidated.
		*
		* Timeouts can be cleared by calling the normal `setTimeout` function.
		*/
		setTimeout(handler, timeout) {
			const id = setTimeout(() => {
				if (this.isValid) handler();
			}, timeout);
			this.onInvalidated(() => clearTimeout(id));
			return id;
		}
		/**
		* Wrapper around `window.requestAnimationFrame` that automatically cancels
		* the request when invalidated.
		*
		* Callbacks can be canceled by calling the normal `cancelAnimationFrame`
		* function.
		*/
		requestAnimationFrame(callback) {
			const id = requestAnimationFrame((...args) => {
				if (this.isValid) callback(...args);
			});
			this.onInvalidated(() => cancelAnimationFrame(id));
			return id;
		}
		/**
		* Wrapper around `window.requestIdleCallback` that automatically cancels the
		* request when invalidated.
		*
		* Callbacks can be canceled by calling the normal `cancelIdleCallback`
		* function.
		*/
		requestIdleCallback(callback, options) {
			const id = requestIdleCallback((...args) => {
				if (!this.signal.aborted) callback(...args);
			}, options);
			this.onInvalidated(() => cancelIdleCallback(id));
			return id;
		}
		addEventListener(target, type, handler, options) {
			if (type === "wxt:locationchange") {
				if (this.isValid) this.locationWatcher.run();
			}
			target.addEventListener?.(type.startsWith("wxt:") ? getUniqueEventName(type) : type, handler, {
				...options,
				signal: this.signal
			});
		}
		/**
		* @internal
		* Abort the abort controller and execute all `onInvalidated` listeners.
		*/
		notifyInvalidated() {
			this.abort("Content script context invalidated");
			logger$1.debug(`Content script "${this.contentScriptName}" context invalidated`);
		}
		stopOldScripts() {
			document.dispatchEvent(new CustomEvent(ContentScriptContext.SCRIPT_STARTED_MESSAGE_TYPE, { detail: {
				contentScriptName: this.contentScriptName,
				messageId: this.id
			} }));
			if (!this.options?.noScriptStartedPostMessage) window.postMessage({
				type: ContentScriptContext.SCRIPT_STARTED_MESSAGE_TYPE,
				contentScriptName: this.contentScriptName,
				messageId: this.id
			}, "*");
		}
		verifyScriptStartedEvent(event) {
			const isSameContentScript = event.detail?.contentScriptName === this.contentScriptName;
			const isFromSelf = event.detail?.messageId === this.id;
			return isSameContentScript && !isFromSelf;
		}
		listenForNewerScripts() {
			const cb = (event) => {
				if (!(event instanceof CustomEvent) || !this.verifyScriptStartedEvent(event)) return;
				this.notifyInvalidated();
			};
			document.addEventListener(ContentScriptContext.SCRIPT_STARTED_MESSAGE_TYPE, cb);
			this.onInvalidated(() => document.removeEventListener(ContentScriptContext.SCRIPT_STARTED_MESSAGE_TYPE, cb));
		}
	};
	// \0virtual:wxt-content-script-isolated-world-entrypoint?/home/twist/Рабочий стол/Extractum/extension/entrypoints/content.ts
	function print(method, ...args) {
		if (typeof args[0] === "string") method(`[wxt] ${args.shift()}`, ...args);
		else method("[wxt]", ...args);
	}
	/** Wrapper around `console` with a "[wxt]" prefix */
	var logger = {
		debug: (...args) => print(console.debug, ...args),
		log: (...args) => print(console.log, ...args),
		warn: (...args) => print(console.warn, ...args),
		error: (...args) => print(console.error, ...args)
	};
	return (async () => {
		try {
			const { main, ...options } = content_default;
			return await main(new ContentScriptContext("content", options));
		} catch (err) {
			logger.error(`The content script "content" crashed on startup!`, err);
			throw err;
		}
	})();
})();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsIm5hbWVzIjpbImJyb3dzZXIiLCJSZWFkYWJpbGl0eSIsInByaW50IiwibG9nZ2VyIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3d4dC9kaXN0L3V0aWxzL2RlZmluZS1jb250ZW50LXNjcmlwdC5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHd4dC1kZXYvYnJvd3Nlci9zcmMvaW5kZXgubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3d4dC9kaXN0L2Jyb3dzZXIubWpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Btb3ppbGxhL3JlYWRhYmlsaXR5L1JlYWRhYmlsaXR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Btb3ppbGxhL3JlYWRhYmlsaXR5L1JlYWRhYmlsaXR5LXJlYWRlcmFibGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQG1vemlsbGEvcmVhZGFiaWxpdHkvaW5kZXguanMiLCIuLi8uLi8uLi9lbnRyeXBvaW50cy9jb250ZW50LnRzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3d4dC9kaXN0L3V0aWxzL2ludGVybmFsL2xvZ2dlci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvd3h0L2Rpc3QvdXRpbHMvaW50ZXJuYWwvY3VzdG9tLWV2ZW50cy5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvd3h0L2Rpc3QvdXRpbHMvaW50ZXJuYWwvbG9jYXRpb24td2F0Y2hlci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvd3h0L2Rpc3QvdXRpbHMvY29udGVudC1zY3JpcHQtY29udGV4dC5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8jcmVnaW9uIHNyYy91dGlscy9kZWZpbmUtY29udGVudC1zY3JpcHQudHNcbmZ1bmN0aW9uIGRlZmluZUNvbnRlbnRTY3JpcHQoZGVmaW5pdGlvbikge1xuXHRyZXR1cm4gZGVmaW5pdGlvbjtcbn1cbi8vI2VuZHJlZ2lvblxuZXhwb3J0IHsgZGVmaW5lQ29udGVudFNjcmlwdCB9O1xuIiwiLy8gI3JlZ2lvbiBzbmlwcGV0XG5leHBvcnQgY29uc3QgYnJvd3NlciA9IGdsb2JhbFRoaXMuYnJvd3Nlcj8ucnVudGltZT8uaWRcbiAgPyBnbG9iYWxUaGlzLmJyb3dzZXJcbiAgOiBnbG9iYWxUaGlzLmNocm9tZTtcbi8vICNlbmRyZWdpb24gc25pcHBldFxuIiwiaW1wb3J0IHsgYnJvd3NlciBhcyBicm93c2VyJDEgfSBmcm9tIFwiQHd4dC1kZXYvYnJvd3NlclwiO1xuLy8jcmVnaW9uIHNyYy9icm93c2VyLnRzXG4vKipcbiogQ29udGFpbnMgdGhlIGBicm93c2VyYCBleHBvcnQgd2hpY2ggeW91IHNob3VsZCB1c2UgdG8gYWNjZXNzIHRoZSBleHRlbnNpb25cbiogQVBJcyBpbiB5b3VyIHByb2plY3Q6XG4qXG4qIGBgYHRzXG4qIGltcG9ydCB7IGJyb3dzZXIgfSBmcm9tICd3eHQvYnJvd3Nlcic7XG4qXG4qIGJyb3dzZXIucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoKSA9PiB7XG4qICAgLy8gLi4uXG4qIH0pO1xuKiBgYGBcbipcbiogQG1vZHVsZSB3eHQvYnJvd3NlclxuKi9cbmNvbnN0IGJyb3dzZXIgPSBicm93c2VyJDE7XG4vLyNlbmRyZWdpb25cbmV4cG9ydCB7IGJyb3dzZXIgfTtcbiIsIi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTAgQXJjOTAgSW5jXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qXG4gKiBUaGlzIGNvZGUgaXMgaGVhdmlseSBiYXNlZCBvbiBBcmM5MCdzIHJlYWRhYmlsaXR5LmpzICgxLjcuMSkgc2NyaXB0XG4gKiBhdmFpbGFibGUgYXQ6IGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9hcmM5MGxhYnMtcmVhZGFiaWxpdHlcbiAqL1xuXG4vKipcbiAqIFB1YmxpYyBjb25zdHJ1Y3Rvci5cbiAqIEBwYXJhbSB7SFRNTERvY3VtZW50fSBkb2MgICAgIFRoZSBkb2N1bWVudCB0byBwYXJzZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICBvcHRpb25zIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gUmVhZGFiaWxpdHkoZG9jLCBvcHRpb25zKSB7XG4gIC8vIEluIHNvbWUgb2xkZXIgdmVyc2lvbnMsIHBlb3BsZSBwYXNzZWQgYSBVUkkgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LiBDb3BlOlxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmRvY3VtZW50RWxlbWVudCkge1xuICAgIGRvYyA9IG9wdGlvbnM7XG4gICAgb3B0aW9ucyA9IGFyZ3VtZW50c1syXTtcbiAgfSBlbHNlIGlmICghZG9jIHx8ICFkb2MuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJGaXJzdCBhcmd1bWVudCB0byBSZWFkYWJpbGl0eSBjb25zdHJ1Y3RvciBzaG91bGQgYmUgYSBkb2N1bWVudCBvYmplY3QuXCJcbiAgICApO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHRoaXMuX2RvYyA9IGRvYztcbiAgdGhpcy5fZG9jSlNET01QYXJzZXIgPSB0aGlzLl9kb2MuZmlyc3RDaGlsZC5fX0pTRE9NUGFyc2VyX187XG4gIHRoaXMuX2FydGljbGVUaXRsZSA9IG51bGw7XG4gIHRoaXMuX2FydGljbGVCeWxpbmUgPSBudWxsO1xuICB0aGlzLl9hcnRpY2xlRGlyID0gbnVsbDtcbiAgdGhpcy5fYXJ0aWNsZVNpdGVOYW1lID0gbnVsbDtcbiAgdGhpcy5fYXR0ZW1wdHMgPSBbXTtcbiAgdGhpcy5fbWV0YWRhdGEgPSB7fTtcblxuICAvLyBDb25maWd1cmFibGUgb3B0aW9uc1xuICB0aGlzLl9kZWJ1ZyA9ICEhb3B0aW9ucy5kZWJ1ZztcbiAgdGhpcy5fbWF4RWxlbXNUb1BhcnNlID1cbiAgICBvcHRpb25zLm1heEVsZW1zVG9QYXJzZSB8fCB0aGlzLkRFRkFVTFRfTUFYX0VMRU1TX1RPX1BBUlNFO1xuICB0aGlzLl9uYlRvcENhbmRpZGF0ZXMgPVxuICAgIG9wdGlvbnMubmJUb3BDYW5kaWRhdGVzIHx8IHRoaXMuREVGQVVMVF9OX1RPUF9DQU5ESURBVEVTO1xuICB0aGlzLl9jaGFyVGhyZXNob2xkID0gb3B0aW9ucy5jaGFyVGhyZXNob2xkIHx8IHRoaXMuREVGQVVMVF9DSEFSX1RIUkVTSE9MRDtcbiAgdGhpcy5fY2xhc3Nlc1RvUHJlc2VydmUgPSB0aGlzLkNMQVNTRVNfVE9fUFJFU0VSVkUuY29uY2F0KFxuICAgIG9wdGlvbnMuY2xhc3Nlc1RvUHJlc2VydmUgfHwgW11cbiAgKTtcbiAgdGhpcy5fa2VlcENsYXNzZXMgPSAhIW9wdGlvbnMua2VlcENsYXNzZXM7XG4gIHRoaXMuX3NlcmlhbGl6ZXIgPVxuICAgIG9wdGlvbnMuc2VyaWFsaXplciB8fFxuICAgIGZ1bmN0aW9uIChlbCkge1xuICAgICAgcmV0dXJuIGVsLmlubmVySFRNTDtcbiAgICB9O1xuICB0aGlzLl9kaXNhYmxlSlNPTkxEID0gISFvcHRpb25zLmRpc2FibGVKU09OTEQ7XG4gIHRoaXMuX2FsbG93ZWRWaWRlb1JlZ2V4ID0gb3B0aW9ucy5hbGxvd2VkVmlkZW9SZWdleCB8fCB0aGlzLlJFR0VYUFMudmlkZW9zO1xuICB0aGlzLl9saW5rRGVuc2l0eU1vZGlmaWVyID0gb3B0aW9ucy5saW5rRGVuc2l0eU1vZGlmaWVyIHx8IDA7XG5cbiAgLy8gU3RhcnQgd2l0aCBhbGwgZmxhZ3Mgc2V0XG4gIHRoaXMuX2ZsYWdzID1cbiAgICB0aGlzLkZMQUdfU1RSSVBfVU5MSUtFTFlTIHxcbiAgICB0aGlzLkZMQUdfV0VJR0hUX0NMQVNTRVMgfFxuICAgIHRoaXMuRkxBR19DTEVBTl9DT05ESVRJT05BTExZO1xuXG4gIC8vIENvbnRyb2wgd2hldGhlciBsb2cgbWVzc2FnZXMgYXJlIHNlbnQgdG8gdGhlIGNvbnNvbGVcbiAgaWYgKHRoaXMuX2RlYnVnKSB7XG4gICAgbGV0IGxvZ05vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT0gbm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgcmV0dXJuIGAke25vZGUubm9kZU5hbWV9IChcIiR7bm9kZS50ZXh0Q29udGVudH1cIilgO1xuICAgICAgfVxuICAgICAgbGV0IGF0dHJQYWlycyA9IEFycmF5LmZyb20obm9kZS5hdHRyaWJ1dGVzIHx8IFtdLCBmdW5jdGlvbiAoYXR0cikge1xuICAgICAgICByZXR1cm4gYCR7YXR0ci5uYW1lfT1cIiR7YXR0ci52YWx1ZX1cImA7XG4gICAgICB9KS5qb2luKFwiIFwiKTtcbiAgICAgIHJldHVybiBgPCR7bm9kZS5sb2NhbE5hbWV9ICR7YXR0clBhaXJzfT5gO1xuICAgIH07XG4gICAgdGhpcy5sb2cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cywgYXJnID0+IHtcbiAgICAgICAgICBpZiAoYXJnICYmIGFyZy5ub2RlVHlwZSA9PSB0aGlzLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgcmV0dXJuIGxvZ05vZGUoYXJnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGFyZztcbiAgICAgICAgfSk7XG4gICAgICAgIGFyZ3MudW5zaGlmdChcIlJlYWRlcjogKFJlYWRhYmlsaXR5KVwiKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgY29uc29sZS5sb2coLi4uYXJncyk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkdW1wICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIC8qIGdsb2JhbCBkdW1wICovXG4gICAgICAgIHZhciBtc2cgPSBBcnJheS5wcm90b3R5cGUubWFwXG4gICAgICAgICAgLmNhbGwoYXJndW1lbnRzLCBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgcmV0dXJuIHggJiYgeC5ub2RlTmFtZSA/IGxvZ05vZGUoeCkgOiB4O1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmpvaW4oXCIgXCIpO1xuICAgICAgICBkdW1wKFwiUmVhZGVyOiAoUmVhZGFiaWxpdHkpIFwiICsgbXNnICsgXCJcXG5cIik7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmxvZyA9IGZ1bmN0aW9uICgpIHt9O1xuICB9XG59XG5cblJlYWRhYmlsaXR5LnByb3RvdHlwZSA9IHtcbiAgRkxBR19TVFJJUF9VTkxJS0VMWVM6IDB4MSxcbiAgRkxBR19XRUlHSFRfQ0xBU1NFUzogMHgyLFxuICBGTEFHX0NMRUFOX0NPTkRJVElPTkFMTFk6IDB4NCxcblxuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTm9kZS9ub2RlVHlwZVxuICBFTEVNRU5UX05PREU6IDEsXG4gIFRFWFRfTk9ERTogMyxcblxuICAvLyBNYXggbnVtYmVyIG9mIG5vZGVzIHN1cHBvcnRlZCBieSB0aGlzIHBhcnNlci4gRGVmYXVsdDogMCAobm8gbGltaXQpXG4gIERFRkFVTFRfTUFYX0VMRU1TX1RPX1BBUlNFOiAwLFxuXG4gIC8vIFRoZSBudW1iZXIgb2YgdG9wIGNhbmRpZGF0ZXMgdG8gY29uc2lkZXIgd2hlbiBhbmFseXNpbmcgaG93XG4gIC8vIHRpZ2h0IHRoZSBjb21wZXRpdGlvbiBpcyBhbW9uZyBjYW5kaWRhdGVzLlxuICBERUZBVUxUX05fVE9QX0NBTkRJREFURVM6IDUsXG5cbiAgLy8gRWxlbWVudCB0YWdzIHRvIHNjb3JlIGJ5IGRlZmF1bHQuXG4gIERFRkFVTFRfVEFHU19UT19TQ09SRTogXCJzZWN0aW9uLGgyLGgzLGg0LGg1LGg2LHAsdGQscHJlXCJcbiAgICAudG9VcHBlckNhc2UoKVxuICAgIC5zcGxpdChcIixcIiksXG5cbiAgLy8gVGhlIGRlZmF1bHQgbnVtYmVyIG9mIGNoYXJzIGFuIGFydGljbGUgbXVzdCBoYXZlIGluIG9yZGVyIHRvIHJldHVybiBhIHJlc3VsdFxuICBERUZBVUxUX0NIQVJfVEhSRVNIT0xEOiA1MDAsXG5cbiAgLy8gQWxsIG9mIHRoZSByZWd1bGFyIGV4cHJlc3Npb25zIGluIHVzZSB3aXRoaW4gcmVhZGFiaWxpdHkuXG4gIC8vIERlZmluZWQgdXAgaGVyZSBzbyB3ZSBkb24ndCBpbnN0YW50aWF0ZSB0aGVtIHJlcGVhdGVkbHkgaW4gbG9vcHMuXG4gIFJFR0VYUFM6IHtcbiAgICAvLyBOT1RFOiBUaGVzZSB0d28gcmVndWxhciBleHByZXNzaW9ucyBhcmUgZHVwbGljYXRlZCBpblxuICAgIC8vIFJlYWRhYmlsaXR5LXJlYWRlcmFibGUuanMuIFBsZWFzZSBrZWVwIGJvdGggY29waWVzIGluIHN5bmMuXG4gICAgdW5saWtlbHlDYW5kaWRhdGVzOlxuICAgICAgLy1hZC18YWkyaHRtbHxiYW5uZXJ8YnJlYWRjcnVtYnN8Y29tYnh8Y29tbWVudHxjb21tdW5pdHl8Y292ZXItd3JhcHxkaXNxdXN8ZXh0cmF8Zm9vdGVyfGdkcHJ8aGVhZGVyfGxlZ2VuZHN8bWVudXxyZWxhdGVkfHJlbWFya3xyZXBsaWVzfHJzc3xzaG91dGJveHxzaWRlYmFyfHNreXNjcmFwZXJ8c29jaWFsfHNwb25zb3J8c3VwcGxlbWVudGFsfGFkLWJyZWFrfGFnZWdhdGV8cGFnaW5hdGlvbnxwYWdlcnxwb3B1cHx5b20tcmVtb3RlL2ksXG4gICAgb2tNYXliZUl0c0FDYW5kaWRhdGU6IC9hbmR8YXJ0aWNsZXxib2R5fGNvbHVtbnxjb250ZW50fG1haW58c2hhZG93L2ksXG5cbiAgICBwb3NpdGl2ZTpcbiAgICAgIC9hcnRpY2xlfGJvZHl8Y29udGVudHxlbnRyeXxoZW50cnl8aC1lbnRyeXxtYWlufHBhZ2V8cGFnaW5hdGlvbnxwb3N0fHRleHR8YmxvZ3xzdG9yeS9pLFxuICAgIG5lZ2F0aXZlOlxuICAgICAgLy1hZC18aGlkZGVufF5oaWQkfCBoaWQkfCBoaWQgfF5oaWQgfGJhbm5lcnxjb21ieHxjb21tZW50fGNvbS18Y29udGFjdHxmb290ZXJ8Z2RwcnxtYXN0aGVhZHxtZWRpYXxtZXRhfG91dGJyYWlufHByb21vfHJlbGF0ZWR8c2Nyb2xsfHNoYXJlfHNob3V0Ym94fHNpZGViYXJ8c2t5c2NyYXBlcnxzcG9uc29yfHNob3BwaW5nfHRhZ3N8d2lkZ2V0L2ksXG4gICAgZXh0cmFuZW91czpcbiAgICAgIC9wcmludHxhcmNoaXZlfGNvbW1lbnR8ZGlzY3Vzc3xlW1xcLV0/bWFpbHxzaGFyZXxyZXBseXxhbGx8bG9naW58c2lnbnxzaW5nbGV8dXRpbGl0eS9pLFxuICAgIGJ5bGluZTogL2J5bGluZXxhdXRob3J8ZGF0ZWxpbmV8d3JpdHRlbmJ5fHAtYXV0aG9yL2ksXG4gICAgcmVwbGFjZUZvbnRzOiAvPChcXC8/KWZvbnRbXj5dKj4vZ2ksXG4gICAgbm9ybWFsaXplOiAvXFxzezIsfS9nLFxuICAgIHZpZGVvczpcbiAgICAgIC9cXC9cXC8od3d3XFwuKT8oKGRhaWx5bW90aW9ufHlvdXR1YmV8eW91dHViZS1ub2Nvb2tpZXxwbGF5ZXJcXC52aW1lb3x2XFwucXEpXFwuY29tfChhcmNoaXZlfHVwbG9hZFxcLndpa2ltZWRpYSlcXC5vcmd8cGxheWVyXFwudHdpdGNoXFwudHYpL2ksXG4gICAgc2hhcmVFbGVtZW50czogLyhcXGJ8Xykoc2hhcmV8c2hhcmVkYWRkeSkoXFxifF8pL2ksXG4gICAgbmV4dExpbms6IC8obmV4dHx3ZWl0ZXJ8Y29udGludWV8PihbXlxcfF18JCl8wrsoW15cXHxdfCQpKS9pLFxuICAgIHByZXZMaW5rOiAvKHByZXZ8ZWFybHxvbGR8bmV3fDx8wqspL2ksXG4gICAgdG9rZW5pemU6IC9cXFcrL2csXG4gICAgd2hpdGVzcGFjZTogL15cXHMqJC8sXG4gICAgaGFzQ29udGVudDogL1xcUyQvLFxuICAgIGhhc2hVcmw6IC9eIy4rLyxcbiAgICBzcmNzZXRVcmw6IC8oXFxTKykoXFxzK1tcXGQuXStbeHddKT8oXFxzKig/Oix8JCkpL2csXG4gICAgYjY0RGF0YVVybDogL15kYXRhOlxccyooW15cXHM7LF0rKVxccyo7XFxzKmJhc2U2NFxccyosL2ksXG4gICAgLy8gQ29tbWFzIGFzIHVzZWQgaW4gTGF0aW4sIFNpbmRoaSwgQ2hpbmVzZSBhbmQgdmFyaW91cyBvdGhlciBzY3JpcHRzLlxuICAgIC8vIHNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ29tbWEjQ29tbWFfdmFyaWFudHNcbiAgICBjb21tYXM6IC9cXHUwMDJDfFxcdTA2MEN8XFx1RkU1MHxcXHVGRTEwfFxcdUZFMTF8XFx1MkU0MXxcXHUyRTM0fFxcdTJFMzJ8XFx1RkYwQy9nLFxuICAgIC8vIFNlZTogaHR0cHM6Ly9zY2hlbWEub3JnL0FydGljbGVcbiAgICBqc29uTGRBcnRpY2xlVHlwZXM6XG4gICAgICAvXkFydGljbGV8QWR2ZXJ0aXNlckNvbnRlbnRBcnRpY2xlfE5ld3NBcnRpY2xlfEFuYWx5c2lzTmV3c0FydGljbGV8QXNrUHVibGljTmV3c0FydGljbGV8QmFja2dyb3VuZE5ld3NBcnRpY2xlfE9waW5pb25OZXdzQXJ0aWNsZXxSZXBvcnRhZ2VOZXdzQXJ0aWNsZXxSZXZpZXdOZXdzQXJ0aWNsZXxSZXBvcnR8U2F0aXJpY2FsQXJ0aWNsZXxTY2hvbGFybHlBcnRpY2xlfE1lZGljYWxTY2hvbGFybHlBcnRpY2xlfFNvY2lhbE1lZGlhUG9zdGluZ3xCbG9nUG9zdGluZ3xMaXZlQmxvZ1Bvc3Rpbmd8RGlzY3Vzc2lvbkZvcnVtUG9zdGluZ3xUZWNoQXJ0aWNsZXxBUElSZWZlcmVuY2UkLyxcbiAgICAvLyB1c2VkIHRvIHNlZSBpZiBhIG5vZGUncyBjb250ZW50IG1hdGNoZXMgd29yZHMgY29tbW9ubHkgdXNlZCBmb3IgYWQgYmxvY2tzIG9yIGxvYWRpbmcgaW5kaWNhdG9yc1xuICAgIGFkV29yZHM6XG4gICAgICAvXihhZCh2ZXJ0aXNpbmd8dmVydGlzZW1lbnQpP3xwdWIobGljaXTDqSk/fHdlcmIodW5nKT985bm/5ZGKfNCg0LXQutC70LDQvNCwfEFudW5jaW8pJC9pdSxcbiAgICBsb2FkaW5nV29yZHM6XG4gICAgICAvXigobG9hZGluZ3zmraPlnKjliqDovb180JfQsNCz0YDRg9C30LrQsHxjaGFyZ2VtZW50fGNhcmdhbmRvKSjigKZ8XFwuXFwuXFwuKT8pJC9pdSxcbiAgfSxcblxuICBVTkxJS0VMWV9ST0xFUzogW1xuICAgIFwibWVudVwiLFxuICAgIFwibWVudWJhclwiLFxuICAgIFwiY29tcGxlbWVudGFyeVwiLFxuICAgIFwibmF2aWdhdGlvblwiLFxuICAgIFwiYWxlcnRcIixcbiAgICBcImFsZXJ0ZGlhbG9nXCIsXG4gICAgXCJkaWFsb2dcIixcbiAgXSxcblxuICBESVZfVE9fUF9FTEVNUzogbmV3IFNldChbXG4gICAgXCJCTE9DS1FVT1RFXCIsXG4gICAgXCJETFwiLFxuICAgIFwiRElWXCIsXG4gICAgXCJJTUdcIixcbiAgICBcIk9MXCIsXG4gICAgXCJQXCIsXG4gICAgXCJQUkVcIixcbiAgICBcIlRBQkxFXCIsXG4gICAgXCJVTFwiLFxuICBdKSxcblxuICBBTFRFUl9UT19ESVZfRVhDRVBUSU9OUzogW1wiRElWXCIsIFwiQVJUSUNMRVwiLCBcIlNFQ1RJT05cIiwgXCJQXCIsIFwiT0xcIiwgXCJVTFwiXSxcblxuICBQUkVTRU5UQVRJT05BTF9BVFRSSUJVVEVTOiBbXG4gICAgXCJhbGlnblwiLFxuICAgIFwiYmFja2dyb3VuZFwiLFxuICAgIFwiYmdjb2xvclwiLFxuICAgIFwiYm9yZGVyXCIsXG4gICAgXCJjZWxscGFkZGluZ1wiLFxuICAgIFwiY2VsbHNwYWNpbmdcIixcbiAgICBcImZyYW1lXCIsXG4gICAgXCJoc3BhY2VcIixcbiAgICBcInJ1bGVzXCIsXG4gICAgXCJzdHlsZVwiLFxuICAgIFwidmFsaWduXCIsXG4gICAgXCJ2c3BhY2VcIixcbiAgXSxcblxuICBERVBSRUNBVEVEX1NJWkVfQVRUUklCVVRFX0VMRU1TOiBbXCJUQUJMRVwiLCBcIlRIXCIsIFwiVERcIiwgXCJIUlwiLCBcIlBSRVwiXSxcblxuICAvLyBUaGUgY29tbWVudGVkIG91dCBlbGVtZW50cyBxdWFsaWZ5IGFzIHBocmFzaW5nIGNvbnRlbnQgYnV0IHRlbmQgdG8gYmVcbiAgLy8gcmVtb3ZlZCBieSByZWFkYWJpbGl0eSB3aGVuIHB1dCBpbnRvIHBhcmFncmFwaHMsIHNvIHdlIGlnbm9yZSB0aGVtIGhlcmUuXG4gIFBIUkFTSU5HX0VMRU1TOiBbXG4gICAgLy8gXCJDQU5WQVNcIiwgXCJJRlJBTUVcIiwgXCJTVkdcIiwgXCJWSURFT1wiLFxuICAgIFwiQUJCUlwiLFxuICAgIFwiQVVESU9cIixcbiAgICBcIkJcIixcbiAgICBcIkJET1wiLFxuICAgIFwiQlJcIixcbiAgICBcIkJVVFRPTlwiLFxuICAgIFwiQ0lURVwiLFxuICAgIFwiQ09ERVwiLFxuICAgIFwiREFUQVwiLFxuICAgIFwiREFUQUxJU1RcIixcbiAgICBcIkRGTlwiLFxuICAgIFwiRU1cIixcbiAgICBcIkVNQkVEXCIsXG4gICAgXCJJXCIsXG4gICAgXCJJTUdcIixcbiAgICBcIklOUFVUXCIsXG4gICAgXCJLQkRcIixcbiAgICBcIkxBQkVMXCIsXG4gICAgXCJNQVJLXCIsXG4gICAgXCJNQVRIXCIsXG4gICAgXCJNRVRFUlwiLFxuICAgIFwiTk9TQ1JJUFRcIixcbiAgICBcIk9CSkVDVFwiLFxuICAgIFwiT1VUUFVUXCIsXG4gICAgXCJQUk9HUkVTU1wiLFxuICAgIFwiUVwiLFxuICAgIFwiUlVCWVwiLFxuICAgIFwiU0FNUFwiLFxuICAgIFwiU0NSSVBUXCIsXG4gICAgXCJTRUxFQ1RcIixcbiAgICBcIlNNQUxMXCIsXG4gICAgXCJTUEFOXCIsXG4gICAgXCJTVFJPTkdcIixcbiAgICBcIlNVQlwiLFxuICAgIFwiU1VQXCIsXG4gICAgXCJURVhUQVJFQVwiLFxuICAgIFwiVElNRVwiLFxuICAgIFwiVkFSXCIsXG4gICAgXCJXQlJcIixcbiAgXSxcblxuICAvLyBUaGVzZSBhcmUgdGhlIGNsYXNzZXMgdGhhdCByZWFkYWJpbGl0eSBzZXRzIGl0c2VsZi5cbiAgQ0xBU1NFU19UT19QUkVTRVJWRTogW1wicGFnZVwiXSxcblxuICAvLyBUaGVzZSBhcmUgdGhlIGxpc3Qgb2YgSFRNTCBlbnRpdGllcyB0aGF0IG5lZWQgdG8gYmUgZXNjYXBlZC5cbiAgSFRNTF9FU0NBUEVfTUFQOiB7XG4gICAgbHQ6IFwiPFwiLFxuICAgIGd0OiBcIj5cIixcbiAgICBhbXA6IFwiJlwiLFxuICAgIHF1b3Q6ICdcIicsXG4gICAgYXBvczogXCInXCIsXG4gIH0sXG5cbiAgLyoqXG4gICAqIFJ1biBhbnkgcG9zdC1wcm9jZXNzIG1vZGlmaWNhdGlvbnMgdG8gYXJ0aWNsZSBjb250ZW50IGFzIG5lY2Vzc2FyeS5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHJldHVybiB2b2lkXG4gICAqKi9cbiAgX3Bvc3RQcm9jZXNzQ29udGVudChhcnRpY2xlQ29udGVudCkge1xuICAgIC8vIFJlYWRhYmlsaXR5IGNhbm5vdCBvcGVuIHJlbGF0aXZlIHVyaXMgc28gd2UgY29udmVydCB0aGVtIHRvIGFic29sdXRlIHVyaXMuXG4gICAgdGhpcy5fZml4UmVsYXRpdmVVcmlzKGFydGljbGVDb250ZW50KTtcblxuICAgIHRoaXMuX3NpbXBsaWZ5TmVzdGVkRWxlbWVudHMoYXJ0aWNsZUNvbnRlbnQpO1xuXG4gICAgaWYgKCF0aGlzLl9rZWVwQ2xhc3Nlcykge1xuICAgICAgLy8gUmVtb3ZlIGNsYXNzZXMuXG4gICAgICB0aGlzLl9jbGVhbkNsYXNzZXMoYXJ0aWNsZUNvbnRlbnQpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogSXRlcmF0ZXMgb3ZlciBhIE5vZGVMaXN0LCBjYWxscyBgZmlsdGVyRm5gIGZvciBlYWNoIG5vZGUgYW5kIHJlbW92ZXMgbm9kZVxuICAgKiBpZiBmdW5jdGlvbiByZXR1cm5lZCBgdHJ1ZWAuXG4gICAqXG4gICAqIElmIGZ1bmN0aW9uIGlzIG5vdCBwYXNzZWQsIHJlbW92ZXMgYWxsIHRoZSBub2RlcyBpbiBub2RlIGxpc3QuXG4gICAqXG4gICAqIEBwYXJhbSBOb2RlTGlzdCBub2RlTGlzdCBUaGUgbm9kZXMgdG8gb3BlcmF0ZSBvblxuICAgKiBAcGFyYW0gRnVuY3Rpb24gZmlsdGVyRm4gdGhlIGZ1bmN0aW9uIHRvIHVzZSBhcyBhIGZpbHRlclxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIF9yZW1vdmVOb2Rlcyhub2RlTGlzdCwgZmlsdGVyRm4pIHtcbiAgICAvLyBBdm9pZCBldmVyIG9wZXJhdGluZyBvbiBsaXZlIG5vZGUgbGlzdHMuXG4gICAgaWYgKHRoaXMuX2RvY0pTRE9NUGFyc2VyICYmIG5vZGVMaXN0Ll9pc0xpdmVOb2RlTGlzdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRG8gbm90IHBhc3MgbGl2ZSBub2RlIGxpc3RzIHRvIF9yZW1vdmVOb2Rlc1wiKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IG5vZGVMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgbm9kZSA9IG5vZGVMaXN0W2ldO1xuICAgICAgdmFyIHBhcmVudE5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICBpZiAoIWZpbHRlckZuIHx8IGZpbHRlckZuLmNhbGwodGhpcywgbm9kZSwgaSwgbm9kZUxpc3QpKSB7XG4gICAgICAgICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogSXRlcmF0ZXMgb3ZlciBhIE5vZGVMaXN0LCBhbmQgY2FsbHMgX3NldE5vZGVUYWcgZm9yIGVhY2ggbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIE5vZGVMaXN0IG5vZGVMaXN0IFRoZSBub2RlcyB0byBvcGVyYXRlIG9uXG4gICAqIEBwYXJhbSBTdHJpbmcgbmV3VGFnTmFtZSB0aGUgbmV3IHRhZyBuYW1lIHRvIHVzZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIF9yZXBsYWNlTm9kZVRhZ3Mobm9kZUxpc3QsIG5ld1RhZ05hbWUpIHtcbiAgICAvLyBBdm9pZCBldmVyIG9wZXJhdGluZyBvbiBsaXZlIG5vZGUgbGlzdHMuXG4gICAgaWYgKHRoaXMuX2RvY0pTRE9NUGFyc2VyICYmIG5vZGVMaXN0Ll9pc0xpdmVOb2RlTGlzdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRG8gbm90IHBhc3MgbGl2ZSBub2RlIGxpc3RzIHRvIF9yZXBsYWNlTm9kZVRhZ3NcIik7XG4gICAgfVxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2RlTGlzdCkge1xuICAgICAgdGhpcy5fc2V0Tm9kZVRhZyhub2RlLCBuZXdUYWdOYW1lKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEl0ZXJhdGUgb3ZlciBhIE5vZGVMaXN0LCB3aGljaCBkb2Vzbid0IG5hdGl2ZWx5IGZ1bGx5IGltcGxlbWVudCB0aGUgQXJyYXlcbiAgICogaW50ZXJmYWNlLlxuICAgKlxuICAgKiBGb3IgY29udmVuaWVuY2UsIHRoZSBjdXJyZW50IG9iamVjdCBjb250ZXh0IGlzIGFwcGxpZWQgdG8gdGhlIHByb3ZpZGVkXG4gICAqIGl0ZXJhdGUgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSAgTm9kZUxpc3Qgbm9kZUxpc3QgVGhlIE5vZGVMaXN0LlxuICAgKiBAcGFyYW0gIEZ1bmN0aW9uIGZuICAgICAgIFRoZSBpdGVyYXRlIGZ1bmN0aW9uLlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIF9mb3JFYWNoTm9kZShub2RlTGlzdCwgZm4pIHtcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5vZGVMaXN0LCBmbiwgdGhpcyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEl0ZXJhdGUgb3ZlciBhIE5vZGVMaXN0LCBhbmQgcmV0dXJuIHRoZSBmaXJzdCBub2RlIHRoYXQgcGFzc2VzXG4gICAqIHRoZSBzdXBwbGllZCB0ZXN0IGZ1bmN0aW9uXG4gICAqXG4gICAqIEZvciBjb252ZW5pZW5jZSwgdGhlIGN1cnJlbnQgb2JqZWN0IGNvbnRleHQgaXMgYXBwbGllZCB0byB0aGUgcHJvdmlkZWRcbiAgICogdGVzdCBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtICBOb2RlTGlzdCBub2RlTGlzdCBUaGUgTm9kZUxpc3QuXG4gICAqIEBwYXJhbSAgRnVuY3Rpb24gZm4gICAgICAgVGhlIHRlc3QgZnVuY3Rpb24uXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgX2ZpbmROb2RlKG5vZGVMaXN0LCBmbikge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuZmluZC5jYWxsKG5vZGVMaXN0LCBmbiwgdGhpcyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEl0ZXJhdGUgb3ZlciBhIE5vZGVMaXN0LCByZXR1cm4gdHJ1ZSBpZiBhbnkgb2YgdGhlIHByb3ZpZGVkIGl0ZXJhdGVcbiAgICogZnVuY3Rpb24gY2FsbHMgcmV0dXJucyB0cnVlLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqXG4gICAqIEZvciBjb252ZW5pZW5jZSwgdGhlIGN1cnJlbnQgb2JqZWN0IGNvbnRleHQgaXMgYXBwbGllZCB0byB0aGVcbiAgICogcHJvdmlkZWQgaXRlcmF0ZSBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtICBOb2RlTGlzdCBub2RlTGlzdCBUaGUgTm9kZUxpc3QuXG4gICAqIEBwYXJhbSAgRnVuY3Rpb24gZm4gICAgICAgVGhlIGl0ZXJhdGUgZnVuY3Rpb24uXG4gICAqIEByZXR1cm4gQm9vbGVhblxuICAgKi9cbiAgX3NvbWVOb2RlKG5vZGVMaXN0LCBmbikge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc29tZS5jYWxsKG5vZGVMaXN0LCBmbiwgdGhpcyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEl0ZXJhdGUgb3ZlciBhIE5vZGVMaXN0LCByZXR1cm4gdHJ1ZSBpZiBhbGwgb2YgdGhlIHByb3ZpZGVkIGl0ZXJhdGVcbiAgICogZnVuY3Rpb24gY2FsbHMgcmV0dXJuIHRydWUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICpcbiAgICogRm9yIGNvbnZlbmllbmNlLCB0aGUgY3VycmVudCBvYmplY3QgY29udGV4dCBpcyBhcHBsaWVkIHRvIHRoZVxuICAgKiBwcm92aWRlZCBpdGVyYXRlIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIE5vZGVMaXN0IG5vZGVMaXN0IFRoZSBOb2RlTGlzdC5cbiAgICogQHBhcmFtICBGdW5jdGlvbiBmbiAgICAgICBUaGUgaXRlcmF0ZSBmdW5jdGlvbi5cbiAgICogQHJldHVybiBCb29sZWFuXG4gICAqL1xuICBfZXZlcnlOb2RlKG5vZGVMaXN0LCBmbikge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuZXZlcnkuY2FsbChub2RlTGlzdCwgZm4sIHRoaXMpO1xuICB9LFxuXG4gIF9nZXRBbGxOb2Rlc1dpdGhUYWcobm9kZSwgdGFnTmFtZXMpIHtcbiAgICBpZiAobm9kZS5xdWVyeVNlbGVjdG9yQWxsKSB7XG4gICAgICByZXR1cm4gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHRhZ05hbWVzLmpvaW4oXCIsXCIpKTtcbiAgICB9XG4gICAgcmV0dXJuIFtdLmNvbmNhdC5hcHBseShcbiAgICAgIFtdLFxuICAgICAgdGFnTmFtZXMubWFwKGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZyk7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pID8gY29sbGVjdGlvbiA6IEFycmF5LmZyb20oY29sbGVjdGlvbik7XG4gICAgICB9KVxuICAgICk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGNsYXNzPVwiXCIgYXR0cmlidXRlIGZyb20gZXZlcnkgZWxlbWVudCBpbiB0aGUgZ2l2ZW5cbiAgICogc3VidHJlZSwgZXhjZXB0IHRob3NlIHRoYXQgbWF0Y2ggQ0xBU1NFU19UT19QUkVTRVJWRSBhbmRcbiAgICogdGhlIGNsYXNzZXNUb1ByZXNlcnZlIGFycmF5IGZyb20gdGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIF9jbGVhbkNsYXNzZXMobm9kZSkge1xuICAgIHZhciBjbGFzc2VzVG9QcmVzZXJ2ZSA9IHRoaXMuX2NsYXNzZXNUb1ByZXNlcnZlO1xuICAgIHZhciBjbGFzc05hbWUgPSAobm9kZS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiKVxuICAgICAgLnNwbGl0KC9cXHMrLylcbiAgICAgIC5maWx0ZXIoY2xzID0+IGNsYXNzZXNUb1ByZXNlcnZlLmluY2x1ZGVzKGNscykpXG4gICAgICAuam9pbihcIiBcIik7XG5cbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICBub2RlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKFwiY2xhc3NcIik7XG4gICAgfVxuXG4gICAgZm9yIChub2RlID0gbm9kZS5maXJzdEVsZW1lbnRDaGlsZDsgbm9kZTsgbm9kZSA9IG5vZGUubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgICB0aGlzLl9jbGVhbkNsYXNzZXMobm9kZSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBUZXN0cyB3aGV0aGVyIGEgc3RyaW5nIGlzIGEgVVJMIG9yIG5vdC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIHRlc3RcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBzdHIgaXMgYSBVUkwsIGZhbHNlIGlmIG5vdFxuICAgKi9cbiAgX2lzVXJsKHN0cikge1xuICAgIHRyeSB7XG4gICAgICBuZXcgVVJMKHN0cik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBlYWNoIDxhPiBhbmQgPGltZz4gdXJpIGluIHRoZSBnaXZlbiBlbGVtZW50IHRvIGFuIGFic29sdXRlIFVSSSxcbiAgICogaWdub3JpbmcgI3JlZiBVUklzLlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIF9maXhSZWxhdGl2ZVVyaXMoYXJ0aWNsZUNvbnRlbnQpIHtcbiAgICB2YXIgYmFzZVVSSSA9IHRoaXMuX2RvYy5iYXNlVVJJO1xuICAgIHZhciBkb2N1bWVudFVSSSA9IHRoaXMuX2RvYy5kb2N1bWVudFVSSTtcbiAgICBmdW5jdGlvbiB0b0Fic29sdXRlVVJJKHVyaSkge1xuICAgICAgLy8gTGVhdmUgaGFzaCBsaW5rcyBhbG9uZSBpZiB0aGUgYmFzZSBVUkkgbWF0Y2hlcyB0aGUgZG9jdW1lbnQgVVJJOlxuICAgICAgaWYgKGJhc2VVUkkgPT0gZG9jdW1lbnRVUkkgJiYgdXJpLmNoYXJBdCgwKSA9PSBcIiNcIikge1xuICAgICAgICByZXR1cm4gdXJpO1xuICAgICAgfVxuXG4gICAgICAvLyBPdGhlcndpc2UsIHJlc29sdmUgYWdhaW5zdCBiYXNlIFVSSTpcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBuZXcgVVJMKHVyaSwgYmFzZVVSSSkuaHJlZjtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIC8vIFNvbWV0aGluZyB3ZW50IHdyb25nLCBqdXN0IHJldHVybiB0aGUgb3JpZ2luYWw6XG4gICAgICB9XG4gICAgICByZXR1cm4gdXJpO1xuICAgIH1cblxuICAgIHZhciBsaW5rcyA9IHRoaXMuX2dldEFsbE5vZGVzV2l0aFRhZyhhcnRpY2xlQ29udGVudCwgW1wiYVwiXSk7XG4gICAgdGhpcy5fZm9yRWFjaE5vZGUobGlua3MsIGZ1bmN0aW9uIChsaW5rKSB7XG4gICAgICB2YXIgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICAgIGlmIChocmVmKSB7XG4gICAgICAgIC8vIFJlbW92ZSBsaW5rcyB3aXRoIGphdmFzY3JpcHQ6IFVSSXMsIHNpbmNlXG4gICAgICAgIC8vIHRoZXkgd29uJ3Qgd29yayBhZnRlciBzY3JpcHRzIGhhdmUgYmVlbiByZW1vdmVkIGZyb20gdGhlIHBhZ2UuXG4gICAgICAgIGlmIChocmVmLmluZGV4T2YoXCJqYXZhc2NyaXB0OlwiKSA9PT0gMCkge1xuICAgICAgICAgIC8vIGlmIHRoZSBsaW5rIG9ubHkgY29udGFpbnMgc2ltcGxlIHRleHQgY29udGVudCwgaXQgY2FuIGJlIGNvbnZlcnRlZCB0byBhIHRleHQgbm9kZVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGxpbmsuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiZcbiAgICAgICAgICAgIGxpbmsuY2hpbGROb2Rlc1swXS5ub2RlVHlwZSA9PT0gdGhpcy5URVhUX05PREVcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gdGhpcy5fZG9jLmNyZWF0ZVRleHROb2RlKGxpbmsudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgbGluay5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh0ZXh0LCBsaW5rKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgdGhlIGxpbmsgaGFzIG11bHRpcGxlIGNoaWxkcmVuLCB0aGV5IHNob3VsZCBhbGwgYmUgcHJlc2VydmVkXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5fZG9jLmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICAgICAgd2hpbGUgKGxpbmsuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGluay5maXJzdENoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpbmsucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY29udGFpbmVyLCBsaW5rKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHRvQWJzb2x1dGVVUkkoaHJlZikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgbWVkaWFzID0gdGhpcy5fZ2V0QWxsTm9kZXNXaXRoVGFnKGFydGljbGVDb250ZW50LCBbXG4gICAgICBcImltZ1wiLFxuICAgICAgXCJwaWN0dXJlXCIsXG4gICAgICBcImZpZ3VyZVwiLFxuICAgICAgXCJ2aWRlb1wiLFxuICAgICAgXCJhdWRpb1wiLFxuICAgICAgXCJzb3VyY2VcIixcbiAgICBdKTtcblxuICAgIHRoaXMuX2ZvckVhY2hOb2RlKG1lZGlhcywgZnVuY3Rpb24gKG1lZGlhKSB7XG4gICAgICB2YXIgc3JjID0gbWVkaWEuZ2V0QXR0cmlidXRlKFwic3JjXCIpO1xuICAgICAgdmFyIHBvc3RlciA9IG1lZGlhLmdldEF0dHJpYnV0ZShcInBvc3RlclwiKTtcbiAgICAgIHZhciBzcmNzZXQgPSBtZWRpYS5nZXRBdHRyaWJ1dGUoXCJzcmNzZXRcIik7XG5cbiAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgbWVkaWEuc2V0QXR0cmlidXRlKFwic3JjXCIsIHRvQWJzb2x1dGVVUkkoc3JjKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwb3N0ZXIpIHtcbiAgICAgICAgbWVkaWEuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIHRvQWJzb2x1dGVVUkkocG9zdGVyKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzcmNzZXQpIHtcbiAgICAgICAgdmFyIG5ld1NyY3NldCA9IHNyY3NldC5yZXBsYWNlKFxuICAgICAgICAgIHRoaXMuUkVHRVhQUy5zcmNzZXRVcmwsXG4gICAgICAgICAgZnVuY3Rpb24gKF8sIHAxLCBwMiwgcDMpIHtcbiAgICAgICAgICAgIHJldHVybiB0b0Fic29sdXRlVVJJKHAxKSArIChwMiB8fCBcIlwiKSArIHAzO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBtZWRpYS5zZXRBdHRyaWJ1dGUoXCJzcmNzZXRcIiwgbmV3U3Jjc2V0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBfc2ltcGxpZnlOZXN0ZWRFbGVtZW50cyhhcnRpY2xlQ29udGVudCkge1xuICAgIHZhciBub2RlID0gYXJ0aWNsZUNvbnRlbnQ7XG5cbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgaWYgKFxuICAgICAgICBub2RlLnBhcmVudE5vZGUgJiZcbiAgICAgICAgW1wiRElWXCIsIFwiU0VDVElPTlwiXS5pbmNsdWRlcyhub2RlLnRhZ05hbWUpICYmXG4gICAgICAgICEobm9kZS5pZCAmJiBub2RlLmlkLnN0YXJ0c1dpdGgoXCJyZWFkYWJpbGl0eVwiKSlcbiAgICAgICkge1xuICAgICAgICBpZiAodGhpcy5faXNFbGVtZW50V2l0aG91dENvbnRlbnQobm9kZSkpIHtcbiAgICAgICAgICBub2RlID0gdGhpcy5fcmVtb3ZlQW5kR2V0TmV4dChub2RlKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICB0aGlzLl9oYXNTaW5nbGVUYWdJbnNpZGVFbGVtZW50KG5vZGUsIFwiRElWXCIpIHx8XG4gICAgICAgICAgdGhpcy5faGFzU2luZ2xlVGFnSW5zaWRlRWxlbWVudChub2RlLCBcIlNFQ1RJT05cIilcbiAgICAgICAgKSB7XG4gICAgICAgICAgdmFyIGNoaWxkID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2hpbGQuc2V0QXR0cmlidXRlTm9kZShub2RlLmF0dHJpYnV0ZXNbaV0uY2xvbmVOb2RlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBub2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNoaWxkLCBub2RlKTtcbiAgICAgICAgICBub2RlID0gY2hpbGQ7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbm9kZSA9IHRoaXMuX2dldE5leHROb2RlKG5vZGUpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogR2V0IHRoZSBhcnRpY2xlIHRpdGxlIGFzIGFuIEgxLlxuICAgKlxuICAgKiBAcmV0dXJuIHN0cmluZ1xuICAgKiovXG4gIF9nZXRBcnRpY2xlVGl0bGUoKSB7XG4gICAgdmFyIGRvYyA9IHRoaXMuX2RvYztcbiAgICB2YXIgY3VyVGl0bGUgPSBcIlwiO1xuICAgIHZhciBvcmlnVGl0bGUgPSBcIlwiO1xuXG4gICAgdHJ5IHtcbiAgICAgIGN1clRpdGxlID0gb3JpZ1RpdGxlID0gZG9jLnRpdGxlLnRyaW0oKTtcblxuICAgICAgLy8gSWYgdGhleSBoYWQgYW4gZWxlbWVudCB3aXRoIGlkIFwidGl0bGVcIiBpbiB0aGVpciBIVE1MXG4gICAgICBpZiAodHlwZW9mIGN1clRpdGxlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGN1clRpdGxlID0gb3JpZ1RpdGxlID0gdGhpcy5fZ2V0SW5uZXJUZXh0KFxuICAgICAgICAgIGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRpdGxlXCIpWzBdXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyogaWdub3JlIGV4Y2VwdGlvbnMgc2V0dGluZyB0aGUgdGl0bGUuICovXG4gICAgfVxuXG4gICAgdmFyIHRpdGxlSGFkSGllcmFyY2hpY2FsU2VwYXJhdG9ycyA9IGZhbHNlO1xuICAgIGZ1bmN0aW9uIHdvcmRDb3VudChzdHIpIHtcbiAgICAgIHJldHVybiBzdHIuc3BsaXQoL1xccysvKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHNlcGFyYXRvciBpbiB0aGUgdGl0bGUsIGZpcnN0IHJlbW92ZSB0aGUgZmluYWwgcGFydFxuICAgIGlmICgvIFtcXHxcXC1cXFxcXFwvPsK7XSAvLnRlc3QoY3VyVGl0bGUpKSB7XG4gICAgICB0aXRsZUhhZEhpZXJhcmNoaWNhbFNlcGFyYXRvcnMgPSAvIFtcXFxcXFwvPsK7XSAvLnRlc3QoY3VyVGl0bGUpO1xuICAgICAgbGV0IGFsbFNlcGFyYXRvcnMgPSBBcnJheS5mcm9tKG9yaWdUaXRsZS5tYXRjaEFsbCgvIFtcXHxcXC1cXFxcXFwvPsK7XSAvZ2kpKTtcbiAgICAgIGN1clRpdGxlID0gb3JpZ1RpdGxlLnN1YnN0cmluZygwLCBhbGxTZXBhcmF0b3JzLnBvcCgpLmluZGV4KTtcblxuICAgICAgLy8gSWYgdGhlIHJlc3VsdGluZyB0aXRsZSBpcyB0b28gc2hvcnQsIHJlbW92ZSB0aGUgZmlyc3QgcGFydCBpbnN0ZWFkOlxuICAgICAgaWYgKHdvcmRDb3VudChjdXJUaXRsZSkgPCAzKSB7XG4gICAgICAgIGN1clRpdGxlID0gb3JpZ1RpdGxlLnJlcGxhY2UoL15bXlxcfFxcLVxcXFxcXC8+wrtdKltcXHxcXC1cXFxcXFwvPsK7XS9naSwgXCJcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjdXJUaXRsZS5pbmNsdWRlcyhcIjogXCIpKSB7XG4gICAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGFuIGhlYWRpbmcgY29udGFpbmluZyB0aGlzIGV4YWN0IHN0cmluZywgc28gd2VcbiAgICAgIC8vIGNvdWxkIGFzc3VtZSBpdCdzIHRoZSBmdWxsIHRpdGxlLlxuICAgICAgdmFyIGhlYWRpbmdzID0gdGhpcy5fZ2V0QWxsTm9kZXNXaXRoVGFnKGRvYywgW1wiaDFcIiwgXCJoMlwiXSk7XG4gICAgICB2YXIgdHJpbW1lZFRpdGxlID0gY3VyVGl0bGUudHJpbSgpO1xuICAgICAgdmFyIG1hdGNoID0gdGhpcy5fc29tZU5vZGUoaGVhZGluZ3MsIGZ1bmN0aW9uIChoZWFkaW5nKSB7XG4gICAgICAgIHJldHVybiBoZWFkaW5nLnRleHRDb250ZW50LnRyaW0oKSA9PT0gdHJpbW1lZFRpdGxlO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIElmIHdlIGRvbid0LCBsZXQncyBleHRyYWN0IHRoZSB0aXRsZSBvdXQgb2YgdGhlIG9yaWdpbmFsIHRpdGxlIHN0cmluZy5cbiAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgY3VyVGl0bGUgPSBvcmlnVGl0bGUuc3Vic3RyaW5nKG9yaWdUaXRsZS5sYXN0SW5kZXhPZihcIjpcIikgKyAxKTtcblxuICAgICAgICAvLyBJZiB0aGUgdGl0bGUgaXMgbm93IHRvbyBzaG9ydCwgdHJ5IHRoZSBmaXJzdCBjb2xvbiBpbnN0ZWFkOlxuICAgICAgICBpZiAod29yZENvdW50KGN1clRpdGxlKSA8IDMpIHtcbiAgICAgICAgICBjdXJUaXRsZSA9IG9yaWdUaXRsZS5zdWJzdHJpbmcob3JpZ1RpdGxlLmluZGV4T2YoXCI6XCIpICsgMSk7XG4gICAgICAgICAgLy8gQnV0IGlmIHdlIGhhdmUgdG9vIG1hbnkgd29yZHMgYmVmb3JlIHRoZSBjb2xvbiB0aGVyZSdzIHNvbWV0aGluZyB3ZWlyZFxuICAgICAgICAgIC8vIHdpdGggdGhlIHRpdGxlcyBhbmQgdGhlIEggdGFncyBzbyBsZXQncyBqdXN0IHVzZSB0aGUgb3JpZ2luYWwgdGl0bGUgaW5zdGVhZFxuICAgICAgICB9IGVsc2UgaWYgKHdvcmRDb3VudChvcmlnVGl0bGUuc3Vic3RyKDAsIG9yaWdUaXRsZS5pbmRleE9mKFwiOlwiKSkpID4gNSkge1xuICAgICAgICAgIGN1clRpdGxlID0gb3JpZ1RpdGxlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjdXJUaXRsZS5sZW5ndGggPiAxNTAgfHwgY3VyVGl0bGUubGVuZ3RoIDwgMTUpIHtcbiAgICAgIHZhciBoT25lcyA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcImgxXCIpO1xuXG4gICAgICBpZiAoaE9uZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGN1clRpdGxlID0gdGhpcy5fZ2V0SW5uZXJUZXh0KGhPbmVzWzBdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjdXJUaXRsZSA9IGN1clRpdGxlLnRyaW0oKS5yZXBsYWNlKHRoaXMuUkVHRVhQUy5ub3JtYWxpemUsIFwiIFwiKTtcbiAgICAvLyBJZiB3ZSBub3cgaGF2ZSA0IHdvcmRzIG9yIGZld2VyIGFzIG91ciB0aXRsZSwgYW5kIGVpdGhlciBub1xuICAgIC8vICdoaWVyYXJjaGljYWwnIHNlcGFyYXRvcnMgKFxcLCAvLCA+IG9yIMK7KSB3ZXJlIGZvdW5kIGluIHRoZSBvcmlnaW5hbFxuICAgIC8vIHRpdGxlIG9yIHdlIGRlY3JlYXNlZCB0aGUgbnVtYmVyIG9mIHdvcmRzIGJ5IG1vcmUgdGhhbiAxIHdvcmQsIHVzZVxuICAgIC8vIHRoZSBvcmlnaW5hbCB0aXRsZS5cbiAgICB2YXIgY3VyVGl0bGVXb3JkQ291bnQgPSB3b3JkQ291bnQoY3VyVGl0bGUpO1xuICAgIGlmIChcbiAgICAgIGN1clRpdGxlV29yZENvdW50IDw9IDQgJiZcbiAgICAgICghdGl0bGVIYWRIaWVyYXJjaGljYWxTZXBhcmF0b3JzIHx8XG4gICAgICAgIGN1clRpdGxlV29yZENvdW50ICE9XG4gICAgICAgICAgd29yZENvdW50KG9yaWdUaXRsZS5yZXBsYWNlKC9bXFx8XFwtXFxcXFxcLz7Cu10rL2csIFwiXCIpKSAtIDEpXG4gICAgKSB7XG4gICAgICBjdXJUaXRsZSA9IG9yaWdUaXRsZTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3VyVGl0bGU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFByZXBhcmUgdGhlIEhUTUwgZG9jdW1lbnQgZm9yIHJlYWRhYmlsaXR5IHRvIHNjcmFwZSBpdC5cbiAgICogVGhpcyBpbmNsdWRlcyB0aGluZ3MgbGlrZSBzdHJpcHBpbmcgamF2YXNjcmlwdCwgQ1NTLCBhbmQgaGFuZGxpbmcgdGVycmlibGUgbWFya3VwLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICoqL1xuICBfcHJlcERvY3VtZW50KCkge1xuICAgIHZhciBkb2MgPSB0aGlzLl9kb2M7XG5cbiAgICAvLyBSZW1vdmUgYWxsIHN0eWxlIHRhZ3MgaW4gaGVhZFxuICAgIHRoaXMuX3JlbW92ZU5vZGVzKHRoaXMuX2dldEFsbE5vZGVzV2l0aFRhZyhkb2MsIFtcInN0eWxlXCJdKSk7XG5cbiAgICBpZiAoZG9jLmJvZHkpIHtcbiAgICAgIHRoaXMuX3JlcGxhY2VCcnMoZG9jLmJvZHkpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlcGxhY2VOb2RlVGFncyh0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcoZG9jLCBbXCJmb250XCJdKSwgXCJTUEFOXCIpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGaW5kcyB0aGUgbmV4dCBub2RlLCBzdGFydGluZyBmcm9tIHRoZSBnaXZlbiBub2RlLCBhbmQgaWdub3JpbmdcbiAgICogd2hpdGVzcGFjZSBpbiBiZXR3ZWVuLiBJZiB0aGUgZ2l2ZW4gbm9kZSBpcyBhbiBlbGVtZW50LCB0aGUgc2FtZSBub2RlIGlzXG4gICAqIHJldHVybmVkLlxuICAgKi9cbiAgX25leHROb2RlKG5vZGUpIHtcbiAgICB2YXIgbmV4dCA9IG5vZGU7XG4gICAgd2hpbGUgKFxuICAgICAgbmV4dCAmJlxuICAgICAgbmV4dC5ub2RlVHlwZSAhPSB0aGlzLkVMRU1FTlRfTk9ERSAmJlxuICAgICAgdGhpcy5SRUdFWFBTLndoaXRlc3BhY2UudGVzdChuZXh0LnRleHRDb250ZW50KVxuICAgICkge1xuICAgICAgbmV4dCA9IG5leHQubmV4dFNpYmxpbmc7XG4gICAgfVxuICAgIHJldHVybiBuZXh0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyAyIG9yIG1vcmUgc3VjY2Vzc2l2ZSA8YnI+IGVsZW1lbnRzIHdpdGggYSBzaW5nbGUgPHA+LlxuICAgKiBXaGl0ZXNwYWNlIGJldHdlZW4gPGJyPiBlbGVtZW50cyBhcmUgaWdub3JlZC4gRm9yIGV4YW1wbGU6XG4gICAqICAgPGRpdj5mb288YnI+YmFyPGJyPiA8YnI+PGJyPmFiYzwvZGl2PlxuICAgKiB3aWxsIGJlY29tZTpcbiAgICogICA8ZGl2PmZvbzxicj5iYXI8cD5hYmM8L3A+PC9kaXY+XG4gICAqL1xuICBfcmVwbGFjZUJycyhlbGVtKSB7XG4gICAgdGhpcy5fZm9yRWFjaE5vZGUodGhpcy5fZ2V0QWxsTm9kZXNXaXRoVGFnKGVsZW0sIFtcImJyXCJdKSwgZnVuY3Rpb24gKGJyKSB7XG4gICAgICB2YXIgbmV4dCA9IGJyLm5leHRTaWJsaW5nO1xuXG4gICAgICAvLyBXaGV0aGVyIDIgb3IgbW9yZSA8YnI+IGVsZW1lbnRzIGhhdmUgYmVlbiBmb3VuZCBhbmQgcmVwbGFjZWQgd2l0aCBhXG4gICAgICAvLyA8cD4gYmxvY2suXG4gICAgICB2YXIgcmVwbGFjZWQgPSBmYWxzZTtcblxuICAgICAgLy8gSWYgd2UgZmluZCBhIDxicj4gY2hhaW4sIHJlbW92ZSB0aGUgPGJyPnMgdW50aWwgd2UgaGl0IGFub3RoZXIgbm9kZVxuICAgICAgLy8gb3Igbm9uLXdoaXRlc3BhY2UuIFRoaXMgbGVhdmVzIGJlaGluZCB0aGUgZmlyc3QgPGJyPiBpbiB0aGUgY2hhaW5cbiAgICAgIC8vICh3aGljaCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggYSA8cD4gbGF0ZXIpLlxuICAgICAgd2hpbGUgKChuZXh0ID0gdGhpcy5fbmV4dE5vZGUobmV4dCkpICYmIG5leHQudGFnTmFtZSA9PSBcIkJSXCIpIHtcbiAgICAgICAgcmVwbGFjZWQgPSB0cnVlO1xuICAgICAgICB2YXIgYnJTaWJsaW5nID0gbmV4dC5uZXh0U2libGluZztcbiAgICAgICAgbmV4dC5yZW1vdmUoKTtcbiAgICAgICAgbmV4dCA9IGJyU2libGluZztcbiAgICAgIH1cblxuICAgICAgLy8gSWYgd2UgcmVtb3ZlZCBhIDxicj4gY2hhaW4sIHJlcGxhY2UgdGhlIHJlbWFpbmluZyA8YnI+IHdpdGggYSA8cD4uIEFkZFxuICAgICAgLy8gYWxsIHNpYmxpbmcgbm9kZXMgYXMgY2hpbGRyZW4gb2YgdGhlIDxwPiB1bnRpbCB3ZSBoaXQgYW5vdGhlciA8YnI+XG4gICAgICAvLyBjaGFpbi5cbiAgICAgIGlmIChyZXBsYWNlZCkge1xuICAgICAgICB2YXIgcCA9IHRoaXMuX2RvYy5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgYnIucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQocCwgYnIpO1xuXG4gICAgICAgIG5leHQgPSBwLm5leHRTaWJsaW5nO1xuICAgICAgICB3aGlsZSAobmV4dCkge1xuICAgICAgICAgIC8vIElmIHdlJ3ZlIGhpdCBhbm90aGVyIDxicj48YnI+LCB3ZSdyZSBkb25lIGFkZGluZyBjaGlsZHJlbiB0byB0aGlzIDxwPi5cbiAgICAgICAgICBpZiAobmV4dC50YWdOYW1lID09IFwiQlJcIikge1xuICAgICAgICAgICAgdmFyIG5leHRFbGVtID0gdGhpcy5fbmV4dE5vZGUobmV4dC5uZXh0U2libGluZyk7XG4gICAgICAgICAgICBpZiAobmV4dEVsZW0gJiYgbmV4dEVsZW0udGFnTmFtZSA9PSBcIkJSXCIpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCF0aGlzLl9pc1BocmFzaW5nQ29udGVudChuZXh0KSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gT3RoZXJ3aXNlLCBtYWtlIHRoaXMgbm9kZSBhIGNoaWxkIG9mIHRoZSBuZXcgPHA+LlxuICAgICAgICAgIHZhciBzaWJsaW5nID0gbmV4dC5uZXh0U2libGluZztcbiAgICAgICAgICBwLmFwcGVuZENoaWxkKG5leHQpO1xuICAgICAgICAgIG5leHQgPSBzaWJsaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKHAubGFzdENoaWxkICYmIHRoaXMuX2lzV2hpdGVzcGFjZShwLmxhc3RDaGlsZCkpIHtcbiAgICAgICAgICBwLmxhc3RDaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwLnBhcmVudE5vZGUudGFnTmFtZSA9PT0gXCJQXCIpIHtcbiAgICAgICAgICB0aGlzLl9zZXROb2RlVGFnKHAucGFyZW50Tm9kZSwgXCJESVZcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICBfc2V0Tm9kZVRhZyhub2RlLCB0YWcpIHtcbiAgICB0aGlzLmxvZyhcIl9zZXROb2RlVGFnXCIsIG5vZGUsIHRhZyk7XG4gICAgaWYgKHRoaXMuX2RvY0pTRE9NUGFyc2VyKSB7XG4gICAgICBub2RlLmxvY2FsTmFtZSA9IHRhZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgbm9kZS50YWdOYW1lID0gdGFnLnRvVXBwZXJDYXNlKCk7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICB2YXIgcmVwbGFjZW1lbnQgPSBub2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHJlcGxhY2VtZW50LmFwcGVuZENoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIG5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQocmVwbGFjZW1lbnQsIG5vZGUpO1xuICAgIGlmIChub2RlLnJlYWRhYmlsaXR5KSB7XG4gICAgICByZXBsYWNlbWVudC5yZWFkYWJpbGl0eSA9IG5vZGUucmVhZGFiaWxpdHk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlcGxhY2VtZW50LnNldEF0dHJpYnV0ZU5vZGUobm9kZS5hdHRyaWJ1dGVzW2ldLmNsb25lTm9kZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcGxhY2VtZW50O1xuICB9LFxuXG4gIC8qKlxuICAgKiBQcmVwYXJlIHRoZSBhcnRpY2xlIG5vZGUgZm9yIGRpc3BsYXkuIENsZWFuIG91dCBhbnkgaW5saW5lIHN0eWxlcyxcbiAgICogaWZyYW1lcywgZm9ybXMsIHN0cmlwIGV4dHJhbmVvdXMgPHA+IHRhZ3MsIGV0Yy5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHJldHVybiB2b2lkXG4gICAqKi9cbiAgX3ByZXBBcnRpY2xlKGFydGljbGVDb250ZW50KSB7XG4gICAgdGhpcy5fY2xlYW5TdHlsZXMoYXJ0aWNsZUNvbnRlbnQpO1xuXG4gICAgLy8gQ2hlY2sgZm9yIGRhdGEgdGFibGVzIGJlZm9yZSB3ZSBjb250aW51ZSwgdG8gYXZvaWQgcmVtb3ZpbmcgaXRlbXMgaW5cbiAgICAvLyB0aG9zZSB0YWJsZXMsIHdoaWNoIHdpbGwgb2Z0ZW4gYmUgaXNvbGF0ZWQgZXZlbiB0aG91Z2ggdGhleSdyZVxuICAgIC8vIHZpc3VhbGx5IGxpbmtlZCB0byBvdGhlciBjb250ZW50LWZ1bCBlbGVtZW50cyAodGV4dCwgaW1hZ2VzLCBldGMuKS5cbiAgICB0aGlzLl9tYXJrRGF0YVRhYmxlcyhhcnRpY2xlQ29udGVudCk7XG5cbiAgICB0aGlzLl9maXhMYXp5SW1hZ2VzKGFydGljbGVDb250ZW50KTtcblxuICAgIC8vIENsZWFuIG91dCBqdW5rIGZyb20gdGhlIGFydGljbGUgY29udGVudFxuICAgIHRoaXMuX2NsZWFuQ29uZGl0aW9uYWxseShhcnRpY2xlQ29udGVudCwgXCJmb3JtXCIpO1xuICAgIHRoaXMuX2NsZWFuQ29uZGl0aW9uYWxseShhcnRpY2xlQ29udGVudCwgXCJmaWVsZHNldFwiKTtcbiAgICB0aGlzLl9jbGVhbihhcnRpY2xlQ29udGVudCwgXCJvYmplY3RcIik7XG4gICAgdGhpcy5fY2xlYW4oYXJ0aWNsZUNvbnRlbnQsIFwiZW1iZWRcIik7XG4gICAgdGhpcy5fY2xlYW4oYXJ0aWNsZUNvbnRlbnQsIFwiZm9vdGVyXCIpO1xuICAgIHRoaXMuX2NsZWFuKGFydGljbGVDb250ZW50LCBcImxpbmtcIik7XG4gICAgdGhpcy5fY2xlYW4oYXJ0aWNsZUNvbnRlbnQsIFwiYXNpZGVcIik7XG5cbiAgICAvLyBDbGVhbiBvdXQgZWxlbWVudHMgd2l0aCBsaXR0bGUgY29udGVudCB0aGF0IGhhdmUgXCJzaGFyZVwiIGluIHRoZWlyIGlkL2NsYXNzIGNvbWJpbmF0aW9ucyBmcm9tIGZpbmFsIHRvcCBjYW5kaWRhdGVzLFxuICAgIC8vIHdoaWNoIG1lYW5zIHdlIGRvbid0IHJlbW92ZSB0aGUgdG9wIGNhbmRpZGF0ZXMgZXZlbiB0aGV5IGhhdmUgXCJzaGFyZVwiLlxuXG4gICAgdmFyIHNoYXJlRWxlbWVudFRocmVzaG9sZCA9IHRoaXMuREVGQVVMVF9DSEFSX1RIUkVTSE9MRDtcblxuICAgIHRoaXMuX2ZvckVhY2hOb2RlKGFydGljbGVDb250ZW50LmNoaWxkcmVuLCBmdW5jdGlvbiAodG9wQ2FuZGlkYXRlKSB7XG4gICAgICB0aGlzLl9jbGVhbk1hdGNoZWROb2Rlcyh0b3BDYW5kaWRhdGUsIGZ1bmN0aW9uIChub2RlLCBtYXRjaFN0cmluZykge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIHRoaXMuUkVHRVhQUy5zaGFyZUVsZW1lbnRzLnRlc3QobWF0Y2hTdHJpbmcpICYmXG4gICAgICAgICAgbm9kZS50ZXh0Q29udGVudC5sZW5ndGggPCBzaGFyZUVsZW1lbnRUaHJlc2hvbGRcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fY2xlYW4oYXJ0aWNsZUNvbnRlbnQsIFwiaWZyYW1lXCIpO1xuICAgIHRoaXMuX2NsZWFuKGFydGljbGVDb250ZW50LCBcImlucHV0XCIpO1xuICAgIHRoaXMuX2NsZWFuKGFydGljbGVDb250ZW50LCBcInRleHRhcmVhXCIpO1xuICAgIHRoaXMuX2NsZWFuKGFydGljbGVDb250ZW50LCBcInNlbGVjdFwiKTtcbiAgICB0aGlzLl9jbGVhbihhcnRpY2xlQ29udGVudCwgXCJidXR0b25cIik7XG4gICAgdGhpcy5fY2xlYW5IZWFkZXJzKGFydGljbGVDb250ZW50KTtcblxuICAgIC8vIERvIHRoZXNlIGxhc3QgYXMgdGhlIHByZXZpb3VzIHN0dWZmIG1heSBoYXZlIHJlbW92ZWQganVua1xuICAgIC8vIHRoYXQgd2lsbCBhZmZlY3QgdGhlc2VcbiAgICB0aGlzLl9jbGVhbkNvbmRpdGlvbmFsbHkoYXJ0aWNsZUNvbnRlbnQsIFwidGFibGVcIik7XG4gICAgdGhpcy5fY2xlYW5Db25kaXRpb25hbGx5KGFydGljbGVDb250ZW50LCBcInVsXCIpO1xuICAgIHRoaXMuX2NsZWFuQ29uZGl0aW9uYWxseShhcnRpY2xlQ29udGVudCwgXCJkaXZcIik7XG5cbiAgICAvLyByZXBsYWNlIEgxIHdpdGggSDIgYXMgSDEgc2hvdWxkIGJlIG9ubHkgdGl0bGUgdGhhdCBpcyBkaXNwbGF5ZWQgc2VwYXJhdGVseVxuICAgIHRoaXMuX3JlcGxhY2VOb2RlVGFncyhcbiAgICAgIHRoaXMuX2dldEFsbE5vZGVzV2l0aFRhZyhhcnRpY2xlQ29udGVudCwgW1wiaDFcIl0pLFxuICAgICAgXCJoMlwiXG4gICAgKTtcblxuICAgIC8vIFJlbW92ZSBleHRyYSBwYXJhZ3JhcGhzXG4gICAgdGhpcy5fcmVtb3ZlTm9kZXMoXG4gICAgICB0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcoYXJ0aWNsZUNvbnRlbnQsIFtcInBcIl0pLFxuICAgICAgZnVuY3Rpb24gKHBhcmFncmFwaCkge1xuICAgICAgICAvLyBBdCB0aGlzIHBvaW50LCBuYXN0eSBpZnJhbWVzIGhhdmUgYmVlbiByZW1vdmVkOyBvbmx5IGVtYmVkZGVkIHZpZGVvXG4gICAgICAgIC8vIG9uZXMgcmVtYWluLlxuICAgICAgICB2YXIgY29udGVudEVsZW1lbnRDb3VudCA9IHRoaXMuX2dldEFsbE5vZGVzV2l0aFRhZyhwYXJhZ3JhcGgsIFtcbiAgICAgICAgICBcImltZ1wiLFxuICAgICAgICAgIFwiZW1iZWRcIixcbiAgICAgICAgICBcIm9iamVjdFwiLFxuICAgICAgICAgIFwiaWZyYW1lXCIsXG4gICAgICAgIF0pLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBjb250ZW50RWxlbWVudENvdW50ID09PSAwICYmICF0aGlzLl9nZXRJbm5lclRleHQocGFyYWdyYXBoLCBmYWxzZSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgdGhpcy5fZm9yRWFjaE5vZGUoXG4gICAgICB0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcoYXJ0aWNsZUNvbnRlbnQsIFtcImJyXCJdKSxcbiAgICAgIGZ1bmN0aW9uIChicikge1xuICAgICAgICB2YXIgbmV4dCA9IHRoaXMuX25leHROb2RlKGJyLm5leHRTaWJsaW5nKTtcbiAgICAgICAgaWYgKG5leHQgJiYgbmV4dC50YWdOYW1lID09IFwiUFwiKSB7XG4gICAgICAgICAgYnIucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gUmVtb3ZlIHNpbmdsZS1jZWxsIHRhYmxlc1xuICAgIHRoaXMuX2ZvckVhY2hOb2RlKFxuICAgICAgdGhpcy5fZ2V0QWxsTm9kZXNXaXRoVGFnKGFydGljbGVDb250ZW50LCBbXCJ0YWJsZVwiXSksXG4gICAgICBmdW5jdGlvbiAodGFibGUpIHtcbiAgICAgICAgdmFyIHRib2R5ID0gdGhpcy5faGFzU2luZ2xlVGFnSW5zaWRlRWxlbWVudCh0YWJsZSwgXCJUQk9EWVwiKVxuICAgICAgICAgID8gdGFibGUuZmlyc3RFbGVtZW50Q2hpbGRcbiAgICAgICAgICA6IHRhYmxlO1xuICAgICAgICBpZiAodGhpcy5faGFzU2luZ2xlVGFnSW5zaWRlRWxlbWVudCh0Ym9keSwgXCJUUlwiKSkge1xuICAgICAgICAgIHZhciByb3cgPSB0Ym9keS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICBpZiAodGhpcy5faGFzU2luZ2xlVGFnSW5zaWRlRWxlbWVudChyb3csIFwiVERcIikpIHtcbiAgICAgICAgICAgIHZhciBjZWxsID0gcm93LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgY2VsbCA9IHRoaXMuX3NldE5vZGVUYWcoXG4gICAgICAgICAgICAgIGNlbGwsXG4gICAgICAgICAgICAgIHRoaXMuX2V2ZXJ5Tm9kZShjZWxsLmNoaWxkTm9kZXMsIHRoaXMuX2lzUGhyYXNpbmdDb250ZW50KVxuICAgICAgICAgICAgICAgID8gXCJQXCJcbiAgICAgICAgICAgICAgICA6IFwiRElWXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0YWJsZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjZWxsLCB0YWJsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfSxcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBhIG5vZGUgd2l0aCB0aGUgcmVhZGFiaWxpdHkgb2JqZWN0LiBBbHNvIGNoZWNrcyB0aGVcbiAgICogY2xhc3NOYW1lL2lkIGZvciBzcGVjaWFsIG5hbWVzIHRvIGFkZCB0byBpdHMgc2NvcmUuXG4gICAqXG4gICAqIEBwYXJhbSBFbGVtZW50XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKiovXG4gIF9pbml0aWFsaXplTm9kZShub2RlKSB7XG4gICAgbm9kZS5yZWFkYWJpbGl0eSA9IHsgY29udGVudFNjb3JlOiAwIH07XG5cbiAgICBzd2l0Y2ggKG5vZGUudGFnTmFtZSkge1xuICAgICAgY2FzZSBcIkRJVlwiOlxuICAgICAgICBub2RlLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZSArPSA1O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcIlBSRVwiOlxuICAgICAgY2FzZSBcIlREXCI6XG4gICAgICBjYXNlIFwiQkxPQ0tRVU9URVwiOlxuICAgICAgICBub2RlLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZSArPSAzO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcIkFERFJFU1NcIjpcbiAgICAgIGNhc2UgXCJPTFwiOlxuICAgICAgY2FzZSBcIlVMXCI6XG4gICAgICBjYXNlIFwiRExcIjpcbiAgICAgIGNhc2UgXCJERFwiOlxuICAgICAgY2FzZSBcIkRUXCI6XG4gICAgICBjYXNlIFwiTElcIjpcbiAgICAgIGNhc2UgXCJGT1JNXCI6XG4gICAgICAgIG5vZGUucmVhZGFiaWxpdHkuY29udGVudFNjb3JlIC09IDM7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwiSDFcIjpcbiAgICAgIGNhc2UgXCJIMlwiOlxuICAgICAgY2FzZSBcIkgzXCI6XG4gICAgICBjYXNlIFwiSDRcIjpcbiAgICAgIGNhc2UgXCJINVwiOlxuICAgICAgY2FzZSBcIkg2XCI6XG4gICAgICBjYXNlIFwiVEhcIjpcbiAgICAgICAgbm9kZS5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmUgLT0gNTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgbm9kZS5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmUgKz0gdGhpcy5fZ2V0Q2xhc3NXZWlnaHQobm9kZSk7XG4gIH0sXG5cbiAgX3JlbW92ZUFuZEdldE5leHQobm9kZSkge1xuICAgIHZhciBuZXh0Tm9kZSA9IHRoaXMuX2dldE5leHROb2RlKG5vZGUsIHRydWUpO1xuICAgIG5vZGUucmVtb3ZlKCk7XG4gICAgcmV0dXJuIG5leHROb2RlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBUcmF2ZXJzZSB0aGUgRE9NIGZyb20gbm9kZSB0byBub2RlLCBzdGFydGluZyBhdCB0aGUgbm9kZSBwYXNzZWQgaW4uXG4gICAqIFBhc3MgdHJ1ZSBmb3IgdGhlIHNlY29uZCBwYXJhbWV0ZXIgdG8gaW5kaWNhdGUgdGhpcyBub2RlIGl0c2VsZlxuICAgKiAoYW5kIGl0cyBraWRzKSBhcmUgZ29pbmcgYXdheSwgYW5kIHdlIHdhbnQgdGhlIG5leHQgbm9kZSBvdmVyLlxuICAgKlxuICAgKiBDYWxsaW5nIHRoaXMgaW4gYSBsb29wIHdpbGwgdHJhdmVyc2UgdGhlIERPTSBkZXB0aC1maXJzdC5cbiAgICpcbiAgICogQHBhcmFtIHtFbGVtZW50fSBub2RlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlU2VsZkFuZEtpZHNcbiAgICogQHJldHVybiB7RWxlbWVudH1cbiAgICovXG4gIF9nZXROZXh0Tm9kZShub2RlLCBpZ25vcmVTZWxmQW5kS2lkcykge1xuICAgIC8vIEZpcnN0IGNoZWNrIGZvciBraWRzIGlmIHRob3NlIGFyZW4ndCBiZWluZyBpZ25vcmVkXG4gICAgaWYgKCFpZ25vcmVTZWxmQW5kS2lkcyAmJiBub2RlLmZpcnN0RWxlbWVudENoaWxkKSB7XG4gICAgICByZXR1cm4gbm9kZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB9XG4gICAgLy8gVGhlbiBmb3Igc2libGluZ3MuLi5cbiAgICBpZiAobm9kZS5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgIHJldHVybiBub2RlLm5leHRFbGVtZW50U2libGluZztcbiAgICB9XG4gICAgLy8gQW5kIGZpbmFsbHksIG1vdmUgdXAgdGhlIHBhcmVudCBjaGFpbiAqYW5kKiBmaW5kIGEgc2libGluZ1xuICAgIC8vIChiZWNhdXNlIHRoaXMgaXMgZGVwdGgtZmlyc3QgdHJhdmVyc2FsLCB3ZSB3aWxsIGhhdmUgYWxyZWFkeVxuICAgIC8vIHNlZW4gdGhlIHBhcmVudCBub2RlcyB0aGVtc2VsdmVzKS5cbiAgICBkbyB7XG4gICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH0gd2hpbGUgKG5vZGUgJiYgIW5vZGUubmV4dEVsZW1lbnRTaWJsaW5nKTtcbiAgICByZXR1cm4gbm9kZSAmJiBub2RlLm5leHRFbGVtZW50U2libGluZztcbiAgfSxcblxuICAvLyBjb21wYXJlcyBzZWNvbmQgdGV4dCB0byBmaXJzdCBvbmVcbiAgLy8gMSA9IHNhbWUgdGV4dCwgMCA9IGNvbXBsZXRlbHkgZGlmZmVyZW50IHRleHRcbiAgLy8gd29ya3MgdGhlIHdheSB0aGF0IGl0IHNwbGl0cyBib3RoIHRleHRzIGludG8gd29yZHMgYW5kIHRoZW4gZmluZHMgd29yZHMgdGhhdCBhcmUgdW5pcXVlIGluIHNlY29uZCB0ZXh0XG4gIC8vIHRoZSByZXN1bHQgaXMgZ2l2ZW4gYnkgdGhlIGxvd2VyIGxlbmd0aCBvZiB1bmlxdWUgcGFydHNcbiAgX3RleHRTaW1pbGFyaXR5KHRleHRBLCB0ZXh0Qikge1xuICAgIHZhciB0b2tlbnNBID0gdGV4dEFcbiAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAuc3BsaXQodGhpcy5SRUdFWFBTLnRva2VuaXplKVxuICAgICAgLmZpbHRlcihCb29sZWFuKTtcbiAgICB2YXIgdG9rZW5zQiA9IHRleHRCXG4gICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgLnNwbGl0KHRoaXMuUkVHRVhQUy50b2tlbml6ZSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbik7XG4gICAgaWYgKCF0b2tlbnNBLmxlbmd0aCB8fCAhdG9rZW5zQi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICB2YXIgdW5pcVRva2Vuc0IgPSB0b2tlbnNCLmZpbHRlcih0b2tlbiA9PiAhdG9rZW5zQS5pbmNsdWRlcyh0b2tlbikpO1xuICAgIHZhciBkaXN0YW5jZUIgPSB1bmlxVG9rZW5zQi5qb2luKFwiIFwiKS5sZW5ndGggLyB0b2tlbnNCLmpvaW4oXCIgXCIpLmxlbmd0aDtcbiAgICByZXR1cm4gMSAtIGRpc3RhbmNlQjtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgYW4gZWxlbWVudCBub2RlIGNvbnRhaW5zIGEgdmFsaWQgYnlsaW5lXG4gICAqXG4gICAqIEBwYXJhbSBub2RlIHtFbGVtZW50fVxuICAgKiBAcGFyYW0gbWF0Y2hTdHJpbmcge3N0cmluZ31cbiAgICogQHJldHVybiBib29sZWFuXG4gICAqL1xuICBfaXNWYWxpZEJ5bGluZShub2RlLCBtYXRjaFN0cmluZykge1xuICAgIHZhciByZWwgPSBub2RlLmdldEF0dHJpYnV0ZShcInJlbFwiKTtcbiAgICB2YXIgaXRlbXByb3AgPSBub2RlLmdldEF0dHJpYnV0ZShcIml0ZW1wcm9wXCIpO1xuICAgIHZhciBieWxpbmVMZW5ndGggPSBub2RlLnRleHRDb250ZW50LnRyaW0oKS5sZW5ndGg7XG5cbiAgICByZXR1cm4gKFxuICAgICAgKHJlbCA9PT0gXCJhdXRob3JcIiB8fFxuICAgICAgICAoaXRlbXByb3AgJiYgaXRlbXByb3AuaW5jbHVkZXMoXCJhdXRob3JcIikpIHx8XG4gICAgICAgIHRoaXMuUkVHRVhQUy5ieWxpbmUudGVzdChtYXRjaFN0cmluZykpICYmXG4gICAgICAhIWJ5bGluZUxlbmd0aCAmJlxuICAgICAgYnlsaW5lTGVuZ3RoIDwgMTAwXG4gICAgKTtcbiAgfSxcblxuICBfZ2V0Tm9kZUFuY2VzdG9ycyhub2RlLCBtYXhEZXB0aCkge1xuICAgIG1heERlcHRoID0gbWF4RGVwdGggfHwgMDtcbiAgICB2YXIgaSA9IDAsXG4gICAgICBhbmNlc3RvcnMgPSBbXTtcbiAgICB3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBhbmNlc3RvcnMucHVzaChub2RlLnBhcmVudE5vZGUpO1xuICAgICAgaWYgKG1heERlcHRoICYmICsraSA9PT0gbWF4RGVwdGgpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gYW5jZXN0b3JzO1xuICB9LFxuXG4gIC8qKipcbiAgICogZ3JhYkFydGljbGUgLSBVc2luZyBhIHZhcmlldHkgb2YgbWV0cmljcyAoY29udGVudCBzY29yZSwgY2xhc3NuYW1lLCBlbGVtZW50IHR5cGVzKSwgZmluZCB0aGUgY29udGVudCB0aGF0IGlzXG4gICAqICAgICAgICAgbW9zdCBsaWtlbHkgdG8gYmUgdGhlIHN0dWZmIGEgdXNlciB3YW50cyB0byByZWFkLiBUaGVuIHJldHVybiBpdCB3cmFwcGVkIHVwIGluIGEgZGl2LlxuICAgKlxuICAgKiBAcGFyYW0gcGFnZSBhIGRvY3VtZW50IHRvIHJ1biB1cG9uLiBOZWVkcyB0byBiZSBhIGZ1bGwgZG9jdW1lbnQsIGNvbXBsZXRlIHdpdGggYm9keS5cbiAgICogQHJldHVybiBFbGVtZW50XG4gICAqKi9cbiAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHkgKi9cbiAgX2dyYWJBcnRpY2xlKHBhZ2UpIHtcbiAgICB0aGlzLmxvZyhcIioqKiogZ3JhYkFydGljbGUgKioqKlwiKTtcbiAgICB2YXIgZG9jID0gdGhpcy5fZG9jO1xuICAgIHZhciBpc1BhZ2luZyA9IHBhZ2UgIT09IG51bGw7XG4gICAgcGFnZSA9IHBhZ2UgPyBwYWdlIDogdGhpcy5fZG9jLmJvZHk7XG5cbiAgICAvLyBXZSBjYW4ndCBncmFiIGFuIGFydGljbGUgaWYgd2UgZG9uJ3QgaGF2ZSBhIHBhZ2UhXG4gICAgaWYgKCFwYWdlKSB7XG4gICAgICB0aGlzLmxvZyhcIk5vIGJvZHkgZm91bmQgaW4gZG9jdW1lbnQuIEFib3J0LlwiKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBwYWdlQ2FjaGVIdG1sID0gcGFnZS5pbm5lckhUTUw7XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgdGhpcy5sb2coXCJTdGFydGluZyBncmFiQXJ0aWNsZSBsb29wXCIpO1xuICAgICAgdmFyIHN0cmlwVW5saWtlbHlDYW5kaWRhdGVzID0gdGhpcy5fZmxhZ0lzQWN0aXZlKFxuICAgICAgICB0aGlzLkZMQUdfU1RSSVBfVU5MSUtFTFlTXG4gICAgICApO1xuXG4gICAgICAvLyBGaXJzdCwgbm9kZSBwcmVwcGluZy4gVHJhc2ggbm9kZXMgdGhhdCBsb29rIGNydWRkeSAobGlrZSBvbmVzIHdpdGggdGhlXG4gICAgICAvLyBjbGFzcyBuYW1lIFwiY29tbWVudFwiLCBldGMpLCBhbmQgdHVybiBkaXZzIGludG8gUCB0YWdzIHdoZXJlIHRoZXkgaGF2ZSBiZWVuXG4gICAgICAvLyB1c2VkIGluYXBwcm9wcmlhdGVseSAoYXMgaW4sIHdoZXJlIHRoZXkgY29udGFpbiBubyBvdGhlciBibG9jayBsZXZlbCBlbGVtZW50cy4pXG4gICAgICB2YXIgZWxlbWVudHNUb1Njb3JlID0gW107XG4gICAgICB2YXIgbm9kZSA9IHRoaXMuX2RvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICAgIGxldCBzaG91bGRSZW1vdmVUaXRsZUhlYWRlciA9IHRydWU7XG5cbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGlmIChub2RlLnRhZ05hbWUgPT09IFwiSFRNTFwiKSB7XG4gICAgICAgICAgdGhpcy5fYXJ0aWNsZUxhbmcgPSBub2RlLmdldEF0dHJpYnV0ZShcImxhbmdcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWF0Y2hTdHJpbmcgPSBub2RlLmNsYXNzTmFtZSArIFwiIFwiICsgbm9kZS5pZDtcblxuICAgICAgICBpZiAoIXRoaXMuX2lzUHJvYmFibHlWaXNpYmxlKG5vZGUpKSB7XG4gICAgICAgICAgdGhpcy5sb2coXCJSZW1vdmluZyBoaWRkZW4gbm9kZSAtIFwiICsgbWF0Y2hTdHJpbmcpO1xuICAgICAgICAgIG5vZGUgPSB0aGlzLl9yZW1vdmVBbmRHZXROZXh0KG5vZGUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXNlciBpcyBub3QgYWJsZSB0byBzZWUgZWxlbWVudHMgYXBwbGllZCB3aXRoIGJvdGggXCJhcmlhLW1vZGFsID0gdHJ1ZVwiIGFuZCBcInJvbGUgPSBkaWFsb2dcIlxuICAgICAgICBpZiAoXG4gICAgICAgICAgbm9kZS5nZXRBdHRyaWJ1dGUoXCJhcmlhLW1vZGFsXCIpID09IFwidHJ1ZVwiICYmXG4gICAgICAgICAgbm9kZS5nZXRBdHRyaWJ1dGUoXCJyb2xlXCIpID09IFwiZGlhbG9nXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgbm9kZSA9IHRoaXMuX3JlbW92ZUFuZEdldE5leHQobm9kZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIGEgYnlsaW5lIHlldCBjaGVjayB0byBzZWUgaWYgdGhpcyBub2RlIGlzIGEgYnlsaW5lOyBpZiBpdCBpcyBzdG9yZSB0aGUgYnlsaW5lIGFuZCByZW1vdmUgdGhlIG5vZGUuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAhdGhpcy5fYXJ0aWNsZUJ5bGluZSAmJlxuICAgICAgICAgICF0aGlzLl9tZXRhZGF0YS5ieWxpbmUgJiZcbiAgICAgICAgICB0aGlzLl9pc1ZhbGlkQnlsaW5lKG5vZGUsIG1hdGNoU3RyaW5nKVxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBGaW5kIGNoaWxkIG5vZGUgbWF0Y2hpbmcgW2l0ZW1wcm9wPVwibmFtZVwiXSBhbmQgdXNlIHRoYXQgaWYgaXQgZXhpc3RzIGZvciBhIG1vcmUgYWNjdXJhdGUgYXV0aG9yIG5hbWUgYnlsaW5lXG4gICAgICAgICAgdmFyIGVuZE9mU2VhcmNoTWFya2VyTm9kZSA9IHRoaXMuX2dldE5leHROb2RlKG5vZGUsIHRydWUpO1xuICAgICAgICAgIHZhciBuZXh0ID0gdGhpcy5fZ2V0TmV4dE5vZGUobm9kZSk7XG4gICAgICAgICAgdmFyIGl0ZW1Qcm9wTmFtZU5vZGUgPSBudWxsO1xuICAgICAgICAgIHdoaWxlIChuZXh0ICYmIG5leHQgIT0gZW5kT2ZTZWFyY2hNYXJrZXJOb2RlKSB7XG4gICAgICAgICAgICB2YXIgaXRlbXByb3AgPSBuZXh0LmdldEF0dHJpYnV0ZShcIml0ZW1wcm9wXCIpO1xuICAgICAgICAgICAgaWYgKGl0ZW1wcm9wICYmIGl0ZW1wcm9wLmluY2x1ZGVzKFwibmFtZVwiKSkge1xuICAgICAgICAgICAgICBpdGVtUHJvcE5hbWVOb2RlID0gbmV4dDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXh0ID0gdGhpcy5fZ2V0TmV4dE5vZGUobmV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2FydGljbGVCeWxpbmUgPSAoaXRlbVByb3BOYW1lTm9kZSA/PyBub2RlKS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICAgICAgbm9kZSA9IHRoaXMuX3JlbW92ZUFuZEdldE5leHQobm9kZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hvdWxkUmVtb3ZlVGl0bGVIZWFkZXIgJiYgdGhpcy5faGVhZGVyRHVwbGljYXRlc1RpdGxlKG5vZGUpKSB7XG4gICAgICAgICAgdGhpcy5sb2coXG4gICAgICAgICAgICBcIlJlbW92aW5nIGhlYWRlcjogXCIsXG4gICAgICAgICAgICBub2RlLnRleHRDb250ZW50LnRyaW0oKSxcbiAgICAgICAgICAgIHRoaXMuX2FydGljbGVUaXRsZS50cmltKClcbiAgICAgICAgICApO1xuICAgICAgICAgIHNob3VsZFJlbW92ZVRpdGxlSGVhZGVyID0gZmFsc2U7XG4gICAgICAgICAgbm9kZSA9IHRoaXMuX3JlbW92ZUFuZEdldE5leHQobm9kZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgdW5saWtlbHkgY2FuZGlkYXRlc1xuICAgICAgICBpZiAoc3RyaXBVbmxpa2VseUNhbmRpZGF0ZXMpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLlJFR0VYUFMudW5saWtlbHlDYW5kaWRhdGVzLnRlc3QobWF0Y2hTdHJpbmcpICYmXG4gICAgICAgICAgICAhdGhpcy5SRUdFWFBTLm9rTWF5YmVJdHNBQ2FuZGlkYXRlLnRlc3QobWF0Y2hTdHJpbmcpICYmXG4gICAgICAgICAgICAhdGhpcy5faGFzQW5jZXN0b3JUYWcobm9kZSwgXCJ0YWJsZVwiKSAmJlxuICAgICAgICAgICAgIXRoaXMuX2hhc0FuY2VzdG9yVGFnKG5vZGUsIFwiY29kZVwiKSAmJlxuICAgICAgICAgICAgbm9kZS50YWdOYW1lICE9PSBcIkJPRFlcIiAmJlxuICAgICAgICAgICAgbm9kZS50YWdOYW1lICE9PSBcIkFcIlxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5sb2coXCJSZW1vdmluZyB1bmxpa2VseSBjYW5kaWRhdGUgLSBcIiArIG1hdGNoU3RyaW5nKTtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLl9yZW1vdmVBbmRHZXROZXh0KG5vZGUpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuVU5MSUtFTFlfUk9MRVMuaW5jbHVkZXMobm9kZS5nZXRBdHRyaWJ1dGUoXCJyb2xlXCIpKSkge1xuICAgICAgICAgICAgdGhpcy5sb2coXG4gICAgICAgICAgICAgIFwiUmVtb3ZpbmcgY29udGVudCB3aXRoIHJvbGUgXCIgK1xuICAgICAgICAgICAgICAgIG5vZGUuZ2V0QXR0cmlidXRlKFwicm9sZVwiKSArXG4gICAgICAgICAgICAgICAgXCIgLSBcIiArXG4gICAgICAgICAgICAgICAgbWF0Y2hTdHJpbmdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5fcmVtb3ZlQW5kR2V0TmV4dChub2RlKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlbW92ZSBESVYsIFNFQ1RJT04sIGFuZCBIRUFERVIgbm9kZXMgd2l0aG91dCBhbnkgY29udGVudChlLmcuIHRleHQsIGltYWdlLCB2aWRlbywgb3IgaWZyYW1lKS5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIChub2RlLnRhZ05hbWUgPT09IFwiRElWXCIgfHxcbiAgICAgICAgICAgIG5vZGUudGFnTmFtZSA9PT0gXCJTRUNUSU9OXCIgfHxcbiAgICAgICAgICAgIG5vZGUudGFnTmFtZSA9PT0gXCJIRUFERVJcIiB8fFxuICAgICAgICAgICAgbm9kZS50YWdOYW1lID09PSBcIkgxXCIgfHxcbiAgICAgICAgICAgIG5vZGUudGFnTmFtZSA9PT0gXCJIMlwiIHx8XG4gICAgICAgICAgICBub2RlLnRhZ05hbWUgPT09IFwiSDNcIiB8fFxuICAgICAgICAgICAgbm9kZS50YWdOYW1lID09PSBcIkg0XCIgfHxcbiAgICAgICAgICAgIG5vZGUudGFnTmFtZSA9PT0gXCJINVwiIHx8XG4gICAgICAgICAgICBub2RlLnRhZ05hbWUgPT09IFwiSDZcIikgJiZcbiAgICAgICAgICB0aGlzLl9pc0VsZW1lbnRXaXRob3V0Q29udGVudChub2RlKVxuICAgICAgICApIHtcbiAgICAgICAgICBub2RlID0gdGhpcy5fcmVtb3ZlQW5kR2V0TmV4dChub2RlKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLkRFRkFVTFRfVEFHU19UT19TQ09SRS5pbmNsdWRlcyhub2RlLnRhZ05hbWUpKSB7XG4gICAgICAgICAgZWxlbWVudHNUb1Njb3JlLnB1c2gobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUdXJuIGFsbCBkaXZzIHRoYXQgZG9uJ3QgaGF2ZSBjaGlsZHJlbiBibG9jayBsZXZlbCBlbGVtZW50cyBpbnRvIHAnc1xuICAgICAgICBpZiAobm9kZS50YWdOYW1lID09PSBcIkRJVlwiKSB7XG4gICAgICAgICAgLy8gUHV0IHBocmFzaW5nIGNvbnRlbnQgaW50byBwYXJhZ3JhcGhzLlxuICAgICAgICAgIHZhciBwID0gbnVsbDtcbiAgICAgICAgICB2YXIgY2hpbGROb2RlID0gbm9kZS5maXJzdENoaWxkO1xuICAgICAgICAgIHdoaWxlIChjaGlsZE5vZGUpIHtcbiAgICAgICAgICAgIHZhciBuZXh0U2libGluZyA9IGNoaWxkTm9kZS5uZXh0U2libGluZztcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc1BocmFzaW5nQ29udGVudChjaGlsZE5vZGUpKSB7XG4gICAgICAgICAgICAgIGlmIChwICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcC5hcHBlbmRDaGlsZChjaGlsZE5vZGUpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc1doaXRlc3BhY2UoY2hpbGROb2RlKSkge1xuICAgICAgICAgICAgICAgIHAgPSBkb2MuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICAgICAgbm9kZS5yZXBsYWNlQ2hpbGQocCwgY2hpbGROb2RlKTtcbiAgICAgICAgICAgICAgICBwLmFwcGVuZENoaWxkKGNoaWxkTm9kZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICB3aGlsZSAocC5sYXN0Q2hpbGQgJiYgdGhpcy5faXNXaGl0ZXNwYWNlKHAubGFzdENoaWxkKSkge1xuICAgICAgICAgICAgICAgIHAubGFzdENoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHAgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hpbGROb2RlID0gbmV4dFNpYmxpbmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gU2l0ZXMgbGlrZSBodHRwOi8vbW9iaWxlLnNsYXRlLmNvbSBlbmNsb3NlcyBlYWNoIHBhcmFncmFwaCB3aXRoIGEgRElWXG4gICAgICAgICAgLy8gZWxlbWVudC4gRElWcyB3aXRoIG9ubHkgYSBQIGVsZW1lbnQgaW5zaWRlIGFuZCBubyB0ZXh0IGNvbnRlbnQgY2FuIGJlXG4gICAgICAgICAgLy8gc2FmZWx5IGNvbnZlcnRlZCBpbnRvIHBsYWluIFAgZWxlbWVudHMgdG8gYXZvaWQgY29uZnVzaW5nIHRoZSBzY29yaW5nXG4gICAgICAgICAgLy8gYWxnb3JpdGhtIHdpdGggRElWcyB3aXRoIGFyZSwgaW4gcHJhY3RpY2UsIHBhcmFncmFwaHMuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5faGFzU2luZ2xlVGFnSW5zaWRlRWxlbWVudChub2RlLCBcIlBcIikgJiZcbiAgICAgICAgICAgIHRoaXMuX2dldExpbmtEZW5zaXR5KG5vZGUpIDwgMC4yNVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdmFyIG5ld05vZGUgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdOb2RlLCBub2RlKTtcbiAgICAgICAgICAgIG5vZGUgPSBuZXdOb2RlO1xuICAgICAgICAgICAgZWxlbWVudHNUb1Njb3JlLnB1c2gobm9kZSk7XG4gICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5faGFzQ2hpbGRCbG9ja0VsZW1lbnQobm9kZSkpIHtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLl9zZXROb2RlVGFnKG5vZGUsIFwiUFwiKTtcbiAgICAgICAgICAgIGVsZW1lbnRzVG9TY29yZS5wdXNoKG5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBub2RlID0gdGhpcy5fZ2V0TmV4dE5vZGUobm9kZSk7XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogTG9vcCB0aHJvdWdoIGFsbCBwYXJhZ3JhcGhzLCBhbmQgYXNzaWduIGEgc2NvcmUgdG8gdGhlbSBiYXNlZCBvbiBob3cgY29udGVudC15IHRoZXkgbG9vay5cbiAgICAgICAqIFRoZW4gYWRkIHRoZWlyIHNjb3JlIHRvIHRoZWlyIHBhcmVudCBub2RlLlxuICAgICAgICpcbiAgICAgICAqIEEgc2NvcmUgaXMgZGV0ZXJtaW5lZCBieSB0aGluZ3MgbGlrZSBudW1iZXIgb2YgY29tbWFzLCBjbGFzcyBuYW1lcywgZXRjLiBNYXliZSBldmVudHVhbGx5IGxpbmsgZGVuc2l0eS5cbiAgICAgICAqKi9cbiAgICAgIHZhciBjYW5kaWRhdGVzID0gW107XG4gICAgICB0aGlzLl9mb3JFYWNoTm9kZShlbGVtZW50c1RvU2NvcmUsIGZ1bmN0aW9uIChlbGVtZW50VG9TY29yZSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWVsZW1lbnRUb1Njb3JlLnBhcmVudE5vZGUgfHxcbiAgICAgICAgICB0eXBlb2YgZWxlbWVudFRvU2NvcmUucGFyZW50Tm9kZS50YWdOYW1lID09PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoaXMgcGFyYWdyYXBoIGlzIGxlc3MgdGhhbiAyNSBjaGFyYWN0ZXJzLCBkb24ndCBldmVuIGNvdW50IGl0LlxuICAgICAgICB2YXIgaW5uZXJUZXh0ID0gdGhpcy5fZ2V0SW5uZXJUZXh0KGVsZW1lbnRUb1Njb3JlKTtcbiAgICAgICAgaWYgKGlubmVyVGV4dC5sZW5ndGggPCAyNSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEV4Y2x1ZGUgbm9kZXMgd2l0aCBubyBhbmNlc3Rvci5cbiAgICAgICAgdmFyIGFuY2VzdG9ycyA9IHRoaXMuX2dldE5vZGVBbmNlc3RvcnMoZWxlbWVudFRvU2NvcmUsIDUpO1xuICAgICAgICBpZiAoYW5jZXN0b3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb250ZW50U2NvcmUgPSAwO1xuXG4gICAgICAgIC8vIEFkZCBhIHBvaW50IGZvciB0aGUgcGFyYWdyYXBoIGl0c2VsZiBhcyBhIGJhc2UuXG4gICAgICAgIGNvbnRlbnRTY29yZSArPSAxO1xuXG4gICAgICAgIC8vIEFkZCBwb2ludHMgZm9yIGFueSBjb21tYXMgd2l0aGluIHRoaXMgcGFyYWdyYXBoLlxuICAgICAgICBjb250ZW50U2NvcmUgKz0gaW5uZXJUZXh0LnNwbGl0KHRoaXMuUkVHRVhQUy5jb21tYXMpLmxlbmd0aDtcblxuICAgICAgICAvLyBGb3IgZXZlcnkgMTAwIGNoYXJhY3RlcnMgaW4gdGhpcyBwYXJhZ3JhcGgsIGFkZCBhbm90aGVyIHBvaW50LiBVcCB0byAzIHBvaW50cy5cbiAgICAgICAgY29udGVudFNjb3JlICs9IE1hdGgubWluKE1hdGguZmxvb3IoaW5uZXJUZXh0Lmxlbmd0aCAvIDEwMCksIDMpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgYW5kIHNjb3JlIGFuY2VzdG9ycy5cbiAgICAgICAgdGhpcy5fZm9yRWFjaE5vZGUoYW5jZXN0b3JzLCBmdW5jdGlvbiAoYW5jZXN0b3IsIGxldmVsKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIWFuY2VzdG9yLnRhZ05hbWUgfHxcbiAgICAgICAgICAgICFhbmNlc3Rvci5wYXJlbnROb2RlIHx8XG4gICAgICAgICAgICB0eXBlb2YgYW5jZXN0b3IucGFyZW50Tm9kZS50YWdOYW1lID09PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBhbmNlc3Rvci5yZWFkYWJpbGl0eSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZU5vZGUoYW5jZXN0b3IpO1xuICAgICAgICAgICAgY2FuZGlkYXRlcy5wdXNoKGFuY2VzdG9yKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBOb2RlIHNjb3JlIGRpdmlkZXI6XG4gICAgICAgICAgLy8gLSBwYXJlbnQ6ICAgICAgICAgICAgIDEgKG5vIGRpdmlzaW9uKVxuICAgICAgICAgIC8vIC0gZ3JhbmRwYXJlbnQ6ICAgICAgICAyXG4gICAgICAgICAgLy8gLSBncmVhdCBncmFuZHBhcmVudCs6IGFuY2VzdG9yIGxldmVsICogM1xuICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgdmFyIHNjb3JlRGl2aWRlciA9IDE7XG4gICAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgc2NvcmVEaXZpZGVyID0gMjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NvcmVEaXZpZGVyID0gbGV2ZWwgKiAzO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhbmNlc3Rvci5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmUgKz0gY29udGVudFNjb3JlIC8gc2NvcmVEaXZpZGVyO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBBZnRlciB3ZSd2ZSBjYWxjdWxhdGVkIHNjb3JlcywgbG9vcCB0aHJvdWdoIGFsbCBvZiB0aGUgcG9zc2libGVcbiAgICAgIC8vIGNhbmRpZGF0ZSBub2RlcyB3ZSBmb3VuZCBhbmQgZmluZCB0aGUgb25lIHdpdGggdGhlIGhpZ2hlc3Qgc2NvcmUuXG4gICAgICB2YXIgdG9wQ2FuZGlkYXRlcyA9IFtdO1xuICAgICAgZm9yICh2YXIgYyA9IDAsIGNsID0gY2FuZGlkYXRlcy5sZW5ndGg7IGMgPCBjbDsgYyArPSAxKSB7XG4gICAgICAgIHZhciBjYW5kaWRhdGUgPSBjYW5kaWRhdGVzW2NdO1xuXG4gICAgICAgIC8vIFNjYWxlIHRoZSBmaW5hbCBjYW5kaWRhdGVzIHNjb3JlIGJhc2VkIG9uIGxpbmsgZGVuc2l0eS4gR29vZCBjb250ZW50XG4gICAgICAgIC8vIHNob3VsZCBoYXZlIGEgcmVsYXRpdmVseSBzbWFsbCBsaW5rIGRlbnNpdHkgKDUlIG9yIGxlc3MpIGFuZCBiZSBtb3N0bHlcbiAgICAgICAgLy8gdW5hZmZlY3RlZCBieSB0aGlzIG9wZXJhdGlvbi5cbiAgICAgICAgdmFyIGNhbmRpZGF0ZVNjb3JlID1cbiAgICAgICAgICBjYW5kaWRhdGUucmVhZGFiaWxpdHkuY29udGVudFNjb3JlICpcbiAgICAgICAgICAoMSAtIHRoaXMuX2dldExpbmtEZW5zaXR5KGNhbmRpZGF0ZSkpO1xuICAgICAgICBjYW5kaWRhdGUucmVhZGFiaWxpdHkuY29udGVudFNjb3JlID0gY2FuZGlkYXRlU2NvcmU7XG5cbiAgICAgICAgdGhpcy5sb2coXCJDYW5kaWRhdGU6XCIsIGNhbmRpZGF0ZSwgXCJ3aXRoIHNjb3JlIFwiICsgY2FuZGlkYXRlU2NvcmUpO1xuXG4gICAgICAgIGZvciAodmFyIHQgPSAwOyB0IDwgdGhpcy5fbmJUb3BDYW5kaWRhdGVzOyB0KyspIHtcbiAgICAgICAgICB2YXIgYVRvcENhbmRpZGF0ZSA9IHRvcENhbmRpZGF0ZXNbdF07XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhYVRvcENhbmRpZGF0ZSB8fFxuICAgICAgICAgICAgY2FuZGlkYXRlU2NvcmUgPiBhVG9wQ2FuZGlkYXRlLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdG9wQ2FuZGlkYXRlcy5zcGxpY2UodCwgMCwgY2FuZGlkYXRlKTtcbiAgICAgICAgICAgIGlmICh0b3BDYW5kaWRhdGVzLmxlbmd0aCA+IHRoaXMuX25iVG9wQ2FuZGlkYXRlcykge1xuICAgICAgICAgICAgICB0b3BDYW5kaWRhdGVzLnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB0b3BDYW5kaWRhdGUgPSB0b3BDYW5kaWRhdGVzWzBdIHx8IG51bGw7XG4gICAgICB2YXIgbmVlZGVkVG9DcmVhdGVUb3BDYW5kaWRhdGUgPSBmYWxzZTtcbiAgICAgIHZhciBwYXJlbnRPZlRvcENhbmRpZGF0ZTtcblxuICAgICAgLy8gSWYgd2Ugc3RpbGwgaGF2ZSBubyB0b3AgY2FuZGlkYXRlLCBqdXN0IHVzZSB0aGUgYm9keSBhcyBhIGxhc3QgcmVzb3J0LlxuICAgICAgLy8gV2UgYWxzbyBoYXZlIHRvIGNvcHkgdGhlIGJvZHkgbm9kZSBzbyBpdCBpcyBzb21ldGhpbmcgd2UgY2FuIG1vZGlmeS5cbiAgICAgIGlmICh0b3BDYW5kaWRhdGUgPT09IG51bGwgfHwgdG9wQ2FuZGlkYXRlLnRhZ05hbWUgPT09IFwiQk9EWVwiKSB7XG4gICAgICAgIC8vIE1vdmUgYWxsIG9mIHRoZSBwYWdlJ3MgY2hpbGRyZW4gaW50byB0b3BDYW5kaWRhdGVcbiAgICAgICAgdG9wQ2FuZGlkYXRlID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICAgIG5lZWRlZFRvQ3JlYXRlVG9wQ2FuZGlkYXRlID0gdHJ1ZTtcbiAgICAgICAgLy8gTW92ZSBldmVyeXRoaW5nIChub3QganVzdCBlbGVtZW50cywgYWxzbyB0ZXh0IG5vZGVzIGV0Yy4pIGludG8gdGhlIGNvbnRhaW5lclxuICAgICAgICAvLyBzbyB3ZSBldmVuIGluY2x1ZGUgdGV4dCBkaXJlY3RseSBpbiB0aGUgYm9keTpcbiAgICAgICAgd2hpbGUgKHBhZ2UuZmlyc3RDaGlsZCkge1xuICAgICAgICAgIHRoaXMubG9nKFwiTW92aW5nIGNoaWxkIG91dDpcIiwgcGFnZS5maXJzdENoaWxkKTtcbiAgICAgICAgICB0b3BDYW5kaWRhdGUuYXBwZW5kQ2hpbGQocGFnZS5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQodG9wQ2FuZGlkYXRlKTtcblxuICAgICAgICB0aGlzLl9pbml0aWFsaXplTm9kZSh0b3BDYW5kaWRhdGUpO1xuICAgICAgfSBlbHNlIGlmICh0b3BDYW5kaWRhdGUpIHtcbiAgICAgICAgLy8gRmluZCBhIGJldHRlciB0b3AgY2FuZGlkYXRlIG5vZGUgaWYgaXQgY29udGFpbnMgKGF0IGxlYXN0IHRocmVlKSBub2RlcyB3aGljaCBiZWxvbmcgdG8gYHRvcENhbmRpZGF0ZXNgIGFycmF5XG4gICAgICAgIC8vIGFuZCB3aG9zZSBzY29yZXMgYXJlIHF1aXRlIGNsb3NlZCB3aXRoIGN1cnJlbnQgYHRvcENhbmRpZGF0ZWAgbm9kZS5cbiAgICAgICAgdmFyIGFsdGVybmF0aXZlQ2FuZGlkYXRlQW5jZXN0b3JzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgdG9wQ2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRvcENhbmRpZGF0ZXNbaV0ucmVhZGFiaWxpdHkuY29udGVudFNjb3JlIC9cbiAgICAgICAgICAgICAgdG9wQ2FuZGlkYXRlLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZSA+PVxuICAgICAgICAgICAgMC43NVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgYWx0ZXJuYXRpdmVDYW5kaWRhdGVBbmNlc3RvcnMucHVzaChcbiAgICAgICAgICAgICAgdGhpcy5fZ2V0Tm9kZUFuY2VzdG9ycyh0b3BDYW5kaWRhdGVzW2ldKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIE1JTklNVU1fVE9QQ0FORElEQVRFUyA9IDM7XG4gICAgICAgIGlmIChhbHRlcm5hdGl2ZUNhbmRpZGF0ZUFuY2VzdG9ycy5sZW5ndGggPj0gTUlOSU1VTV9UT1BDQU5ESURBVEVTKSB7XG4gICAgICAgICAgcGFyZW50T2ZUb3BDYW5kaWRhdGUgPSB0b3BDYW5kaWRhdGUucGFyZW50Tm9kZTtcbiAgICAgICAgICB3aGlsZSAocGFyZW50T2ZUb3BDYW5kaWRhdGUudGFnTmFtZSAhPT0gXCJCT0RZXCIpIHtcbiAgICAgICAgICAgIHZhciBsaXN0c0NvbnRhaW5pbmdUaGlzQW5jZXN0b3IgPSAwO1xuICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgdmFyIGFuY2VzdG9ySW5kZXggPSAwO1xuICAgICAgICAgICAgICBhbmNlc3RvckluZGV4IDwgYWx0ZXJuYXRpdmVDYW5kaWRhdGVBbmNlc3RvcnMubGVuZ3RoICYmXG4gICAgICAgICAgICAgIGxpc3RzQ29udGFpbmluZ1RoaXNBbmNlc3RvciA8IE1JTklNVU1fVE9QQ0FORElEQVRFUztcbiAgICAgICAgICAgICAgYW5jZXN0b3JJbmRleCsrXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgbGlzdHNDb250YWluaW5nVGhpc0FuY2VzdG9yICs9IE51bWJlcihcbiAgICAgICAgICAgICAgICBhbHRlcm5hdGl2ZUNhbmRpZGF0ZUFuY2VzdG9yc1thbmNlc3RvckluZGV4XS5pbmNsdWRlcyhcbiAgICAgICAgICAgICAgICAgIHBhcmVudE9mVG9wQ2FuZGlkYXRlXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpc3RzQ29udGFpbmluZ1RoaXNBbmNlc3RvciA+PSBNSU5JTVVNX1RPUENBTkRJREFURVMpIHtcbiAgICAgICAgICAgICAgdG9wQ2FuZGlkYXRlID0gcGFyZW50T2ZUb3BDYW5kaWRhdGU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyZW50T2ZUb3BDYW5kaWRhdGUgPSBwYXJlbnRPZlRvcENhbmRpZGF0ZS5wYXJlbnROb2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRvcENhbmRpZGF0ZS5yZWFkYWJpbGl0eSkge1xuICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVOb2RlKHRvcENhbmRpZGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZWNhdXNlIG9mIG91ciBib251cyBzeXN0ZW0sIHBhcmVudHMgb2YgY2FuZGlkYXRlcyBtaWdodCBoYXZlIHNjb3Jlc1xuICAgICAgICAvLyB0aGVtc2VsdmVzLiBUaGV5IGdldCBoYWxmIG9mIHRoZSBub2RlLiBUaGVyZSB3b24ndCBiZSBub2RlcyB3aXRoIGhpZ2hlclxuICAgICAgICAvLyBzY29yZXMgdGhhbiBvdXIgdG9wQ2FuZGlkYXRlLCBidXQgaWYgd2Ugc2VlIHRoZSBzY29yZSBnb2luZyAqdXAqIGluIHRoZSBmaXJzdFxuICAgICAgICAvLyBmZXcgc3RlcHMgdXAgdGhlIHRyZWUsIHRoYXQncyBhIGRlY2VudCBzaWduIHRoYXQgdGhlcmUgbWlnaHQgYmUgbW9yZSBjb250ZW50XG4gICAgICAgIC8vIGx1cmtpbmcgaW4gb3RoZXIgcGxhY2VzIHRoYXQgd2Ugd2FudCB0byB1bmlmeSBpbi4gVGhlIHNpYmxpbmcgc3R1ZmZcbiAgICAgICAgLy8gYmVsb3cgZG9lcyBzb21lIG9mIHRoYXQgLSBidXQgb25seSBpZiB3ZSd2ZSBsb29rZWQgaGlnaCBlbm91Z2ggdXAgdGhlIERPTVxuICAgICAgICAvLyB0cmVlLlxuICAgICAgICBwYXJlbnRPZlRvcENhbmRpZGF0ZSA9IHRvcENhbmRpZGF0ZS5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgbGFzdFNjb3JlID0gdG9wQ2FuZGlkYXRlLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZTtcbiAgICAgICAgLy8gVGhlIHNjb3JlcyBzaG91bGRuJ3QgZ2V0IHRvbyBsb3cuXG4gICAgICAgIHZhciBzY29yZVRocmVzaG9sZCA9IGxhc3RTY29yZSAvIDM7XG4gICAgICAgIHdoaWxlIChwYXJlbnRPZlRvcENhbmRpZGF0ZS50YWdOYW1lICE9PSBcIkJPRFlcIikge1xuICAgICAgICAgIGlmICghcGFyZW50T2ZUb3BDYW5kaWRhdGUucmVhZGFiaWxpdHkpIHtcbiAgICAgICAgICAgIHBhcmVudE9mVG9wQ2FuZGlkYXRlID0gcGFyZW50T2ZUb3BDYW5kaWRhdGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgcGFyZW50U2NvcmUgPSBwYXJlbnRPZlRvcENhbmRpZGF0ZS5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmU7XG4gICAgICAgICAgaWYgKHBhcmVudFNjb3JlIDwgc2NvcmVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGFyZW50U2NvcmUgPiBsYXN0U2NvcmUpIHtcbiAgICAgICAgICAgIC8vIEFscmlnaHQhIFdlIGZvdW5kIGEgYmV0dGVyIHBhcmVudCB0byB1c2UuXG4gICAgICAgICAgICB0b3BDYW5kaWRhdGUgPSBwYXJlbnRPZlRvcENhbmRpZGF0ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsYXN0U2NvcmUgPSBwYXJlbnRPZlRvcENhbmRpZGF0ZS5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmU7XG4gICAgICAgICAgcGFyZW50T2ZUb3BDYW5kaWRhdGUgPSBwYXJlbnRPZlRvcENhbmRpZGF0ZS5wYXJlbnROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlIHRvcCBjYW5kaWRhdGUgaXMgdGhlIG9ubHkgY2hpbGQsIHVzZSBwYXJlbnQgaW5zdGVhZC4gVGhpcyB3aWxsIGhlbHAgc2libGluZ1xuICAgICAgICAvLyBqb2luaW5nIGxvZ2ljIHdoZW4gYWRqYWNlbnQgY29udGVudCBpcyBhY3R1YWxseSBsb2NhdGVkIGluIHBhcmVudCdzIHNpYmxpbmcgbm9kZS5cbiAgICAgICAgcGFyZW50T2ZUb3BDYW5kaWRhdGUgPSB0b3BDYW5kaWRhdGUucGFyZW50Tm9kZTtcbiAgICAgICAgd2hpbGUgKFxuICAgICAgICAgIHBhcmVudE9mVG9wQ2FuZGlkYXRlLnRhZ05hbWUgIT0gXCJCT0RZXCIgJiZcbiAgICAgICAgICBwYXJlbnRPZlRvcENhbmRpZGF0ZS5jaGlsZHJlbi5sZW5ndGggPT0gMVxuICAgICAgICApIHtcbiAgICAgICAgICB0b3BDYW5kaWRhdGUgPSBwYXJlbnRPZlRvcENhbmRpZGF0ZTtcbiAgICAgICAgICBwYXJlbnRPZlRvcENhbmRpZGF0ZSA9IHRvcENhbmRpZGF0ZS5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdG9wQ2FuZGlkYXRlLnJlYWRhYmlsaXR5KSB7XG4gICAgICAgICAgdGhpcy5faW5pdGlhbGl6ZU5vZGUodG9wQ2FuZGlkYXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBOb3cgdGhhdCB3ZSBoYXZlIHRoZSB0b3AgY2FuZGlkYXRlLCBsb29rIHRocm91Z2ggaXRzIHNpYmxpbmdzIGZvciBjb250ZW50XG4gICAgICAvLyB0aGF0IG1pZ2h0IGFsc28gYmUgcmVsYXRlZC4gVGhpbmdzIGxpa2UgcHJlYW1ibGVzLCBjb250ZW50IHNwbGl0IGJ5IGFkc1xuICAgICAgLy8gdGhhdCB3ZSByZW1vdmVkLCBldGMuXG4gICAgICB2YXIgYXJ0aWNsZUNvbnRlbnQgPSBkb2MuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgIGlmIChpc1BhZ2luZykge1xuICAgICAgICBhcnRpY2xlQ29udGVudC5pZCA9IFwicmVhZGFiaWxpdHktY29udGVudFwiO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2libGluZ1Njb3JlVGhyZXNob2xkID0gTWF0aC5tYXgoXG4gICAgICAgIDEwLFxuICAgICAgICB0b3BDYW5kaWRhdGUucmVhZGFiaWxpdHkuY29udGVudFNjb3JlICogMC4yXG4gICAgICApO1xuICAgICAgLy8gS2VlcCBwb3RlbnRpYWwgdG9wIGNhbmRpZGF0ZSdzIHBhcmVudCBub2RlIHRvIHRyeSB0byBnZXQgdGV4dCBkaXJlY3Rpb24gb2YgaXQgbGF0ZXIuXG4gICAgICBwYXJlbnRPZlRvcENhbmRpZGF0ZSA9IHRvcENhbmRpZGF0ZS5wYXJlbnROb2RlO1xuICAgICAgdmFyIHNpYmxpbmdzID0gcGFyZW50T2ZUb3BDYW5kaWRhdGUuY2hpbGRyZW47XG5cbiAgICAgIGZvciAodmFyIHMgPSAwLCBzbCA9IHNpYmxpbmdzLmxlbmd0aDsgcyA8IHNsOyBzKyspIHtcbiAgICAgICAgdmFyIHNpYmxpbmcgPSBzaWJsaW5nc1tzXTtcbiAgICAgICAgdmFyIGFwcGVuZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMubG9nKFxuICAgICAgICAgIFwiTG9va2luZyBhdCBzaWJsaW5nIG5vZGU6XCIsXG4gICAgICAgICAgc2libGluZyxcbiAgICAgICAgICBzaWJsaW5nLnJlYWRhYmlsaXR5XG4gICAgICAgICAgICA/IFwid2l0aCBzY29yZSBcIiArIHNpYmxpbmcucmVhZGFiaWxpdHkuY29udGVudFNjb3JlXG4gICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sb2coXG4gICAgICAgICAgXCJTaWJsaW5nIGhhcyBzY29yZVwiLFxuICAgICAgICAgIHNpYmxpbmcucmVhZGFiaWxpdHkgPyBzaWJsaW5nLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZSA6IFwiVW5rbm93blwiXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHNpYmxpbmcgPT09IHRvcENhbmRpZGF0ZSkge1xuICAgICAgICAgIGFwcGVuZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGNvbnRlbnRCb251cyA9IDA7XG5cbiAgICAgICAgICAvLyBHaXZlIGEgYm9udXMgaWYgc2libGluZyBub2RlcyBhbmQgdG9wIGNhbmRpZGF0ZXMgaGF2ZSB0aGUgZXhhbXBsZSBzYW1lIGNsYXNzbmFtZVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHNpYmxpbmcuY2xhc3NOYW1lID09PSB0b3BDYW5kaWRhdGUuY2xhc3NOYW1lICYmXG4gICAgICAgICAgICB0b3BDYW5kaWRhdGUuY2xhc3NOYW1lICE9PSBcIlwiXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb250ZW50Qm9udXMgKz0gdG9wQ2FuZGlkYXRlLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZSAqIDAuMjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBzaWJsaW5nLnJlYWRhYmlsaXR5ICYmXG4gICAgICAgICAgICBzaWJsaW5nLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZSArIGNvbnRlbnRCb251cyA+PVxuICAgICAgICAgICAgICBzaWJsaW5nU2NvcmVUaHJlc2hvbGRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGFwcGVuZCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChzaWJsaW5nLm5vZGVOYW1lID09PSBcIlBcIikge1xuICAgICAgICAgICAgdmFyIGxpbmtEZW5zaXR5ID0gdGhpcy5fZ2V0TGlua0RlbnNpdHkoc2libGluZyk7XG4gICAgICAgICAgICB2YXIgbm9kZUNvbnRlbnQgPSB0aGlzLl9nZXRJbm5lclRleHQoc2libGluZyk7XG4gICAgICAgICAgICB2YXIgbm9kZUxlbmd0aCA9IG5vZGVDb250ZW50Lmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKG5vZGVMZW5ndGggPiA4MCAmJiBsaW5rRGVuc2l0eSA8IDAuMjUpIHtcbiAgICAgICAgICAgICAgYXBwZW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgIG5vZGVMZW5ndGggPCA4MCAmJlxuICAgICAgICAgICAgICBub2RlTGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICBsaW5rRGVuc2l0eSA9PT0gMCAmJlxuICAgICAgICAgICAgICBub2RlQ29udGVudC5zZWFyY2goL1xcLiggfCQpLykgIT09IC0xXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgYXBwZW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXBwZW5kKSB7XG4gICAgICAgICAgdGhpcy5sb2coXCJBcHBlbmRpbmcgbm9kZTpcIiwgc2libGluZyk7XG5cbiAgICAgICAgICBpZiAoIXRoaXMuQUxURVJfVE9fRElWX0VYQ0VQVElPTlMuaW5jbHVkZXMoc2libGluZy5ub2RlTmFtZSkpIHtcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgYSBub2RlIHRoYXQgaXNuJ3QgYSBjb21tb24gYmxvY2sgbGV2ZWwgZWxlbWVudCwgbGlrZSBhIGZvcm0gb3IgdGQgdGFnLlxuICAgICAgICAgICAgLy8gVHVybiBpdCBpbnRvIGEgZGl2IHNvIGl0IGRvZXNuJ3QgZ2V0IGZpbHRlcmVkIG91dCBsYXRlciBieSBhY2NpZGVudC5cbiAgICAgICAgICAgIHRoaXMubG9nKFwiQWx0ZXJpbmcgc2libGluZzpcIiwgc2libGluZywgXCJ0byBkaXYuXCIpO1xuXG4gICAgICAgICAgICBzaWJsaW5nID0gdGhpcy5fc2V0Tm9kZVRhZyhzaWJsaW5nLCBcIkRJVlwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhcnRpY2xlQ29udGVudC5hcHBlbmRDaGlsZChzaWJsaW5nKTtcbiAgICAgICAgICAvLyBGZXRjaCBjaGlsZHJlbiBhZ2FpbiB0byBtYWtlIGl0IGNvbXBhdGlibGVcbiAgICAgICAgICAvLyB3aXRoIERPTSBwYXJzZXJzIHdpdGhvdXQgbGl2ZSBjb2xsZWN0aW9uIHN1cHBvcnQuXG4gICAgICAgICAgc2libGluZ3MgPSBwYXJlbnRPZlRvcENhbmRpZGF0ZS5jaGlsZHJlbjtcbiAgICAgICAgICAvLyBzaWJsaW5ncyBpcyBhIHJlZmVyZW5jZSB0byB0aGUgY2hpbGRyZW4gYXJyYXksIGFuZFxuICAgICAgICAgIC8vIHNpYmxpbmcgaXMgcmVtb3ZlZCBmcm9tIHRoZSBhcnJheSB3aGVuIHdlIGNhbGwgYXBwZW5kQ2hpbGQoKS5cbiAgICAgICAgICAvLyBBcyBhIHJlc3VsdCwgd2UgbXVzdCByZXZpc2l0IHRoaXMgaW5kZXggc2luY2UgdGhlIG5vZGVzXG4gICAgICAgICAgLy8gaGF2ZSBiZWVuIHNoaWZ0ZWQuXG4gICAgICAgICAgcyAtPSAxO1xuICAgICAgICAgIHNsIC09IDE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2RlYnVnKSB7XG4gICAgICAgIHRoaXMubG9nKFwiQXJ0aWNsZSBjb250ZW50IHByZS1wcmVwOiBcIiArIGFydGljbGVDb250ZW50LmlubmVySFRNTCk7XG4gICAgICB9XG4gICAgICAvLyBTbyB3ZSBoYXZlIGFsbCBvZiB0aGUgY29udGVudCB0aGF0IHdlIG5lZWQuIE5vdyB3ZSBjbGVhbiBpdCB1cCBmb3IgcHJlc2VudGF0aW9uLlxuICAgICAgdGhpcy5fcHJlcEFydGljbGUoYXJ0aWNsZUNvbnRlbnQpO1xuICAgICAgaWYgKHRoaXMuX2RlYnVnKSB7XG4gICAgICAgIHRoaXMubG9nKFwiQXJ0aWNsZSBjb250ZW50IHBvc3QtcHJlcDogXCIgKyBhcnRpY2xlQ29udGVudC5pbm5lckhUTUwpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZGVkVG9DcmVhdGVUb3BDYW5kaWRhdGUpIHtcbiAgICAgICAgLy8gV2UgYWxyZWFkeSBjcmVhdGVkIGEgZmFrZSBkaXYgdGhpbmcsIGFuZCB0aGVyZSB3b3VsZG4ndCBoYXZlIGJlZW4gYW55IHNpYmxpbmdzIGxlZnRcbiAgICAgICAgLy8gZm9yIHRoZSBwcmV2aW91cyBsb29wLCBzbyB0aGVyZSdzIG5vIHBvaW50IHRyeWluZyB0byBjcmVhdGUgYSBuZXcgZGl2LCBhbmQgdGhlblxuICAgICAgICAvLyBtb3ZlIGFsbCB0aGUgY2hpbGRyZW4gb3Zlci4gSnVzdCBhc3NpZ24gSURzIGFuZCBjbGFzcyBuYW1lcyBoZXJlLiBObyBuZWVkIHRvIGFwcGVuZFxuICAgICAgICAvLyBiZWNhdXNlIHRoYXQgYWxyZWFkeSBoYXBwZW5lZCBhbnl3YXkuXG4gICAgICAgIHRvcENhbmRpZGF0ZS5pZCA9IFwicmVhZGFiaWxpdHktcGFnZS0xXCI7XG4gICAgICAgIHRvcENhbmRpZGF0ZS5jbGFzc05hbWUgPSBcInBhZ2VcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBkaXYgPSBkb2MuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgZGl2LmlkID0gXCJyZWFkYWJpbGl0eS1wYWdlLTFcIjtcbiAgICAgICAgZGl2LmNsYXNzTmFtZSA9IFwicGFnZVwiO1xuICAgICAgICB3aGlsZSAoYXJ0aWNsZUNvbnRlbnQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChhcnRpY2xlQ29udGVudC5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBhcnRpY2xlQ29udGVudC5hcHBlbmRDaGlsZChkaXYpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZGVidWcpIHtcbiAgICAgICAgdGhpcy5sb2coXCJBcnRpY2xlIGNvbnRlbnQgYWZ0ZXIgcGFnaW5nOiBcIiArIGFydGljbGVDb250ZW50LmlubmVySFRNTCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBwYXJzZVN1Y2Nlc3NmdWwgPSB0cnVlO1xuXG4gICAgICAvLyBOb3cgdGhhdCB3ZSd2ZSBnb25lIHRocm91Z2ggdGhlIGZ1bGwgYWxnb3JpdGhtLCBjaGVjayB0byBzZWUgaWZcbiAgICAgIC8vIHdlIGdvdCBhbnkgbWVhbmluZ2Z1bCBjb250ZW50LiBJZiB3ZSBkaWRuJ3QsIHdlIG1heSBuZWVkIHRvIHJlLXJ1blxuICAgICAgLy8gZ3JhYkFydGljbGUgd2l0aCBkaWZmZXJlbnQgZmxhZ3Mgc2V0LiBUaGlzIGdpdmVzIHVzIGEgaGlnaGVyIGxpa2VsaWhvb2Qgb2ZcbiAgICAgIC8vIGZpbmRpbmcgdGhlIGNvbnRlbnQsIGFuZCB0aGUgc2lldmUgYXBwcm9hY2ggZ2l2ZXMgdXMgYSBoaWdoZXIgbGlrZWxpaG9vZCBvZlxuICAgICAgLy8gZmluZGluZyB0aGUgLXJpZ2h0LSBjb250ZW50LlxuICAgICAgdmFyIHRleHRMZW5ndGggPSB0aGlzLl9nZXRJbm5lclRleHQoYXJ0aWNsZUNvbnRlbnQsIHRydWUpLmxlbmd0aDtcbiAgICAgIGlmICh0ZXh0TGVuZ3RoIDwgdGhpcy5fY2hhclRocmVzaG9sZCkge1xuICAgICAgICBwYXJzZVN1Y2Nlc3NmdWwgPSBmYWxzZTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuc2FuaXRpemVkL3Byb3BlcnR5XG4gICAgICAgIHBhZ2UuaW5uZXJIVE1MID0gcGFnZUNhY2hlSHRtbDtcblxuICAgICAgICB0aGlzLl9hdHRlbXB0cy5wdXNoKHtcbiAgICAgICAgICBhcnRpY2xlQ29udGVudCxcbiAgICAgICAgICB0ZXh0TGVuZ3RoLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5fZmxhZ0lzQWN0aXZlKHRoaXMuRkxBR19TVFJJUF9VTkxJS0VMWVMpKSB7XG4gICAgICAgICAgdGhpcy5fcmVtb3ZlRmxhZyh0aGlzLkZMQUdfU1RSSVBfVU5MSUtFTFlTKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9mbGFnSXNBY3RpdmUodGhpcy5GTEFHX1dFSUdIVF9DTEFTU0VTKSkge1xuICAgICAgICAgIHRoaXMuX3JlbW92ZUZsYWcodGhpcy5GTEFHX1dFSUdIVF9DTEFTU0VTKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9mbGFnSXNBY3RpdmUodGhpcy5GTEFHX0NMRUFOX0NPTkRJVElPTkFMTFkpKSB7XG4gICAgICAgICAgdGhpcy5fcmVtb3ZlRmxhZyh0aGlzLkZMQUdfQ0xFQU5fQ09ORElUSU9OQUxMWSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gTm8gbHVjayBhZnRlciByZW1vdmluZyBmbGFncywganVzdCByZXR1cm4gdGhlIGxvbmdlc3QgdGV4dCB3ZSBmb3VuZCBkdXJpbmcgdGhlIGRpZmZlcmVudCBsb29wc1xuICAgICAgICAgIHRoaXMuX2F0dGVtcHRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBiLnRleHRMZW5ndGggLSBhLnRleHRMZW5ndGg7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBCdXQgZmlyc3QgY2hlY2sgaWYgd2UgYWN0dWFsbHkgaGF2ZSBzb21ldGhpbmdcbiAgICAgICAgICBpZiAoIXRoaXMuX2F0dGVtcHRzWzBdLnRleHRMZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGFydGljbGVDb250ZW50ID0gdGhpcy5fYXR0ZW1wdHNbMF0uYXJ0aWNsZUNvbnRlbnQ7XG4gICAgICAgICAgcGFyc2VTdWNjZXNzZnVsID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocGFyc2VTdWNjZXNzZnVsKSB7XG4gICAgICAgIC8vIEZpbmQgb3V0IHRleHQgZGlyZWN0aW9uIGZyb20gYW5jZXN0b3JzIG9mIGZpbmFsIHRvcCBjYW5kaWRhdGUuXG4gICAgICAgIHZhciBhbmNlc3RvcnMgPSBbcGFyZW50T2ZUb3BDYW5kaWRhdGUsIHRvcENhbmRpZGF0ZV0uY29uY2F0KFxuICAgICAgICAgIHRoaXMuX2dldE5vZGVBbmNlc3RvcnMocGFyZW50T2ZUb3BDYW5kaWRhdGUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuX3NvbWVOb2RlKGFuY2VzdG9ycywgZnVuY3Rpb24gKGFuY2VzdG9yKSB7XG4gICAgICAgICAgaWYgKCFhbmNlc3Rvci50YWdOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBhcnRpY2xlRGlyID0gYW5jZXN0b3IuZ2V0QXR0cmlidXRlKFwiZGlyXCIpO1xuICAgICAgICAgIGlmIChhcnRpY2xlRGlyKSB7XG4gICAgICAgICAgICB0aGlzLl9hcnRpY2xlRGlyID0gYXJ0aWNsZURpcjtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXJ0aWNsZUNvbnRlbnQ7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBzb21lIG9mIHRoZSBjb21tb24gSFRNTCBlbnRpdGllcyBpbiBzdHJpbmcgdG8gdGhlaXIgY29ycmVzcG9uZGluZyBjaGFyYWN0ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0gc3RyIHtzdHJpbmd9IC0gYSBzdHJpbmcgdG8gdW5lc2NhcGUuXG4gICAqIEByZXR1cm4gc3RyaW5nIHdpdGhvdXQgSFRNTCBlbnRpdHkuXG4gICAqL1xuICBfdW5lc2NhcGVIdG1sRW50aXRpZXMoc3RyKSB7XG4gICAgaWYgKCFzdHIpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgdmFyIGh0bWxFc2NhcGVNYXAgPSB0aGlzLkhUTUxfRVNDQVBFX01BUDtcbiAgICByZXR1cm4gc3RyXG4gICAgICAucmVwbGFjZSgvJihxdW90fGFtcHxhcG9zfGx0fGd0KTsvZywgZnVuY3Rpb24gKF8sIHRhZykge1xuICAgICAgICByZXR1cm4gaHRtbEVzY2FwZU1hcFt0YWddO1xuICAgICAgfSlcbiAgICAgIC5yZXBsYWNlKC8mIyg/OngoWzAtOWEtZl0rKXwoWzAtOV0rKSk7L2dpLCBmdW5jdGlvbiAoXywgaGV4LCBudW1TdHIpIHtcbiAgICAgICAgdmFyIG51bSA9IHBhcnNlSW50KGhleCB8fCBudW1TdHIsIGhleCA/IDE2IDogMTApO1xuXG4gICAgICAgIC8vIHRoZXNlIGNoYXJhY3RlciByZWZlcmVuY2VzIGFyZSByZXBsYWNlZCBieSBhIGNvbmZvcm1pbmcgSFRNTCBwYXJzZXJcbiAgICAgICAgaWYgKG51bSA9PSAwIHx8IG51bSA+IDB4MTBmZmZmIHx8IChudW0gPj0gMHhkODAwICYmIG51bSA8PSAweGRmZmYpKSB7XG4gICAgICAgICAgbnVtID0gMHhmZmZkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ29kZVBvaW50KG51bSk7XG4gICAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogVHJ5IHRvIGV4dHJhY3QgbWV0YWRhdGEgZnJvbSBKU09OLUxEIG9iamVjdC5cbiAgICogRm9yIG5vdywgb25seSBTY2hlbWEub3JnIG9iamVjdHMgb2YgdHlwZSBBcnRpY2xlIG9yIGl0cyBzdWJ0eXBlcyBhcmUgc3VwcG9ydGVkLlxuICAgKiBAcmV0dXJuIE9iamVjdCB3aXRoIGFueSBtZXRhZGF0YSB0aGF0IGNvdWxkIGJlIGV4dHJhY3RlZCAocG9zc2libHkgbm9uZSlcbiAgICovXG4gIF9nZXRKU09OTEQoZG9jKSB7XG4gICAgdmFyIHNjcmlwdHMgPSB0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcoZG9jLCBbXCJzY3JpcHRcIl0pO1xuXG4gICAgdmFyIG1ldGFkYXRhO1xuXG4gICAgdGhpcy5fZm9yRWFjaE5vZGUoc2NyaXB0cywgZnVuY3Rpb24gKGpzb25MZEVsZW1lbnQpIHtcbiAgICAgIGlmIChcbiAgICAgICAgIW1ldGFkYXRhICYmXG4gICAgICAgIGpzb25MZEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSA9PT0gXCJhcHBsaWNhdGlvbi9sZCtqc29uXCJcbiAgICAgICkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFN0cmlwIENEQVRBIG1hcmtlcnMgaWYgcHJlc2VudFxuICAgICAgICAgIHZhciBjb250ZW50ID0ganNvbkxkRWxlbWVudC50ZXh0Q29udGVudC5yZXBsYWNlKFxuICAgICAgICAgICAgL15cXHMqPCFcXFtDREFUQVxcW3xcXF1cXF0+XFxzKiQvZyxcbiAgICAgICAgICAgIFwiXCJcbiAgICAgICAgICApO1xuICAgICAgICAgIHZhciBwYXJzZWQgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xuXG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyc2VkKSkge1xuICAgICAgICAgICAgcGFyc2VkID0gcGFyc2VkLmZpbmQoaXQgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIGl0W1wiQHR5cGVcIl0gJiZcbiAgICAgICAgICAgICAgICBpdFtcIkB0eXBlXCJdLm1hdGNoKHRoaXMuUkVHRVhQUy5qc29uTGRBcnRpY2xlVHlwZXMpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcGFyc2VkKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc2NoZW1hRG90T3JnUmVnZXggPSAvXmh0dHBzP1xcOlxcL1xcL3NjaGVtYVxcLm9yZ1xcLz8kLztcbiAgICAgICAgICB2YXIgbWF0Y2hlcyA9XG4gICAgICAgICAgICAodHlwZW9mIHBhcnNlZFtcIkBjb250ZXh0XCJdID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgIHBhcnNlZFtcIkBjb250ZXh0XCJdLm1hdGNoKHNjaGVtYURvdE9yZ1JlZ2V4KSkgfHxcbiAgICAgICAgICAgICh0eXBlb2YgcGFyc2VkW1wiQGNvbnRleHRcIl0gPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgICAgdHlwZW9mIHBhcnNlZFtcIkBjb250ZXh0XCJdW1wiQHZvY2FiXCJdID09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgcGFyc2VkW1wiQGNvbnRleHRcIl1bXCJAdm9jYWJcIl0ubWF0Y2goc2NoZW1hRG90T3JnUmVnZXgpKTtcblxuICAgICAgICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghcGFyc2VkW1wiQHR5cGVcIl0gJiYgQXJyYXkuaXNBcnJheShwYXJzZWRbXCJAZ3JhcGhcIl0pKSB7XG4gICAgICAgICAgICBwYXJzZWQgPSBwYXJzZWRbXCJAZ3JhcGhcIl0uZmluZChpdCA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAoaXRbXCJAdHlwZVwiXSB8fCBcIlwiKS5tYXRjaCh0aGlzLlJFR0VYUFMuanNvbkxkQXJ0aWNsZVR5cGVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFwYXJzZWQgfHxcbiAgICAgICAgICAgICFwYXJzZWRbXCJAdHlwZVwiXSB8fFxuICAgICAgICAgICAgIXBhcnNlZFtcIkB0eXBlXCJdLm1hdGNoKHRoaXMuUkVHRVhQUy5qc29uTGRBcnRpY2xlVHlwZXMpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbWV0YWRhdGEgPSB7fTtcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBwYXJzZWQubmFtZSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgdHlwZW9mIHBhcnNlZC5oZWFkbGluZSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgcGFyc2VkLm5hbWUgIT09IHBhcnNlZC5oZWFkbGluZVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSBib3RoIG5hbWUgYW5kIGhlYWRsaW5lIGVsZW1lbnQgaW4gdGhlIEpTT04tTEQuIFRoZXkgc2hvdWxkIGJvdGggYmUgdGhlIHNhbWUgYnV0IHNvbWUgd2Vic2l0ZXMgbGlrZSBha3R1YWxuZS5jelxuICAgICAgICAgICAgLy8gcHV0IHRoZWlyIG93biBuYW1lIGludG8gXCJuYW1lXCIgYW5kIHRoZSBhcnRpY2xlIHRpdGxlIHRvIFwiaGVhZGxpbmVcIiB3aGljaCBjb25mdXNlcyBSZWFkYWJpbGl0eS4gU28gd2UgdHJ5IHRvIGNoZWNrIGlmIGVpdGhlclxuICAgICAgICAgICAgLy8gXCJuYW1lXCIgb3IgXCJoZWFkbGluZVwiIGNsb3NlbHkgbWF0Y2hlcyB0aGUgaHRtbCB0aXRsZSwgYW5kIGlmIHNvLCB1c2UgdGhhdCBvbmUuIElmIG5vdCwgdGhlbiB3ZSB1c2UgXCJuYW1lXCIgYnkgZGVmYXVsdC5cblxuICAgICAgICAgICAgdmFyIHRpdGxlID0gdGhpcy5fZ2V0QXJ0aWNsZVRpdGxlKCk7XG4gICAgICAgICAgICB2YXIgbmFtZU1hdGNoZXMgPSB0aGlzLl90ZXh0U2ltaWxhcml0eShwYXJzZWQubmFtZSwgdGl0bGUpID4gMC43NTtcbiAgICAgICAgICAgIHZhciBoZWFkbGluZU1hdGNoZXMgPVxuICAgICAgICAgICAgICB0aGlzLl90ZXh0U2ltaWxhcml0eShwYXJzZWQuaGVhZGxpbmUsIHRpdGxlKSA+IDAuNzU7XG5cbiAgICAgICAgICAgIGlmIChoZWFkbGluZU1hdGNoZXMgJiYgIW5hbWVNYXRjaGVzKSB7XG4gICAgICAgICAgICAgIG1ldGFkYXRhLnRpdGxlID0gcGFyc2VkLmhlYWRsaW5lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbWV0YWRhdGEudGl0bGUgPSBwYXJzZWQubmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJzZWQubmFtZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbWV0YWRhdGEudGl0bGUgPSBwYXJzZWQubmFtZS50cmltKCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGFyc2VkLmhlYWRsaW5lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtZXRhZGF0YS50aXRsZSA9IHBhcnNlZC5oZWFkbGluZS50cmltKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwYXJzZWQuYXV0aG9yKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcnNlZC5hdXRob3IubmFtZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICBtZXRhZGF0YS5ieWxpbmUgPSBwYXJzZWQuYXV0aG9yLm5hbWUudHJpbSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShwYXJzZWQuYXV0aG9yKSAmJlxuICAgICAgICAgICAgICBwYXJzZWQuYXV0aG9yWzBdICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBwYXJzZWQuYXV0aG9yWzBdLm5hbWUgPT09IFwic3RyaW5nXCJcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBtZXRhZGF0YS5ieWxpbmUgPSBwYXJzZWQuYXV0aG9yXG4gICAgICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoYXV0aG9yKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gYXV0aG9yICYmIHR5cGVvZiBhdXRob3IubmFtZSA9PT0gXCJzdHJpbmdcIjtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGF1dGhvcikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhvci5uYW1lLnRyaW0oKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5qb2luKFwiLCBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlb2YgcGFyc2VkLmRlc2NyaXB0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtZXRhZGF0YS5leGNlcnB0ID0gcGFyc2VkLmRlc2NyaXB0aW9uLnRyaW0oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBhcnNlZC5wdWJsaXNoZXIgJiYgdHlwZW9mIHBhcnNlZC5wdWJsaXNoZXIubmFtZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbWV0YWRhdGEuc2l0ZU5hbWUgPSBwYXJzZWQucHVibGlzaGVyLm5hbWUudHJpbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIHBhcnNlZC5kYXRlUHVibGlzaGVkID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBtZXRhZGF0YS5kYXRlUHVibGlzaGVkID0gcGFyc2VkLmRhdGVQdWJsaXNoZWQudHJpbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgdGhpcy5sb2coZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhID8gbWV0YWRhdGEgOiB7fTtcbiAgfSxcblxuICAvKipcbiAgICogQXR0ZW1wdHMgdG8gZ2V0IGV4Y2VycHQgYW5kIGJ5bGluZSBtZXRhZGF0YSBmb3IgdGhlIGFydGljbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBqc29ubGQg4oCUIG9iamVjdCBjb250YWluaW5nIGFueSBtZXRhZGF0YSB0aGF0XG4gICAqIGNvdWxkIGJlIGV4dHJhY3RlZCBmcm9tIEpTT04tTEQgb2JqZWN0LlxuICAgKlxuICAgKiBAcmV0dXJuIE9iamVjdCB3aXRoIG9wdGlvbmFsIFwiZXhjZXJwdFwiIGFuZCBcImJ5bGluZVwiIHByb3BlcnRpZXNcbiAgICovXG4gIF9nZXRBcnRpY2xlTWV0YWRhdGEoanNvbmxkKSB7XG4gICAgdmFyIG1ldGFkYXRhID0ge307XG4gICAgdmFyIHZhbHVlcyA9IHt9O1xuICAgIHZhciBtZXRhRWxlbWVudHMgPSB0aGlzLl9kb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJtZXRhXCIpO1xuXG4gICAgLy8gcHJvcGVydHkgaXMgYSBzcGFjZS1zZXBhcmF0ZWQgbGlzdCBvZiB2YWx1ZXNcbiAgICB2YXIgcHJvcGVydHlQYXR0ZXJuID1cbiAgICAgIC9cXHMqKGFydGljbGV8ZGN8ZGN0ZXJtfG9nfHR3aXR0ZXIpXFxzKjpcXHMqKGF1dGhvcnxjcmVhdG9yfGRlc2NyaXB0aW9ufHB1Ymxpc2hlZF90aW1lfHRpdGxlfHNpdGVfbmFtZSlcXHMqL2dpO1xuXG4gICAgLy8gbmFtZSBpcyBhIHNpbmdsZSB2YWx1ZVxuICAgIHZhciBuYW1lUGF0dGVybiA9XG4gICAgICAvXlxccyooPzooZGN8ZGN0ZXJtfG9nfHR3aXR0ZXJ8cGFyc2VseXx3ZWlibzooYXJ0aWNsZXx3ZWJwYWdlKSlcXHMqWy1cXC46XVxccyopPyhhdXRob3J8Y3JlYXRvcnxwdWItZGF0ZXxkZXNjcmlwdGlvbnx0aXRsZXxzaXRlX25hbWUpXFxzKiQvaTtcblxuICAgIC8vIEZpbmQgZGVzY3JpcHRpb24gdGFncy5cbiAgICB0aGlzLl9mb3JFYWNoTm9kZShtZXRhRWxlbWVudHMsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICB2YXIgZWxlbWVudE5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIik7XG4gICAgICB2YXIgZWxlbWVudFByb3BlcnR5ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJwcm9wZXJ0eVwiKTtcbiAgICAgIHZhciBjb250ZW50ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpO1xuICAgICAgaWYgKCFjb250ZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBtYXRjaGVzID0gbnVsbDtcbiAgICAgIHZhciBuYW1lID0gbnVsbDtcblxuICAgICAgaWYgKGVsZW1lbnRQcm9wZXJ0eSkge1xuICAgICAgICBtYXRjaGVzID0gZWxlbWVudFByb3BlcnR5Lm1hdGNoKHByb3BlcnR5UGF0dGVybik7XG4gICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgLy8gQ29udmVydCB0byBsb3dlcmNhc2UsIGFuZCByZW1vdmUgYW55IHdoaXRlc3BhY2VcbiAgICAgICAgICAvLyBzbyB3ZSBjYW4gbWF0Y2ggYmVsb3cuXG4gICAgICAgICAgbmFtZSA9IG1hdGNoZXNbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMvZywgXCJcIik7XG4gICAgICAgICAgLy8gbXVsdGlwbGUgYXV0aG9yc1xuICAgICAgICAgIHZhbHVlc1tuYW1lXSA9IGNvbnRlbnQudHJpbSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIW1hdGNoZXMgJiYgZWxlbWVudE5hbWUgJiYgbmFtZVBhdHRlcm4udGVzdChlbGVtZW50TmFtZSkpIHtcbiAgICAgICAgbmFtZSA9IGVsZW1lbnROYW1lO1xuICAgICAgICBpZiAoY29udGVudCkge1xuICAgICAgICAgIC8vIENvbnZlcnQgdG8gbG93ZXJjYXNlLCByZW1vdmUgYW55IHdoaXRlc3BhY2UsIGFuZCBjb252ZXJ0IGRvdHNcbiAgICAgICAgICAvLyB0byBjb2xvbnMgc28gd2UgY2FuIG1hdGNoIGJlbG93LlxuICAgICAgICAgIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzL2csIFwiXCIpLnJlcGxhY2UoL1xcLi9nLCBcIjpcIik7XG4gICAgICAgICAgdmFsdWVzW25hbWVdID0gY29udGVudC50cmltKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGdldCB0aXRsZVxuICAgIG1ldGFkYXRhLnRpdGxlID1cbiAgICAgIGpzb25sZC50aXRsZSB8fFxuICAgICAgdmFsdWVzW1wiZGM6dGl0bGVcIl0gfHxcbiAgICAgIHZhbHVlc1tcImRjdGVybTp0aXRsZVwiXSB8fFxuICAgICAgdmFsdWVzW1wib2c6dGl0bGVcIl0gfHxcbiAgICAgIHZhbHVlc1tcIndlaWJvOmFydGljbGU6dGl0bGVcIl0gfHxcbiAgICAgIHZhbHVlc1tcIndlaWJvOndlYnBhZ2U6dGl0bGVcIl0gfHxcbiAgICAgIHZhbHVlcy50aXRsZSB8fFxuICAgICAgdmFsdWVzW1widHdpdHRlcjp0aXRsZVwiXSB8fFxuICAgICAgdmFsdWVzW1wicGFyc2VseS10aXRsZVwiXTtcblxuICAgIGlmICghbWV0YWRhdGEudGl0bGUpIHtcbiAgICAgIG1ldGFkYXRhLnRpdGxlID0gdGhpcy5fZ2V0QXJ0aWNsZVRpdGxlKCk7XG4gICAgfVxuXG4gICAgY29uc3QgYXJ0aWNsZUF1dGhvciA9XG4gICAgICB0eXBlb2YgdmFsdWVzW1wiYXJ0aWNsZTphdXRob3JcIl0gPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICF0aGlzLl9pc1VybCh2YWx1ZXNbXCJhcnRpY2xlOmF1dGhvclwiXSlcbiAgICAgICAgPyB2YWx1ZXNbXCJhcnRpY2xlOmF1dGhvclwiXVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIC8vIGdldCBhdXRob3JcbiAgICBtZXRhZGF0YS5ieWxpbmUgPVxuICAgICAganNvbmxkLmJ5bGluZSB8fFxuICAgICAgdmFsdWVzW1wiZGM6Y3JlYXRvclwiXSB8fFxuICAgICAgdmFsdWVzW1wiZGN0ZXJtOmNyZWF0b3JcIl0gfHxcbiAgICAgIHZhbHVlcy5hdXRob3IgfHxcbiAgICAgIHZhbHVlc1tcInBhcnNlbHktYXV0aG9yXCJdIHx8XG4gICAgICBhcnRpY2xlQXV0aG9yO1xuXG4gICAgLy8gZ2V0IGRlc2NyaXB0aW9uXG4gICAgbWV0YWRhdGEuZXhjZXJwdCA9XG4gICAgICBqc29ubGQuZXhjZXJwdCB8fFxuICAgICAgdmFsdWVzW1wiZGM6ZGVzY3JpcHRpb25cIl0gfHxcbiAgICAgIHZhbHVlc1tcImRjdGVybTpkZXNjcmlwdGlvblwiXSB8fFxuICAgICAgdmFsdWVzW1wib2c6ZGVzY3JpcHRpb25cIl0gfHxcbiAgICAgIHZhbHVlc1tcIndlaWJvOmFydGljbGU6ZGVzY3JpcHRpb25cIl0gfHxcbiAgICAgIHZhbHVlc1tcIndlaWJvOndlYnBhZ2U6ZGVzY3JpcHRpb25cIl0gfHxcbiAgICAgIHZhbHVlcy5kZXNjcmlwdGlvbiB8fFxuICAgICAgdmFsdWVzW1widHdpdHRlcjpkZXNjcmlwdGlvblwiXTtcblxuICAgIC8vIGdldCBzaXRlIG5hbWVcbiAgICBtZXRhZGF0YS5zaXRlTmFtZSA9IGpzb25sZC5zaXRlTmFtZSB8fCB2YWx1ZXNbXCJvZzpzaXRlX25hbWVcIl07XG5cbiAgICAvLyBnZXQgYXJ0aWNsZSBwdWJsaXNoZWQgdGltZVxuICAgIG1ldGFkYXRhLnB1Ymxpc2hlZFRpbWUgPVxuICAgICAganNvbmxkLmRhdGVQdWJsaXNoZWQgfHxcbiAgICAgIHZhbHVlc1tcImFydGljbGU6cHVibGlzaGVkX3RpbWVcIl0gfHxcbiAgICAgIHZhbHVlc1tcInBhcnNlbHktcHViLWRhdGVcIl0gfHxcbiAgICAgIG51bGw7XG5cbiAgICAvLyBpbiBtYW55IHNpdGVzIHRoZSBtZXRhIHZhbHVlIGlzIGVzY2FwZWQgd2l0aCBIVE1MIGVudGl0aWVzLFxuICAgIC8vIHNvIGhlcmUgd2UgbmVlZCB0byB1bmVzY2FwZSBpdFxuICAgIG1ldGFkYXRhLnRpdGxlID0gdGhpcy5fdW5lc2NhcGVIdG1sRW50aXRpZXMobWV0YWRhdGEudGl0bGUpO1xuICAgIG1ldGFkYXRhLmJ5bGluZSA9IHRoaXMuX3VuZXNjYXBlSHRtbEVudGl0aWVzKG1ldGFkYXRhLmJ5bGluZSk7XG4gICAgbWV0YWRhdGEuZXhjZXJwdCA9IHRoaXMuX3VuZXNjYXBlSHRtbEVudGl0aWVzKG1ldGFkYXRhLmV4Y2VycHQpO1xuICAgIG1ldGFkYXRhLnNpdGVOYW1lID0gdGhpcy5fdW5lc2NhcGVIdG1sRW50aXRpZXMobWV0YWRhdGEuc2l0ZU5hbWUpO1xuICAgIG1ldGFkYXRhLnB1Ymxpc2hlZFRpbWUgPSB0aGlzLl91bmVzY2FwZUh0bWxFbnRpdGllcyhtZXRhZGF0YS5wdWJsaXNoZWRUaW1lKTtcblxuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2sgaWYgbm9kZSBpcyBpbWFnZSwgb3IgaWYgbm9kZSBjb250YWlucyBleGFjdGx5IG9ubHkgb25lIGltYWdlXG4gICAqIHdoZXRoZXIgYXMgYSBkaXJlY3QgY2hpbGQgb3IgYXMgaXRzIGRlc2NlbmRhbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiovXG4gIF9pc1NpbmdsZUltYWdlKG5vZGUpIHtcbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgaWYgKG5vZGUudGFnTmFtZSA9PT0gXCJJTUdcIikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLmNoaWxkcmVuLmxlbmd0aCAhPT0gMSB8fCBub2RlLnRleHRDb250ZW50LnRyaW0oKSAhPT0gXCJcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBub2RlID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGaW5kIGFsbCA8bm9zY3JpcHQ+IHRoYXQgYXJlIGxvY2F0ZWQgYWZ0ZXIgPGltZz4gbm9kZXMsIGFuZCB3aGljaCBjb250YWluIG9ubHkgb25lXG4gICAqIDxpbWc+IGVsZW1lbnQuIFJlcGxhY2UgdGhlIGZpcnN0IGltYWdlIHdpdGggdGhlIGltYWdlIGZyb20gaW5zaWRlIHRoZSA8bm9zY3JpcHQ+IHRhZyxcbiAgICogYW5kIHJlbW92ZSB0aGUgPG5vc2NyaXB0PiB0YWcuIFRoaXMgaW1wcm92ZXMgdGhlIHF1YWxpdHkgb2YgdGhlIGltYWdlcyB3ZSB1c2Ugb25cbiAgICogc29tZSBzaXRlcyAoZS5nLiBNZWRpdW0pLlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiovXG4gIF91bndyYXBOb3NjcmlwdEltYWdlcyhkb2MpIHtcbiAgICAvLyBGaW5kIGltZyB3aXRob3V0IHNvdXJjZSBvciBhdHRyaWJ1dGVzIHRoYXQgbWlnaHQgY29udGFpbnMgaW1hZ2UsIGFuZCByZW1vdmUgaXQuXG4gICAgLy8gVGhpcyBpcyBkb25lIHRvIHByZXZlbnQgYSBwbGFjZWhvbGRlciBpbWcgaXMgcmVwbGFjZWQgYnkgaW1nIGZyb20gbm9zY3JpcHQgaW4gbmV4dCBzdGVwLlxuICAgIHZhciBpbWdzID0gQXJyYXkuZnJvbShkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbWdcIikpO1xuICAgIHRoaXMuX2ZvckVhY2hOb2RlKGltZ3MsIGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1nLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGF0dHIgPSBpbWcuYXR0cmlidXRlc1tpXTtcbiAgICAgICAgc3dpdGNoIChhdHRyLm5hbWUpIHtcbiAgICAgICAgICBjYXNlIFwic3JjXCI6XG4gICAgICAgICAgY2FzZSBcInNyY3NldFwiOlxuICAgICAgICAgIGNhc2UgXCJkYXRhLXNyY1wiOlxuICAgICAgICAgIGNhc2UgXCJkYXRhLXNyY3NldFwiOlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKC9cXC4oanBnfGpwZWd8cG5nfHdlYnApL2kudGVzdChhdHRyLnZhbHVlKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpbWcucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICAvLyBOZXh0IGZpbmQgbm9zY3JpcHQgYW5kIHRyeSB0byBleHRyYWN0IGl0cyBpbWFnZVxuICAgIHZhciBub3NjcmlwdHMgPSBBcnJheS5mcm9tKGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcIm5vc2NyaXB0XCIpKTtcbiAgICB0aGlzLl9mb3JFYWNoTm9kZShub3NjcmlwdHMsIGZ1bmN0aW9uIChub3NjcmlwdCkge1xuICAgICAgLy8gUGFyc2UgY29udGVudCBvZiBub3NjcmlwdCBhbmQgbWFrZSBzdXJlIGl0IG9ubHkgY29udGFpbnMgaW1hZ2VcbiAgICAgIGlmICghdGhpcy5faXNTaW5nbGVJbWFnZShub3NjcmlwdCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHRtcCA9IGRvYy5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgLy8gV2UncmUgcnVubmluZyBpbiB0aGUgZG9jdW1lbnQgY29udGV4dCwgYW5kIHVzaW5nIHVubW9kaWZpZWRcbiAgICAgIC8vIGRvY3VtZW50IGNvbnRlbnRzLCBzbyBkb2luZyB0aGlzIHNob3VsZCBiZSBzYWZlLlxuICAgICAgLy8gKEFsc28gd2UgaGVhdmlseSBkaXNjb3VyYWdlIHBlb3BsZSBmcm9tIGFsbG93aW5nIHNjcmlwdCB0b1xuICAgICAgLy8gcnVuIGF0IGFsbCBpbiB0aGlzIGRvY3VtZW50Li4uKVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuc2FuaXRpemVkL3Byb3BlcnR5XG4gICAgICB0bXAuaW5uZXJIVE1MID0gbm9zY3JpcHQuaW5uZXJIVE1MO1xuXG4gICAgICAvLyBJZiBub3NjcmlwdCBoYXMgcHJldmlvdXMgc2libGluZyBhbmQgaXQgb25seSBjb250YWlucyBpbWFnZSxcbiAgICAgIC8vIHJlcGxhY2UgaXQgd2l0aCBub3NjcmlwdCBjb250ZW50LiBIb3dldmVyIHdlIGFsc28ga2VlcCBvbGRcbiAgICAgIC8vIGF0dHJpYnV0ZXMgdGhhdCBtaWdodCBjb250YWlucyBpbWFnZS5cbiAgICAgIHZhciBwcmV2RWxlbWVudCA9IG5vc2NyaXB0LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICBpZiAocHJldkVsZW1lbnQgJiYgdGhpcy5faXNTaW5nbGVJbWFnZShwcmV2RWxlbWVudCkpIHtcbiAgICAgICAgdmFyIHByZXZJbWcgPSBwcmV2RWxlbWVudDtcbiAgICAgICAgaWYgKHByZXZJbWcudGFnTmFtZSAhPT0gXCJJTUdcIikge1xuICAgICAgICAgIHByZXZJbWcgPSBwcmV2RWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImltZ1wiKVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZXdJbWcgPSB0bXAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbWdcIilbMF07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJldkltZy5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGF0dHIgPSBwcmV2SW1nLmF0dHJpYnV0ZXNbaV07XG4gICAgICAgICAgaWYgKGF0dHIudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGF0dHIubmFtZSA9PT0gXCJzcmNcIiB8fFxuICAgICAgICAgICAgYXR0ci5uYW1lID09PSBcInNyY3NldFwiIHx8XG4gICAgICAgICAgICAvXFwuKGpwZ3xqcGVnfHBuZ3x3ZWJwKS9pLnRlc3QoYXR0ci52YWx1ZSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChuZXdJbWcuZ2V0QXR0cmlidXRlKGF0dHIubmFtZSkgPT09IGF0dHIudmFsdWUpIHtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBhdHRyTmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgICAgIGlmIChuZXdJbWcuaGFzQXR0cmlidXRlKGF0dHJOYW1lKSkge1xuICAgICAgICAgICAgICBhdHRyTmFtZSA9IFwiZGF0YS1vbGQtXCIgKyBhdHRyTmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3SW1nLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0ci52YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbm9zY3JpcHQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodG1wLmZpcnN0RWxlbWVudENoaWxkLCBwcmV2RWxlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgc2NyaXB0IHRhZ3MgZnJvbSB0aGUgZG9jdW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSBFbGVtZW50XG4gICAqKi9cbiAgX3JlbW92ZVNjcmlwdHMoZG9jKSB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXModGhpcy5fZ2V0QWxsTm9kZXNXaXRoVGFnKGRvYywgW1wic2NyaXB0XCIsIFwibm9zY3JpcHRcIl0pKTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhpcyBub2RlIGhhcyBvbmx5IHdoaXRlc3BhY2UgYW5kIGEgc2luZ2xlIGVsZW1lbnQgd2l0aCBnaXZlbiB0YWdcbiAgICogUmV0dXJucyBmYWxzZSBpZiB0aGUgRElWIG5vZGUgY29udGFpbnMgbm9uLWVtcHR5IHRleHQgbm9kZXNcbiAgICogb3IgaWYgaXQgY29udGFpbnMgbm8gZWxlbWVudCB3aXRoIGdpdmVuIHRhZyBvciBtb3JlIHRoYW4gMSBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcGFyYW0gc3RyaW5nIHRhZyBvZiBjaGlsZCBlbGVtZW50XG4gICAqKi9cbiAgX2hhc1NpbmdsZVRhZ0luc2lkZUVsZW1lbnQoZWxlbWVudCwgdGFnKSB7XG4gICAgLy8gVGhlcmUgc2hvdWxkIGJlIGV4YWN0bHkgMSBlbGVtZW50IGNoaWxkIHdpdGggZ2l2ZW4gdGFnXG4gICAgaWYgKGVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoICE9IDEgfHwgZWxlbWVudC5jaGlsZHJlblswXS50YWdOYW1lICE9PSB0YWcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBBbmQgdGhlcmUgc2hvdWxkIGJlIG5vIHRleHQgbm9kZXMgd2l0aCByZWFsIGNvbnRlbnRcbiAgICByZXR1cm4gIXRoaXMuX3NvbWVOb2RlKGVsZW1lbnQuY2hpbGROb2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIG5vZGUubm9kZVR5cGUgPT09IHRoaXMuVEVYVF9OT0RFICYmXG4gICAgICAgIHRoaXMuUkVHRVhQUy5oYXNDb250ZW50LnRlc3Qobm9kZS50ZXh0Q29udGVudClcbiAgICAgICk7XG4gICAgfSk7XG4gIH0sXG5cbiAgX2lzRWxlbWVudFdpdGhvdXRDb250ZW50KG5vZGUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgbm9kZS5ub2RlVHlwZSA9PT0gdGhpcy5FTEVNRU5UX05PREUgJiZcbiAgICAgICFub2RlLnRleHRDb250ZW50LnRyaW0oKS5sZW5ndGggJiZcbiAgICAgICghbm9kZS5jaGlsZHJlbi5sZW5ndGggfHxcbiAgICAgICAgbm9kZS5jaGlsZHJlbi5sZW5ndGggPT1cbiAgICAgICAgICBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYnJcIikubGVuZ3RoICtcbiAgICAgICAgICAgIG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoclwiKS5sZW5ndGgpXG4gICAgKTtcbiAgfSxcblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHdoZXRoZXIgZWxlbWVudCBoYXMgYW55IGNoaWxkcmVuIGJsb2NrIGxldmVsIGVsZW1lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKi9cbiAgX2hhc0NoaWxkQmxvY2tFbGVtZW50KGVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5fc29tZU5vZGUoZWxlbWVudC5jaGlsZE5vZGVzLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy5ESVZfVE9fUF9FTEVNUy5oYXMobm9kZS50YWdOYW1lKSB8fFxuICAgICAgICB0aGlzLl9oYXNDaGlsZEJsb2NrRWxlbWVudChub2RlKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSxcblxuICAvKioqXG4gICAqIERldGVybWluZSBpZiBhIG5vZGUgcXVhbGlmaWVzIGFzIHBocmFzaW5nIGNvbnRlbnQuXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0d1aWRlL0hUTUwvQ29udGVudF9jYXRlZ29yaWVzI1BocmFzaW5nX2NvbnRlbnRcbiAgICoqL1xuICBfaXNQaHJhc2luZ0NvbnRlbnQobm9kZSkge1xuICAgIHJldHVybiAoXG4gICAgICBub2RlLm5vZGVUeXBlID09PSB0aGlzLlRFWFRfTk9ERSB8fFxuICAgICAgdGhpcy5QSFJBU0lOR19FTEVNUy5pbmNsdWRlcyhub2RlLnRhZ05hbWUpIHx8XG4gICAgICAoKG5vZGUudGFnTmFtZSA9PT0gXCJBXCIgfHxcbiAgICAgICAgbm9kZS50YWdOYW1lID09PSBcIkRFTFwiIHx8XG4gICAgICAgIG5vZGUudGFnTmFtZSA9PT0gXCJJTlNcIikgJiZcbiAgICAgICAgdGhpcy5fZXZlcnlOb2RlKG5vZGUuY2hpbGROb2RlcywgdGhpcy5faXNQaHJhc2luZ0NvbnRlbnQpKVxuICAgICk7XG4gIH0sXG5cbiAgX2lzV2hpdGVzcGFjZShub2RlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIChub2RlLm5vZGVUeXBlID09PSB0aGlzLlRFWFRfTk9ERSAmJlxuICAgICAgICBub2RlLnRleHRDb250ZW50LnRyaW0oKS5sZW5ndGggPT09IDApIHx8XG4gICAgICAobm9kZS5ub2RlVHlwZSA9PT0gdGhpcy5FTEVNRU5UX05PREUgJiYgbm9kZS50YWdOYW1lID09PSBcIkJSXCIpXG4gICAgKTtcbiAgfSxcblxuICAvKipcbiAgICogR2V0IHRoZSBpbm5lciB0ZXh0IG9mIGEgbm9kZSAtIGNyb3NzIGJyb3dzZXIgY29tcGF0aWJseS5cbiAgICogVGhpcyBhbHNvIHN0cmlwcyBvdXQgYW55IGV4Y2VzcyB3aGl0ZXNwYWNlIHRvIGJlIGZvdW5kLlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcGFyYW0gQm9vbGVhbiBub3JtYWxpemVTcGFjZXMgKGRlZmF1bHQ6IHRydWUpXG4gICAqIEByZXR1cm4gc3RyaW5nXG4gICAqKi9cbiAgX2dldElubmVyVGV4dChlLCBub3JtYWxpemVTcGFjZXMpIHtcbiAgICBub3JtYWxpemVTcGFjZXMgPVxuICAgICAgdHlwZW9mIG5vcm1hbGl6ZVNwYWNlcyA9PT0gXCJ1bmRlZmluZWRcIiA/IHRydWUgOiBub3JtYWxpemVTcGFjZXM7XG4gICAgdmFyIHRleHRDb250ZW50ID0gZS50ZXh0Q29udGVudC50cmltKCk7XG5cbiAgICBpZiAobm9ybWFsaXplU3BhY2VzKSB7XG4gICAgICByZXR1cm4gdGV4dENvbnRlbnQucmVwbGFjZSh0aGlzLlJFR0VYUFMubm9ybWFsaXplLCBcIiBcIik7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0Q29udGVudDtcbiAgfSxcblxuICAvKipcbiAgICogR2V0IHRoZSBudW1iZXIgb2YgdGltZXMgYSBzdHJpbmcgcyBhcHBlYXJzIGluIHRoZSBub2RlIGUuXG4gICAqXG4gICAqIEBwYXJhbSBFbGVtZW50XG4gICAqIEBwYXJhbSBzdHJpbmcgLSB3aGF0IHRvIHNwbGl0IG9uLiBEZWZhdWx0IGlzIFwiLFwiXG4gICAqIEByZXR1cm4gbnVtYmVyIChpbnRlZ2VyKVxuICAgKiovXG4gIF9nZXRDaGFyQ291bnQoZSwgcykge1xuICAgIHMgPSBzIHx8IFwiLFwiO1xuICAgIHJldHVybiB0aGlzLl9nZXRJbm5lclRleHQoZSkuc3BsaXQocykubGVuZ3RoIC0gMTtcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlIHRoZSBzdHlsZSBhdHRyaWJ1dGUgb24gZXZlcnkgZSBhbmQgdW5kZXIuXG4gICAqIFRPRE86IFRlc3QgaWYgZ2V0RWxlbWVudHNCeVRhZ05hbWUoKikgaXMgZmFzdGVyLlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICoqL1xuICBfY2xlYW5TdHlsZXMoZSkge1xuICAgIGlmICghZSB8fCBlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJzdmdcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSBgc3R5bGVgIGFuZCBkZXByZWNhdGVkIHByZXNlbnRhdGlvbmFsIGF0dHJpYnV0ZXNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuUFJFU0VOVEFUSU9OQUxfQVRUUklCVVRFUy5sZW5ndGg7IGkrKykge1xuICAgICAgZS5yZW1vdmVBdHRyaWJ1dGUodGhpcy5QUkVTRU5UQVRJT05BTF9BVFRSSUJVVEVTW2ldKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ERVBSRUNBVEVEX1NJWkVfQVRUUklCVVRFX0VMRU1TLmluY2x1ZGVzKGUudGFnTmFtZSkpIHtcbiAgICAgIGUucmVtb3ZlQXR0cmlidXRlKFwid2lkdGhcIik7XG4gICAgICBlLnJlbW92ZUF0dHJpYnV0ZShcImhlaWdodFwiKTtcbiAgICB9XG5cbiAgICB2YXIgY3VyID0gZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB3aGlsZSAoY3VyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9jbGVhblN0eWxlcyhjdXIpO1xuICAgICAgY3VyID0gY3VyLm5leHRFbGVtZW50U2libGluZztcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZGVuc2l0eSBvZiBsaW5rcyBhcyBhIHBlcmNlbnRhZ2Ugb2YgdGhlIGNvbnRlbnRcbiAgICogVGhpcyBpcyB0aGUgYW1vdW50IG9mIHRleHQgdGhhdCBpcyBpbnNpZGUgYSBsaW5rIGRpdmlkZWQgYnkgdGhlIHRvdGFsIHRleHQgaW4gdGhlIG5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSBFbGVtZW50XG4gICAqIEByZXR1cm4gbnVtYmVyIChmbG9hdClcbiAgICoqL1xuICBfZ2V0TGlua0RlbnNpdHkoZWxlbWVudCkge1xuICAgIHZhciB0ZXh0TGVuZ3RoID0gdGhpcy5fZ2V0SW5uZXJUZXh0KGVsZW1lbnQpLmxlbmd0aDtcbiAgICBpZiAodGV4dExlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgdmFyIGxpbmtMZW5ndGggPSAwO1xuXG4gICAgLy8gWFhYIGltcGxlbWVudCBfcmVkdWNlTm9kZUxpc3Q/XG4gICAgdGhpcy5fZm9yRWFjaE5vZGUoZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImFcIiksIGZ1bmN0aW9uIChsaW5rTm9kZSkge1xuICAgICAgdmFyIGhyZWYgPSBsaW5rTm9kZS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICAgICAgdmFyIGNvZWZmaWNpZW50ID0gaHJlZiAmJiB0aGlzLlJFR0VYUFMuaGFzaFVybC50ZXN0KGhyZWYpID8gMC4zIDogMTtcbiAgICAgIGxpbmtMZW5ndGggKz0gdGhpcy5fZ2V0SW5uZXJUZXh0KGxpbmtOb2RlKS5sZW5ndGggKiBjb2VmZmljaWVudDtcbiAgICB9KTtcblxuICAgIHJldHVybiBsaW5rTGVuZ3RoIC8gdGV4dExlbmd0aDtcbiAgfSxcblxuICAvKipcbiAgICogR2V0IGFuIGVsZW1lbnRzIGNsYXNzL2lkIHdlaWdodC4gVXNlcyByZWd1bGFyIGV4cHJlc3Npb25zIHRvIHRlbGwgaWYgdGhpc1xuICAgKiBlbGVtZW50IGxvb2tzIGdvb2Qgb3IgYmFkLlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcmV0dXJuIG51bWJlciAoSW50ZWdlcilcbiAgICoqL1xuICBfZ2V0Q2xhc3NXZWlnaHQoZSkge1xuICAgIGlmICghdGhpcy5fZmxhZ0lzQWN0aXZlKHRoaXMuRkxBR19XRUlHSFRfQ0xBU1NFUykpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHZhciB3ZWlnaHQgPSAwO1xuXG4gICAgLy8gTG9vayBmb3IgYSBzcGVjaWFsIGNsYXNzbmFtZVxuICAgIGlmICh0eXBlb2YgZS5jbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgZS5jbGFzc05hbWUgIT09IFwiXCIpIHtcbiAgICAgIGlmICh0aGlzLlJFR0VYUFMubmVnYXRpdmUudGVzdChlLmNsYXNzTmFtZSkpIHtcbiAgICAgICAgd2VpZ2h0IC09IDI1O1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5SRUdFWFBTLnBvc2l0aXZlLnRlc3QoZS5jbGFzc05hbWUpKSB7XG4gICAgICAgIHdlaWdodCArPSAyNTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBMb29rIGZvciBhIHNwZWNpYWwgSURcbiAgICBpZiAodHlwZW9mIGUuaWQgPT09IFwic3RyaW5nXCIgJiYgZS5pZCAhPT0gXCJcIikge1xuICAgICAgaWYgKHRoaXMuUkVHRVhQUy5uZWdhdGl2ZS50ZXN0KGUuaWQpKSB7XG4gICAgICAgIHdlaWdodCAtPSAyNTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuUkVHRVhQUy5wb3NpdGl2ZS50ZXN0KGUuaWQpKSB7XG4gICAgICAgIHdlaWdodCArPSAyNTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gd2VpZ2h0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBDbGVhbiBhIG5vZGUgb2YgYWxsIGVsZW1lbnRzIG9mIHR5cGUgXCJ0YWdcIi5cbiAgICogKFVubGVzcyBpdCdzIGEgeW91dHViZS92aW1lbyB2aWRlby4gUGVvcGxlIGxvdmUgbW92aWVzLilcbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHBhcmFtIHN0cmluZyB0YWcgdG8gY2xlYW5cbiAgICogQHJldHVybiB2b2lkXG4gICAqKi9cbiAgX2NsZWFuKGUsIHRhZykge1xuICAgIHZhciBpc0VtYmVkID0gW1wib2JqZWN0XCIsIFwiZW1iZWRcIiwgXCJpZnJhbWVcIl0uaW5jbHVkZXModGFnKTtcblxuICAgIHRoaXMuX3JlbW92ZU5vZGVzKHRoaXMuX2dldEFsbE5vZGVzV2l0aFRhZyhlLCBbdGFnXSksIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAvLyBBbGxvdyB5b3V0dWJlIGFuZCB2aW1lbyB2aWRlb3MgdGhyb3VnaCBhcyBwZW9wbGUgdXN1YWxseSB3YW50IHRvIHNlZSB0aG9zZS5cbiAgICAgIGlmIChpc0VtYmVkKSB7XG4gICAgICAgIC8vIEZpcnN0LCBjaGVjayB0aGUgZWxlbWVudHMgYXR0cmlidXRlcyB0byBzZWUgaWYgYW55IG9mIHRoZW0gY29udGFpbiB5b3V0dWJlIG9yIHZpbWVvXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2FsbG93ZWRWaWRlb1JlZ2V4LnRlc3QoZWxlbWVudC5hdHRyaWJ1dGVzW2ldLnZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZvciBlbWJlZCB3aXRoIDxvYmplY3Q+IHRhZywgY2hlY2sgaW5uZXIgSFRNTCBhcyB3ZWxsLlxuICAgICAgICBpZiAoXG4gICAgICAgICAgZWxlbWVudC50YWdOYW1lID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgdGhpcy5fYWxsb3dlZFZpZGVvUmVnZXgudGVzdChlbGVtZW50LmlubmVySFRNTClcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIGdpdmVuIG5vZGUgaGFzIG9uZSBvZiBpdHMgYW5jZXN0b3IgdGFnIG5hbWUgbWF0Y2hpbmcgdGhlXG4gICAqIHByb3ZpZGVkIG9uZS5cbiAgICogQHBhcmFtICBIVE1MRWxlbWVudCBub2RlXG4gICAqIEBwYXJhbSAgU3RyaW5nICAgICAgdGFnTmFtZVxuICAgKiBAcGFyYW0gIE51bWJlciAgICAgIG1heERlcHRoXG4gICAqIEBwYXJhbSAgRnVuY3Rpb24gICAgZmlsdGVyRm4gYSBmaWx0ZXIgdG8gaW52b2tlIHRvIGRldGVybWluZSB3aGV0aGVyIHRoaXMgbm9kZSAnY291bnRzJ1xuICAgKiBAcmV0dXJuIEJvb2xlYW5cbiAgICovXG4gIF9oYXNBbmNlc3RvclRhZyhub2RlLCB0YWdOYW1lLCBtYXhEZXB0aCwgZmlsdGVyRm4pIHtcbiAgICBtYXhEZXB0aCA9IG1heERlcHRoIHx8IDM7XG4gICAgdGFnTmFtZSA9IHRhZ05hbWUudG9VcHBlckNhc2UoKTtcbiAgICB2YXIgZGVwdGggPSAwO1xuICAgIHdoaWxlIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgIGlmIChtYXhEZXB0aCA+IDAgJiYgZGVwdGggPiBtYXhEZXB0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIG5vZGUucGFyZW50Tm9kZS50YWdOYW1lID09PSB0YWdOYW1lICYmXG4gICAgICAgICghZmlsdGVyRm4gfHwgZmlsdGVyRm4obm9kZS5wYXJlbnROb2RlKSlcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICBkZXB0aCsrO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybiBhbiBvYmplY3QgaW5kaWNhdGluZyBob3cgbWFueSByb3dzIGFuZCBjb2x1bW5zIHRoaXMgdGFibGUgaGFzLlxuICAgKi9cbiAgX2dldFJvd0FuZENvbHVtbkNvdW50KHRhYmxlKSB7XG4gICAgdmFyIHJvd3MgPSAwO1xuICAgIHZhciBjb2x1bW5zID0gMDtcbiAgICB2YXIgdHJzID0gdGFibGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0clwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHJvd3NwYW4gPSB0cnNbaV0uZ2V0QXR0cmlidXRlKFwicm93c3BhblwiKSB8fCAwO1xuICAgICAgaWYgKHJvd3NwYW4pIHtcbiAgICAgICAgcm93c3BhbiA9IHBhcnNlSW50KHJvd3NwYW4sIDEwKTtcbiAgICAgIH1cbiAgICAgIHJvd3MgKz0gcm93c3BhbiB8fCAxO1xuXG4gICAgICAvLyBOb3cgbG9vayBmb3IgY29sdW1uLXJlbGF0ZWQgaW5mb1xuICAgICAgdmFyIGNvbHVtbnNJblRoaXNSb3cgPSAwO1xuICAgICAgdmFyIGNlbGxzID0gdHJzW2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGRcIik7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNlbGxzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBjb2xzcGFuID0gY2VsbHNbal0uZ2V0QXR0cmlidXRlKFwiY29sc3BhblwiKSB8fCAwO1xuICAgICAgICBpZiAoY29sc3Bhbikge1xuICAgICAgICAgIGNvbHNwYW4gPSBwYXJzZUludChjb2xzcGFuLCAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgY29sdW1uc0luVGhpc1JvdyArPSBjb2xzcGFuIHx8IDE7XG4gICAgICB9XG4gICAgICBjb2x1bW5zID0gTWF0aC5tYXgoY29sdW1ucywgY29sdW1uc0luVGhpc1Jvdyk7XG4gICAgfVxuICAgIHJldHVybiB7IHJvd3MsIGNvbHVtbnMgfTtcbiAgfSxcblxuICAvKipcbiAgICogTG9vayBmb3IgJ2RhdGEnIChhcyBvcHBvc2VkIHRvICdsYXlvdXQnKSB0YWJsZXMsIGZvciB3aGljaCB3ZSB1c2VcbiAgICogc2ltaWxhciBjaGVja3MgYXNcbiAgICogaHR0cHM6Ly9zZWFyY2hmb3gub3JnL21vemlsbGEtY2VudHJhbC9yZXYvZjgyZDVjNTQ5ZjA0NmNiNjRjZTU2MDJiZmQ4OTRiN2FlODA3YzhmOC9hY2Nlc3NpYmxlL2dlbmVyaWMvVGFibGVBY2Nlc3NpYmxlLmNwcCMxOVxuICAgKi9cbiAgX21hcmtEYXRhVGFibGVzKHJvb3QpIHtcbiAgICB2YXIgdGFibGVzID0gcm9vdC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRhYmxlXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdGFibGUgPSB0YWJsZXNbaV07XG4gICAgICB2YXIgcm9sZSA9IHRhYmxlLmdldEF0dHJpYnV0ZShcInJvbGVcIik7XG4gICAgICBpZiAocm9sZSA9PSBcInByZXNlbnRhdGlvblwiKSB7XG4gICAgICAgIHRhYmxlLl9yZWFkYWJpbGl0eURhdGFUYWJsZSA9IGZhbHNlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciBkYXRhdGFibGUgPSB0YWJsZS5nZXRBdHRyaWJ1dGUoXCJkYXRhdGFibGVcIik7XG4gICAgICBpZiAoZGF0YXRhYmxlID09IFwiMFwiKSB7XG4gICAgICAgIHRhYmxlLl9yZWFkYWJpbGl0eURhdGFUYWJsZSA9IGZhbHNlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciBzdW1tYXJ5ID0gdGFibGUuZ2V0QXR0cmlidXRlKFwic3VtbWFyeVwiKTtcbiAgICAgIGlmIChzdW1tYXJ5KSB7XG4gICAgICAgIHRhYmxlLl9yZWFkYWJpbGl0eURhdGFUYWJsZSA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2FwdGlvbiA9IHRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiY2FwdGlvblwiKVswXTtcbiAgICAgIGlmIChjYXB0aW9uICYmIGNhcHRpb24uY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgdGFibGUuX3JlYWRhYmlsaXR5RGF0YVRhYmxlID0gdHJ1ZTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZSB0YWJsZSBoYXMgYSBkZXNjZW5kYW50IHdpdGggYW55IG9mIHRoZXNlIHRhZ3MsIGNvbnNpZGVyIGEgZGF0YSB0YWJsZTpcbiAgICAgIHZhciBkYXRhVGFibGVEZXNjZW5kYW50cyA9IFtcImNvbFwiLCBcImNvbGdyb3VwXCIsIFwidGZvb3RcIiwgXCJ0aGVhZFwiLCBcInRoXCJdO1xuICAgICAgdmFyIGRlc2NlbmRhbnRFeGlzdHMgPSBmdW5jdGlvbiAodGFnKSB7XG4gICAgICAgIHJldHVybiAhIXRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZylbMF07XG4gICAgICB9O1xuICAgICAgaWYgKGRhdGFUYWJsZURlc2NlbmRhbnRzLnNvbWUoZGVzY2VuZGFudEV4aXN0cykpIHtcbiAgICAgICAgdGhpcy5sb2coXCJEYXRhIHRhYmxlIGJlY2F1c2UgZm91bmQgZGF0YS15IGRlc2NlbmRhbnRcIik7XG4gICAgICAgIHRhYmxlLl9yZWFkYWJpbGl0eURhdGFUYWJsZSA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBOZXN0ZWQgdGFibGVzIGluZGljYXRlIGEgbGF5b3V0IHRhYmxlOlxuICAgICAgaWYgKHRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGFibGVcIilbMF0pIHtcbiAgICAgICAgdGFibGUuX3JlYWRhYmlsaXR5RGF0YVRhYmxlID0gZmFsc2U7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2l6ZUluZm8gPSB0aGlzLl9nZXRSb3dBbmRDb2x1bW5Db3VudCh0YWJsZSk7XG5cbiAgICAgIGlmIChzaXplSW5mby5jb2x1bW5zID09IDEgfHwgc2l6ZUluZm8ucm93cyA9PSAxKSB7XG4gICAgICAgIC8vIHNpbmdsZSBjb2x1bS9yb3cgdGFibGVzIGFyZSBjb21tb25seSB1c2VkIGZvciBwYWdlIGxheW91dCBwdXJwb3Nlcy5cbiAgICAgICAgdGFibGUuX3JlYWRhYmlsaXR5RGF0YVRhYmxlID0gZmFsc2U7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2l6ZUluZm8ucm93cyA+PSAxMCB8fCBzaXplSW5mby5jb2x1bW5zID4gNCkge1xuICAgICAgICB0YWJsZS5fcmVhZGFiaWxpdHlEYXRhVGFibGUgPSB0cnVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIC8vIE5vdyBqdXN0IGdvIGJ5IHNpemUgZW50aXJlbHk6XG4gICAgICB0YWJsZS5fcmVhZGFiaWxpdHlEYXRhVGFibGUgPSBzaXplSW5mby5yb3dzICogc2l6ZUluZm8uY29sdW1ucyA+IDEwO1xuICAgIH1cbiAgfSxcblxuICAvKiBjb252ZXJ0IGltYWdlcyBhbmQgZmlndXJlcyB0aGF0IGhhdmUgcHJvcGVydGllcyBsaWtlIGRhdGEtc3JjIGludG8gaW1hZ2VzIHRoYXQgY2FuIGJlIGxvYWRlZCB3aXRob3V0IEpTICovXG4gIF9maXhMYXp5SW1hZ2VzKHJvb3QpIHtcbiAgICB0aGlzLl9mb3JFYWNoTm9kZShcbiAgICAgIHRoaXMuX2dldEFsbE5vZGVzV2l0aFRhZyhyb290LCBbXCJpbWdcIiwgXCJwaWN0dXJlXCIsIFwiZmlndXJlXCJdKSxcbiAgICAgIGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIC8vIEluIHNvbWUgc2l0ZXMgKGUuZy4gS290YWt1KSwgdGhleSBwdXQgMXB4IHNxdWFyZSBpbWFnZSBhcyBiYXNlNjQgZGF0YSB1cmkgaW4gdGhlIHNyYyBhdHRyaWJ1dGUuXG4gICAgICAgIC8vIFNvLCBoZXJlIHdlIGNoZWNrIGlmIHRoZSBkYXRhIHVyaSBpcyB0b28gc2hvcnQsIGp1c3QgbWlnaHQgYXMgd2VsbCByZW1vdmUgaXQuXG4gICAgICAgIGlmIChlbGVtLnNyYyAmJiB0aGlzLlJFR0VYUFMuYjY0RGF0YVVybC50ZXN0KGVsZW0uc3JjKSkge1xuICAgICAgICAgIC8vIE1ha2Ugc3VyZSBpdCdzIG5vdCBTVkcsIGJlY2F1c2UgU1ZHIGNhbiBoYXZlIGEgbWVhbmluZ2Z1bCBpbWFnZSBpbiB1bmRlciAxMzMgYnl0ZXMuXG4gICAgICAgICAgdmFyIHBhcnRzID0gdGhpcy5SRUdFWFBTLmI2NERhdGFVcmwuZXhlYyhlbGVtLnNyYyk7XG4gICAgICAgICAgaWYgKHBhcnRzWzFdID09PSBcImltYWdlL3N2Zyt4bWxcIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGlzIGVsZW1lbnQgaGFzIG90aGVyIGF0dHJpYnV0ZXMgd2hpY2ggY29udGFpbnMgaW1hZ2UuXG4gICAgICAgICAgLy8gSWYgaXQgZG9lc24ndCwgdGhlbiB0aGlzIHNyYyBpcyBpbXBvcnRhbnQgYW5kIHNob3VsZG4ndCBiZSByZW1vdmVkLlxuICAgICAgICAgIHZhciBzcmNDb3VsZEJlUmVtb3ZlZCA9IGZhbHNlO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbS5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYXR0ciA9IGVsZW0uYXR0cmlidXRlc1tpXTtcbiAgICAgICAgICAgIGlmIChhdHRyLm5hbWUgPT09IFwic3JjXCIpIHtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgvXFwuKGpwZ3xqcGVnfHBuZ3x3ZWJwKS9pLnRlc3QoYXR0ci52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgc3JjQ291bGRCZVJlbW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBIZXJlIHdlIGFzc3VtZSBpZiBpbWFnZSBpcyBsZXNzIHRoYW4gMTAwIGJ5dGVzIChvciAxMzMgYWZ0ZXIgZW5jb2RlZCB0byBiYXNlNjQpXG4gICAgICAgICAgLy8gaXQgd2lsbCBiZSB0b28gc21hbGwsIHRoZXJlZm9yZSBpdCBtaWdodCBiZSBwbGFjZWhvbGRlciBpbWFnZS5cbiAgICAgICAgICBpZiAoc3JjQ291bGRCZVJlbW92ZWQpIHtcbiAgICAgICAgICAgIHZhciBiNjRzdGFydHMgPSBwYXJ0c1swXS5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgYjY0bGVuZ3RoID0gZWxlbS5zcmMubGVuZ3RoIC0gYjY0c3RhcnRzO1xuICAgICAgICAgICAgaWYgKGI2NGxlbmd0aCA8IDEzMykge1xuICAgICAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZShcInNyY1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbHNvIGNoZWNrIGZvciBcIm51bGxcIiB0byB3b3JrIGFyb3VuZCBodHRwczovL2dpdGh1Yi5jb20vanNkb20vanNkb20vaXNzdWVzLzI1ODBcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChlbGVtLnNyYyB8fCAoZWxlbS5zcmNzZXQgJiYgZWxlbS5zcmNzZXQgIT0gXCJudWxsXCIpKSAmJlxuICAgICAgICAgICFlbGVtLmNsYXNzTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKFwibGF6eVwiKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGVsZW0uYXR0cmlidXRlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGF0dHIgPSBlbGVtLmF0dHJpYnV0ZXNbal07XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgYXR0ci5uYW1lID09PSBcInNyY1wiIHx8XG4gICAgICAgICAgICBhdHRyLm5hbWUgPT09IFwic3Jjc2V0XCIgfHxcbiAgICAgICAgICAgIGF0dHIubmFtZSA9PT0gXCJhbHRcIlxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBjb3B5VG8gPSBudWxsO1xuICAgICAgICAgIGlmICgvXFwuKGpwZ3xqcGVnfHBuZ3x3ZWJwKVxccytcXGQvLnRlc3QoYXR0ci52YWx1ZSkpIHtcbiAgICAgICAgICAgIGNvcHlUbyA9IFwic3Jjc2V0XCI7XG4gICAgICAgICAgfSBlbHNlIGlmICgvXlxccypcXFMrXFwuKGpwZ3xqcGVnfHBuZ3x3ZWJwKVxcUypcXHMqJC8udGVzdChhdHRyLnZhbHVlKSkge1xuICAgICAgICAgICAgY29weVRvID0gXCJzcmNcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvcHlUbykge1xuICAgICAgICAgICAgLy9pZiB0aGlzIGlzIGFuIGltZyBvciBwaWN0dXJlLCBzZXQgdGhlIGF0dHJpYnV0ZSBkaXJlY3RseVxuICAgICAgICAgICAgaWYgKGVsZW0udGFnTmFtZSA9PT0gXCJJTUdcIiB8fCBlbGVtLnRhZ05hbWUgPT09IFwiUElDVFVSRVwiKSB7XG4gICAgICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGNvcHlUbywgYXR0ci52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICBlbGVtLnRhZ05hbWUgPT09IFwiRklHVVJFXCIgJiZcbiAgICAgICAgICAgICAgIXRoaXMuX2dldEFsbE5vZGVzV2l0aFRhZyhlbGVtLCBbXCJpbWdcIiwgXCJwaWN0dXJlXCJdKS5sZW5ndGhcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAvL2lmIHRoZSBpdGVtIGlzIGEgPGZpZ3VyZT4gdGhhdCBkb2VzIG5vdCBjb250YWluIGFuIGltYWdlIG9yIHBpY3R1cmUsIGNyZWF0ZSBvbmUgYW5kIHBsYWNlIGl0IGluc2lkZSB0aGUgZmlndXJlXG4gICAgICAgICAgICAgIC8vc2VlIHRoZSBueXRpbWVzLTMgdGVzdGNhc2UgZm9yIGFuIGV4YW1wbGVcbiAgICAgICAgICAgICAgdmFyIGltZyA9IHRoaXMuX2RvYy5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKGNvcHlUbywgYXR0ci52YWx1ZSk7XG4gICAgICAgICAgICAgIGVsZW0uYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9LFxuXG4gIF9nZXRUZXh0RGVuc2l0eShlLCB0YWdzKSB7XG4gICAgdmFyIHRleHRMZW5ndGggPSB0aGlzLl9nZXRJbm5lclRleHQoZSwgdHJ1ZSkubGVuZ3RoO1xuICAgIGlmICh0ZXh0TGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gMDtcbiAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcoZSwgdGFncyk7XG4gICAgdGhpcy5fZm9yRWFjaE5vZGUoXG4gICAgICBjaGlsZHJlbixcbiAgICAgIGNoaWxkID0+IChjaGlsZHJlbkxlbmd0aCArPSB0aGlzLl9nZXRJbm5lclRleHQoY2hpbGQsIHRydWUpLmxlbmd0aClcbiAgICApO1xuICAgIHJldHVybiBjaGlsZHJlbkxlbmd0aCAvIHRleHRMZW5ndGg7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENsZWFuIGFuIGVsZW1lbnQgb2YgYWxsIHRhZ3Mgb2YgdHlwZSBcInRhZ1wiIGlmIHRoZXkgbG9vayBmaXNoeS5cbiAgICogXCJGaXNoeVwiIGlzIGFuIGFsZ29yaXRobSBiYXNlZCBvbiBjb250ZW50IGxlbmd0aCwgY2xhc3NuYW1lcywgbGluayBkZW5zaXR5LCBudW1iZXIgb2YgaW1hZ2VzICYgZW1iZWRzLCBldGMuXG4gICAqXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKiovXG4gIF9jbGVhbkNvbmRpdGlvbmFsbHkoZSwgdGFnKSB7XG4gICAgaWYgKCF0aGlzLl9mbGFnSXNBY3RpdmUodGhpcy5GTEFHX0NMRUFOX0NPTkRJVElPTkFMTFkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gR2F0aGVyIGNvdW50cyBmb3Igb3RoZXIgdHlwaWNhbCBlbGVtZW50cyBlbWJlZGRlZCB3aXRoaW4uXG4gICAgLy8gVHJhdmVyc2UgYmFja3dhcmRzIHNvIHdlIGNhbiByZW1vdmUgbm9kZXMgYXQgdGhlIHNhbWUgdGltZVxuICAgIC8vIHdpdGhvdXQgZWZmZWN0aW5nIHRoZSB0cmF2ZXJzYWwuXG4gICAgLy9cbiAgICAvLyBUT0RPOiBDb25zaWRlciB0YWtpbmcgaW50byBhY2NvdW50IG9yaWdpbmFsIGNvbnRlbnRTY29yZSBoZXJlLlxuICAgIHRoaXMuX3JlbW92ZU5vZGVzKHRoaXMuX2dldEFsbE5vZGVzV2l0aFRhZyhlLCBbdGFnXSksIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAvLyBGaXJzdCBjaGVjayBpZiB0aGlzIG5vZGUgSVMgZGF0YSB0YWJsZSwgaW4gd2hpY2ggY2FzZSBkb24ndCByZW1vdmUgaXQuXG4gICAgICB2YXIgaXNEYXRhVGFibGUgPSBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdC5fcmVhZGFiaWxpdHlEYXRhVGFibGU7XG4gICAgICB9O1xuXG4gICAgICB2YXIgaXNMaXN0ID0gdGFnID09PSBcInVsXCIgfHwgdGFnID09PSBcIm9sXCI7XG4gICAgICBpZiAoIWlzTGlzdCkge1xuICAgICAgICB2YXIgbGlzdExlbmd0aCA9IDA7XG4gICAgICAgIHZhciBsaXN0Tm9kZXMgPSB0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcobm9kZSwgW1widWxcIiwgXCJvbFwiXSk7XG4gICAgICAgIHRoaXMuX2ZvckVhY2hOb2RlKFxuICAgICAgICAgIGxpc3ROb2RlcyxcbiAgICAgICAgICBsaXN0ID0+IChsaXN0TGVuZ3RoICs9IHRoaXMuX2dldElubmVyVGV4dChsaXN0KS5sZW5ndGgpXG4gICAgICAgICk7XG4gICAgICAgIGlzTGlzdCA9IGxpc3RMZW5ndGggLyB0aGlzLl9nZXRJbm5lclRleHQobm9kZSkubGVuZ3RoID4gMC45O1xuICAgICAgfVxuXG4gICAgICBpZiAodGFnID09PSBcInRhYmxlXCIgJiYgaXNEYXRhVGFibGUobm9kZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBOZXh0IGNoZWNrIGlmIHdlJ3JlIGluc2lkZSBhIGRhdGEgdGFibGUsIGluIHdoaWNoIGNhc2UgZG9uJ3QgcmVtb3ZlIGl0IGFzIHdlbGwuXG4gICAgICBpZiAodGhpcy5faGFzQW5jZXN0b3JUYWcobm9kZSwgXCJ0YWJsZVwiLCAtMSwgaXNEYXRhVGFibGUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2hhc0FuY2VzdG9yVGFnKG5vZGUsIFwiY29kZVwiKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIGtlZXAgZWxlbWVudCBpZiBpdCBoYXMgYSBkYXRhIHRhYmxlc1xuICAgICAgaWYgKFxuICAgICAgICBbLi4ubm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRhYmxlXCIpXS5zb21lKFxuICAgICAgICAgIHRibCA9PiB0YmwuX3JlYWRhYmlsaXR5RGF0YVRhYmxlXG4gICAgICAgIClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciB3ZWlnaHQgPSB0aGlzLl9nZXRDbGFzc1dlaWdodChub2RlKTtcblxuICAgICAgdGhpcy5sb2coXCJDbGVhbmluZyBDb25kaXRpb25hbGx5XCIsIG5vZGUpO1xuXG4gICAgICB2YXIgY29udGVudFNjb3JlID0gMDtcblxuICAgICAgaWYgKHdlaWdodCArIGNvbnRlbnRTY29yZSA8IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9nZXRDaGFyQ291bnQobm9kZSwgXCIsXCIpIDwgMTApIHtcbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vdCB2ZXJ5IG1hbnkgY29tbWFzLCBhbmQgdGhlIG51bWJlciBvZlxuICAgICAgICAvLyBub24tcGFyYWdyYXBoIGVsZW1lbnRzIGlzIG1vcmUgdGhhbiBwYXJhZ3JhcGhzIG9yIG90aGVyXG4gICAgICAgIC8vIG9taW5vdXMgc2lnbnMsIHJlbW92ZSB0aGUgZWxlbWVudC5cbiAgICAgICAgdmFyIHAgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicFwiKS5sZW5ndGg7XG4gICAgICAgIHZhciBpbWcgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW1nXCIpLmxlbmd0aDtcbiAgICAgICAgdmFyIGxpID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpXCIpLmxlbmd0aCAtIDEwMDtcbiAgICAgICAgdmFyIGlucHV0ID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpLmxlbmd0aDtcbiAgICAgICAgdmFyIGhlYWRpbmdEZW5zaXR5ID0gdGhpcy5fZ2V0VGV4dERlbnNpdHkobm9kZSwgW1xuICAgICAgICAgIFwiaDFcIixcbiAgICAgICAgICBcImgyXCIsXG4gICAgICAgICAgXCJoM1wiLFxuICAgICAgICAgIFwiaDRcIixcbiAgICAgICAgICBcImg1XCIsXG4gICAgICAgICAgXCJoNlwiLFxuICAgICAgICBdKTtcblxuICAgICAgICB2YXIgZW1iZWRDb3VudCA9IDA7XG4gICAgICAgIHZhciBlbWJlZHMgPSB0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcobm9kZSwgW1xuICAgICAgICAgIFwib2JqZWN0XCIsXG4gICAgICAgICAgXCJlbWJlZFwiLFxuICAgICAgICAgIFwiaWZyYW1lXCIsXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW1iZWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgLy8gSWYgdGhpcyBlbWJlZCBoYXMgYXR0cmlidXRlIHRoYXQgbWF0Y2hlcyB2aWRlbyByZWdleCwgZG9uJ3QgZGVsZXRlIGl0LlxuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZW1iZWRzW2ldLmF0dHJpYnV0ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hbGxvd2VkVmlkZW9SZWdleC50ZXN0KGVtYmVkc1tpXS5hdHRyaWJ1dGVzW2pdLnZhbHVlKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRm9yIGVtYmVkIHdpdGggPG9iamVjdD4gdGFnLCBjaGVjayBpbm5lciBIVE1MIGFzIHdlbGwuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZW1iZWRzW2ldLnRhZ05hbWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIHRoaXMuX2FsbG93ZWRWaWRlb1JlZ2V4LnRlc3QoZW1iZWRzW2ldLmlubmVySFRNTClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlbWJlZENvdW50Kys7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW5uZXJUZXh0ID0gdGhpcy5fZ2V0SW5uZXJUZXh0KG5vZGUpO1xuXG4gICAgICAgIC8vIHRvc3MgYW55IG5vZGUgd2hvc2UgaW5uZXIgdGV4dCBjb250YWlucyBub3RoaW5nIGJ1dCBzdXNwaWNpb3VzIHdvcmRzXG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLlJFR0VYUFMuYWRXb3Jkcy50ZXN0KGlubmVyVGV4dCkgfHxcbiAgICAgICAgICB0aGlzLlJFR0VYUFMubG9hZGluZ1dvcmRzLnRlc3QoaW5uZXJUZXh0KVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb250ZW50TGVuZ3RoID0gaW5uZXJUZXh0Lmxlbmd0aDtcbiAgICAgICAgdmFyIGxpbmtEZW5zaXR5ID0gdGhpcy5fZ2V0TGlua0RlbnNpdHkobm9kZSk7XG4gICAgICAgIHZhciB0ZXh0aXNoVGFncyA9IFtcIlNQQU5cIiwgXCJMSVwiLCBcIlREXCJdLmNvbmNhdChcbiAgICAgICAgICBBcnJheS5mcm9tKHRoaXMuRElWX1RPX1BfRUxFTVMpXG4gICAgICAgICk7XG4gICAgICAgIHZhciB0ZXh0RGVuc2l0eSA9IHRoaXMuX2dldFRleHREZW5zaXR5KG5vZGUsIHRleHRpc2hUYWdzKTtcbiAgICAgICAgdmFyIGlzRmlndXJlQ2hpbGQgPSB0aGlzLl9oYXNBbmNlc3RvclRhZyhub2RlLCBcImZpZ3VyZVwiKTtcblxuICAgICAgICAvLyBhcHBseSBzaGFkaW5lc3MgY2hlY2tzLCB0aGVuIGNoZWNrIGZvciBleGNlcHRpb25zXG4gICAgICAgIGNvbnN0IHNob3VsZFJlbW92ZU5vZGUgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZXJycyA9IFtdO1xuICAgICAgICAgIGlmICghaXNGaWd1cmVDaGlsZCAmJiBpbWcgPiAxICYmIHAgLyBpbWcgPCAwLjUpIHtcbiAgICAgICAgICAgIGVycnMucHVzaChgQmFkIHAgdG8gaW1nIHJhdGlvIChpbWc9JHtpbWd9LCBwPSR7cH0pYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghaXNMaXN0ICYmIGxpID4gcCkge1xuICAgICAgICAgICAgZXJycy5wdXNoKGBUb28gbWFueSBsaSdzIG91dHNpZGUgb2YgYSBsaXN0LiAobGk9JHtsaX0gPiBwPSR7cH0pYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpbnB1dCA+IE1hdGguZmxvb3IocCAvIDMpKSB7XG4gICAgICAgICAgICBlcnJzLnB1c2goYFRvbyBtYW55IGlucHV0cyBwZXIgcC4gKGlucHV0PSR7aW5wdXR9LCBwPSR7cH0pYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFpc0xpc3QgJiZcbiAgICAgICAgICAgICFpc0ZpZ3VyZUNoaWxkICYmXG4gICAgICAgICAgICBoZWFkaW5nRGVuc2l0eSA8IDAuOSAmJlxuICAgICAgICAgICAgY29udGVudExlbmd0aCA8IDI1ICYmXG4gICAgICAgICAgICAoaW1nID09PSAwIHx8IGltZyA+IDIpICYmXG4gICAgICAgICAgICBsaW5rRGVuc2l0eSA+IDBcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGVycnMucHVzaChcbiAgICAgICAgICAgICAgYFN1c3BpY2lvdXNseSBzaG9ydC4gKGhlYWRpbmdEZW5zaXR5PSR7aGVhZGluZ0RlbnNpdHl9LCBpbWc9JHtpbWd9LCBsaW5rRGVuc2l0eT0ke2xpbmtEZW5zaXR5fSlgXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhaXNMaXN0ICYmXG4gICAgICAgICAgICB3ZWlnaHQgPCAyNSAmJlxuICAgICAgICAgICAgbGlua0RlbnNpdHkgPiAwLjIgKyB0aGlzLl9saW5rRGVuc2l0eU1vZGlmaWVyXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBlcnJzLnB1c2goXG4gICAgICAgICAgICAgIGBMb3cgd2VpZ2h0IGFuZCBhIGxpdHRsZSBsaW5reS4gKGxpbmtEZW5zaXR5PSR7bGlua0RlbnNpdHl9KWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh3ZWlnaHQgPj0gMjUgJiYgbGlua0RlbnNpdHkgPiAwLjUgKyB0aGlzLl9saW5rRGVuc2l0eU1vZGlmaWVyKSB7XG4gICAgICAgICAgICBlcnJzLnB1c2goXG4gICAgICAgICAgICAgIGBIaWdoIHdlaWdodCBhbmQgbW9zdGx5IGxpbmtzLiAobGlua0RlbnNpdHk9JHtsaW5rRGVuc2l0eX0pYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKChlbWJlZENvdW50ID09PSAxICYmIGNvbnRlbnRMZW5ndGggPCA3NSkgfHwgZW1iZWRDb3VudCA+IDEpIHtcbiAgICAgICAgICAgIGVycnMucHVzaChcbiAgICAgICAgICAgICAgYFN1c3BpY2lvdXMgZW1iZWQuIChlbWJlZENvdW50PSR7ZW1iZWRDb3VudH0sIGNvbnRlbnRMZW5ndGg9JHtjb250ZW50TGVuZ3RofSlgXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaW1nID09PSAwICYmIHRleHREZW5zaXR5ID09PSAwKSB7XG4gICAgICAgICAgICBlcnJzLnB1c2goXG4gICAgICAgICAgICAgIGBObyB1c2VmdWwgY29udGVudC4gKGltZz0ke2ltZ30sIHRleHREZW5zaXR5PSR7dGV4dERlbnNpdHl9KWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGVycnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIkNoZWNrcyBmYWlsZWRcIiwgZXJycyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGhhdmVUb1JlbW92ZSA9IHNob3VsZFJlbW92ZU5vZGUoKTtcblxuICAgICAgICAvLyBBbGxvdyBzaW1wbGUgbGlzdHMgb2YgaW1hZ2VzIHRvIHJlbWFpbiBpbiBwYWdlc1xuICAgICAgICBpZiAoaXNMaXN0ICYmIGhhdmVUb1JlbW92ZSkge1xuICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgbGV0IGNoaWxkID0gbm9kZS5jaGlsZHJlblt4XTtcbiAgICAgICAgICAgIC8vIERvbid0IGZpbHRlciBpbiBsaXN0cyB3aXRoIGxpJ3MgdGhhdCBjb250YWluIG1vcmUgdGhhbiBvbmUgY2hpbGRcbiAgICAgICAgICAgIGlmIChjaGlsZC5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYXZlVG9SZW1vdmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBsaV9jb3VudCA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaVwiKS5sZW5ndGg7XG4gICAgICAgICAgLy8gT25seSBhbGxvdyB0aGUgbGlzdCB0byByZW1haW4gaWYgZXZlcnkgbGkgY29udGFpbnMgYW4gaW1hZ2VcbiAgICAgICAgICBpZiAoaW1nID09IGxpX2NvdW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYXZlVG9SZW1vdmU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENsZWFuIG91dCBlbGVtZW50cyB0aGF0IG1hdGNoIHRoZSBzcGVjaWZpZWQgY29uZGl0aW9uc1xuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcGFyYW0gRnVuY3Rpb24gZGV0ZXJtaW5lcyB3aGV0aGVyIGEgbm9kZSBzaG91bGQgYmUgcmVtb3ZlZFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICoqL1xuICBfY2xlYW5NYXRjaGVkTm9kZXMoZSwgZmlsdGVyKSB7XG4gICAgdmFyIGVuZE9mU2VhcmNoTWFya2VyTm9kZSA9IHRoaXMuX2dldE5leHROb2RlKGUsIHRydWUpO1xuICAgIHZhciBuZXh0ID0gdGhpcy5fZ2V0TmV4dE5vZGUoZSk7XG4gICAgd2hpbGUgKG5leHQgJiYgbmV4dCAhPSBlbmRPZlNlYXJjaE1hcmtlck5vZGUpIHtcbiAgICAgIGlmIChmaWx0ZXIuY2FsbCh0aGlzLCBuZXh0LCBuZXh0LmNsYXNzTmFtZSArIFwiIFwiICsgbmV4dC5pZCkpIHtcbiAgICAgICAgbmV4dCA9IHRoaXMuX3JlbW92ZUFuZEdldE5leHQobmV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXh0ID0gdGhpcy5fZ2V0TmV4dE5vZGUobmV4dCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDbGVhbiBvdXQgc3B1cmlvdXMgaGVhZGVycyBmcm9tIGFuIEVsZW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSBFbGVtZW50XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKiovXG4gIF9jbGVhbkhlYWRlcnMoZSkge1xuICAgIGxldCBoZWFkaW5nTm9kZXMgPSB0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcoZSwgW1wiaDFcIiwgXCJoMlwiXSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXMoaGVhZGluZ05vZGVzLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgbGV0IHNob3VsZFJlbW92ZSA9IHRoaXMuX2dldENsYXNzV2VpZ2h0KG5vZGUpIDwgMDtcbiAgICAgIGlmIChzaG91bGRSZW1vdmUpIHtcbiAgICAgICAgdGhpcy5sb2coXCJSZW1vdmluZyBoZWFkZXIgd2l0aCBsb3cgY2xhc3Mgd2VpZ2h0OlwiLCBub2RlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzaG91bGRSZW1vdmU7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoaXMgbm9kZSBpcyBhbiBIMSBvciBIMiBlbGVtZW50IHdob3NlIGNvbnRlbnQgaXMgbW9zdGx5XG4gICAqIHRoZSBzYW1lIGFzIHRoZSBhcnRpY2xlIHRpdGxlLlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudCAgdGhlIG5vZGUgdG8gY2hlY2suXG4gICAqIEByZXR1cm4gYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhpcyBpcyBhIHRpdGxlLWxpa2UgaGVhZGVyLlxuICAgKi9cbiAgX2hlYWRlckR1cGxpY2F0ZXNUaXRsZShub2RlKSB7XG4gICAgaWYgKG5vZGUudGFnTmFtZSAhPSBcIkgxXCIgJiYgbm9kZS50YWdOYW1lICE9IFwiSDJcIikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgaGVhZGluZyA9IHRoaXMuX2dldElubmVyVGV4dChub2RlLCBmYWxzZSk7XG4gICAgdGhpcy5sb2coXCJFdmFsdWF0aW5nIHNpbWlsYXJpdHkgb2YgaGVhZGVyOlwiLCBoZWFkaW5nLCB0aGlzLl9hcnRpY2xlVGl0bGUpO1xuICAgIHJldHVybiB0aGlzLl90ZXh0U2ltaWxhcml0eSh0aGlzLl9hcnRpY2xlVGl0bGUsIGhlYWRpbmcpID4gMC43NTtcbiAgfSxcblxuICBfZmxhZ0lzQWN0aXZlKGZsYWcpIHtcbiAgICByZXR1cm4gKHRoaXMuX2ZsYWdzICYgZmxhZykgPiAwO1xuICB9LFxuXG4gIF9yZW1vdmVGbGFnKGZsYWcpIHtcbiAgICB0aGlzLl9mbGFncyA9IHRoaXMuX2ZsYWdzICYgfmZsYWc7XG4gIH0sXG5cbiAgX2lzUHJvYmFibHlWaXNpYmxlKG5vZGUpIHtcbiAgICAvLyBIYXZlIHRvIG51bGwtY2hlY2sgbm9kZS5zdHlsZSBhbmQgbm9kZS5jbGFzc05hbWUuaW5jbHVkZXMgdG8gZGVhbCB3aXRoIFNWRyBhbmQgTWF0aE1MIG5vZGVzLlxuICAgIHJldHVybiAoXG4gICAgICAoIW5vZGUuc3R5bGUgfHwgbm9kZS5zdHlsZS5kaXNwbGF5ICE9IFwibm9uZVwiKSAmJlxuICAgICAgKCFub2RlLnN0eWxlIHx8IG5vZGUuc3R5bGUudmlzaWJpbGl0eSAhPSBcImhpZGRlblwiKSAmJlxuICAgICAgIW5vZGUuaGFzQXR0cmlidXRlKFwiaGlkZGVuXCIpICYmXG4gICAgICAvL2NoZWNrIGZvciBcImZhbGxiYWNrLWltYWdlXCIgc28gdGhhdCB3aWtpbWVkaWEgbWF0aCBpbWFnZXMgYXJlIGRpc3BsYXllZFxuICAgICAgKCFub2RlLmhhc0F0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIpIHx8XG4gICAgICAgIG5vZGUuZ2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIikgIT0gXCJ0cnVlXCIgfHxcbiAgICAgICAgKG5vZGUuY2xhc3NOYW1lICYmXG4gICAgICAgICAgbm9kZS5jbGFzc05hbWUuaW5jbHVkZXMgJiZcbiAgICAgICAgICBub2RlLmNsYXNzTmFtZS5pbmNsdWRlcyhcImZhbGxiYWNrLWltYWdlXCIpKSlcbiAgICApO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSdW5zIHJlYWRhYmlsaXR5LlxuICAgKlxuICAgKiBXb3JrZmxvdzpcbiAgICogIDEuIFByZXAgdGhlIGRvY3VtZW50IGJ5IHJlbW92aW5nIHNjcmlwdCB0YWdzLCBjc3MsIGV0Yy5cbiAgICogIDIuIEJ1aWxkIHJlYWRhYmlsaXR5J3MgRE9NIHRyZWUuXG4gICAqICAzLiBHcmFiIHRoZSBhcnRpY2xlIGNvbnRlbnQgZnJvbSB0aGUgY3VycmVudCBkb20gdHJlZS5cbiAgICogIDQuIFJlcGxhY2UgdGhlIGN1cnJlbnQgRE9NIHRyZWUgd2l0aCB0aGUgbmV3IG9uZS5cbiAgICogIDUuIFJlYWQgcGVhY2VmdWxseS5cbiAgICpcbiAgICogQHJldHVybiB2b2lkXG4gICAqKi9cbiAgcGFyc2UoKSB7XG4gICAgLy8gQXZvaWQgcGFyc2luZyB0b28gbGFyZ2UgZG9jdW1lbnRzLCBhcyBwZXIgY29uZmlndXJhdGlvbiBvcHRpb25cbiAgICBpZiAodGhpcy5fbWF4RWxlbXNUb1BhcnNlID4gMCkge1xuICAgICAgdmFyIG51bVRhZ3MgPSB0aGlzLl9kb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpLmxlbmd0aDtcbiAgICAgIGlmIChudW1UYWdzID4gdGhpcy5fbWF4RWxlbXNUb1BhcnNlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBcIkFib3J0aW5nIHBhcnNpbmcgZG9jdW1lbnQ7IFwiICsgbnVtVGFncyArIFwiIGVsZW1lbnRzIGZvdW5kXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBVbndyYXAgaW1hZ2UgZnJvbSBub3NjcmlwdFxuICAgIHRoaXMuX3Vud3JhcE5vc2NyaXB0SW1hZ2VzKHRoaXMuX2RvYyk7XG5cbiAgICAvLyBFeHRyYWN0IEpTT04tTEQgbWV0YWRhdGEgYmVmb3JlIHJlbW92aW5nIHNjcmlwdHNcbiAgICB2YXIganNvbkxkID0gdGhpcy5fZGlzYWJsZUpTT05MRCA/IHt9IDogdGhpcy5fZ2V0SlNPTkxEKHRoaXMuX2RvYyk7XG5cbiAgICAvLyBSZW1vdmUgc2NyaXB0IHRhZ3MgZnJvbSB0aGUgZG9jdW1lbnQuXG4gICAgdGhpcy5fcmVtb3ZlU2NyaXB0cyh0aGlzLl9kb2MpO1xuXG4gICAgdGhpcy5fcHJlcERvY3VtZW50KCk7XG5cbiAgICB2YXIgbWV0YWRhdGEgPSB0aGlzLl9nZXRBcnRpY2xlTWV0YWRhdGEoanNvbkxkKTtcbiAgICB0aGlzLl9tZXRhZGF0YSA9IG1ldGFkYXRhO1xuICAgIHRoaXMuX2FydGljbGVUaXRsZSA9IG1ldGFkYXRhLnRpdGxlO1xuXG4gICAgdmFyIGFydGljbGVDb250ZW50ID0gdGhpcy5fZ3JhYkFydGljbGUoKTtcbiAgICBpZiAoIWFydGljbGVDb250ZW50KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLmxvZyhcIkdyYWJiZWQ6IFwiICsgYXJ0aWNsZUNvbnRlbnQuaW5uZXJIVE1MKTtcblxuICAgIHRoaXMuX3Bvc3RQcm9jZXNzQ29udGVudChhcnRpY2xlQ29udGVudCk7XG5cbiAgICAvLyBJZiB3ZSBoYXZlbid0IGZvdW5kIGFuIGV4Y2VycHQgaW4gdGhlIGFydGljbGUncyBtZXRhZGF0YSwgdXNlIHRoZSBhcnRpY2xlJ3NcbiAgICAvLyBmaXJzdCBwYXJhZ3JhcGggYXMgdGhlIGV4Y2VycHQuIFRoaXMgaXMgdXNlZCBmb3IgZGlzcGxheWluZyBhIHByZXZpZXcgb2ZcbiAgICAvLyB0aGUgYXJ0aWNsZSdzIGNvbnRlbnQuXG4gICAgaWYgKCFtZXRhZGF0YS5leGNlcnB0KSB7XG4gICAgICB2YXIgcGFyYWdyYXBocyA9IGFydGljbGVDb250ZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicFwiKTtcbiAgICAgIGlmIChwYXJhZ3JhcGhzLmxlbmd0aCkge1xuICAgICAgICBtZXRhZGF0YS5leGNlcnB0ID0gcGFyYWdyYXBoc1swXS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHRleHRDb250ZW50ID0gYXJ0aWNsZUNvbnRlbnQudGV4dENvbnRlbnQ7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aGlzLl9hcnRpY2xlVGl0bGUsXG4gICAgICBieWxpbmU6IG1ldGFkYXRhLmJ5bGluZSB8fCB0aGlzLl9hcnRpY2xlQnlsaW5lLFxuICAgICAgZGlyOiB0aGlzLl9hcnRpY2xlRGlyLFxuICAgICAgbGFuZzogdGhpcy5fYXJ0aWNsZUxhbmcsXG4gICAgICBjb250ZW50OiB0aGlzLl9zZXJpYWxpemVyKGFydGljbGVDb250ZW50KSxcbiAgICAgIHRleHRDb250ZW50LFxuICAgICAgbGVuZ3RoOiB0ZXh0Q29udGVudC5sZW5ndGgsXG4gICAgICBleGNlcnB0OiBtZXRhZGF0YS5leGNlcnB0LFxuICAgICAgc2l0ZU5hbWU6IG1ldGFkYXRhLnNpdGVOYW1lIHx8IHRoaXMuX2FydGljbGVTaXRlTmFtZSxcbiAgICAgIHB1Ymxpc2hlZFRpbWU6IG1ldGFkYXRhLnB1Ymxpc2hlZFRpbWUsXG4gICAgfTtcbiAgfSxcbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZWRlY2xhcmUgKi9cbiAgLyogZ2xvYmFsIG1vZHVsZSAqL1xuICBtb2R1bGUuZXhwb3J0cyA9IFJlYWRhYmlsaXR5O1xufVxuIiwiLypcbiAqIENvcHlyaWdodCAoYykgMjAxMCBBcmM5MCBJbmNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLypcbiAqIFRoaXMgY29kZSBpcyBoZWF2aWx5IGJhc2VkIG9uIEFyYzkwJ3MgcmVhZGFiaWxpdHkuanMgKDEuNy4xKSBzY3JpcHRcbiAqIGF2YWlsYWJsZSBhdDogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2FyYzkwbGFicy1yZWFkYWJpbGl0eVxuICovXG5cbnZhciBSRUdFWFBTID0ge1xuICAvLyBOT1RFOiBUaGVzZSB0d28gcmVndWxhciBleHByZXNzaW9ucyBhcmUgZHVwbGljYXRlZCBpblxuICAvLyBSZWFkYWJpbGl0eS5qcy4gUGxlYXNlIGtlZXAgYm90aCBjb3BpZXMgaW4gc3luYy5cbiAgdW5saWtlbHlDYW5kaWRhdGVzOlxuICAgIC8tYWQtfGFpMmh0bWx8YmFubmVyfGJyZWFkY3J1bWJzfGNvbWJ4fGNvbW1lbnR8Y29tbXVuaXR5fGNvdmVyLXdyYXB8ZGlzcXVzfGV4dHJhfGZvb3RlcnxnZHByfGhlYWRlcnxsZWdlbmRzfG1lbnV8cmVsYXRlZHxyZW1hcmt8cmVwbGllc3xyc3N8c2hvdXRib3h8c2lkZWJhcnxza3lzY3JhcGVyfHNvY2lhbHxzcG9uc29yfHN1cHBsZW1lbnRhbHxhZC1icmVha3xhZ2VnYXRlfHBhZ2luYXRpb258cGFnZXJ8cG9wdXB8eW9tLXJlbW90ZS9pLFxuICBva01heWJlSXRzQUNhbmRpZGF0ZTogL2FuZHxhcnRpY2xlfGJvZHl8Y29sdW1ufGNvbnRlbnR8bWFpbnxzaGFkb3cvaSxcbn07XG5cbmZ1bmN0aW9uIGlzTm9kZVZpc2libGUobm9kZSkge1xuICAvLyBIYXZlIHRvIG51bGwtY2hlY2sgbm9kZS5zdHlsZSBhbmQgbm9kZS5jbGFzc05hbWUuaW5jbHVkZXMgdG8gZGVhbCB3aXRoIFNWRyBhbmQgTWF0aE1MIG5vZGVzLlxuICByZXR1cm4gKFxuICAgICghbm9kZS5zdHlsZSB8fCBub2RlLnN0eWxlLmRpc3BsYXkgIT0gXCJub25lXCIpICYmXG4gICAgIW5vZGUuaGFzQXR0cmlidXRlKFwiaGlkZGVuXCIpICYmXG4gICAgLy9jaGVjayBmb3IgXCJmYWxsYmFjay1pbWFnZVwiIHNvIHRoYXQgd2lraW1lZGlhIG1hdGggaW1hZ2VzIGFyZSBkaXNwbGF5ZWRcbiAgICAoIW5vZGUuaGFzQXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIikgfHxcbiAgICAgIG5vZGUuZ2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIikgIT0gXCJ0cnVlXCIgfHxcbiAgICAgIChub2RlLmNsYXNzTmFtZSAmJlxuICAgICAgICBub2RlLmNsYXNzTmFtZS5pbmNsdWRlcyAmJlxuICAgICAgICBub2RlLmNsYXNzTmFtZS5pbmNsdWRlcyhcImZhbGxiYWNrLWltYWdlXCIpKSlcbiAgKTtcbn1cblxuLyoqXG4gKiBEZWNpZGVzIHdoZXRoZXIgb3Igbm90IHRoZSBkb2N1bWVudCBpcyByZWFkZXItYWJsZSB3aXRob3V0IHBhcnNpbmcgdGhlIHdob2xlIHRoaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQ29uZmlndXJhdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWluQ29udGVudExlbmd0aD0xNDBdIFRoZSBtaW5pbXVtIG5vZGUgY29udGVudCBsZW5ndGggdXNlZCB0byBkZWNpZGUgaWYgdGhlIGRvY3VtZW50IGlzIHJlYWRlcmFibGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWluU2NvcmU9MjBdIFRoZSBtaW51bXVtIGN1bXVsYXRlZCAnc2NvcmUnIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoZSBkb2N1bWVudCBpcyByZWFkZXJhYmxlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMudmlzaWJpbGl0eUNoZWNrZXI9aXNOb2RlVmlzaWJsZV0gVGhlIGZ1bmN0aW9uIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIGEgbm9kZSBpcyB2aXNpYmxlLlxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBvciBub3Qgd2Ugc3VzcGVjdCBSZWFkYWJpbGl0eS5wYXJzZSgpIHdpbGwgc3VjZWVlZCBhdCByZXR1cm5pbmcgYW4gYXJ0aWNsZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvYmFibHlSZWFkZXJhYmxlKGRvYywgb3B0aW9ucyA9IHt9KSB7XG4gIC8vIEZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IHJlYXNvbnMgJ29wdGlvbnMnIGNhbiBlaXRoZXIgYmUgYSBjb25maWd1cmF0aW9uIG9iamVjdCBvciB0aGUgZnVuY3Rpb24gdXNlZFxuICAvLyB0byBkZXRlcm1pbmUgaWYgYSBub2RlIGlzIHZpc2libGUuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBvcHRpb25zID0geyB2aXNpYmlsaXR5Q2hlY2tlcjogb3B0aW9ucyB9O1xuICB9XG5cbiAgdmFyIGRlZmF1bHRPcHRpb25zID0ge1xuICAgIG1pblNjb3JlOiAyMCxcbiAgICBtaW5Db250ZW50TGVuZ3RoOiAxNDAsXG4gICAgdmlzaWJpbGl0eUNoZWNrZXI6IGlzTm9kZVZpc2libGUsXG4gIH07XG4gIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcblxuICB2YXIgbm9kZXMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChcInAsIHByZSwgYXJ0aWNsZVwiKTtcblxuICAvLyBHZXQgPGRpdj4gbm9kZXMgd2hpY2ggaGF2ZSA8YnI+IG5vZGUocykgYW5kIGFwcGVuZCB0aGVtIGludG8gdGhlIGBub2Rlc2AgdmFyaWFibGUuXG4gIC8vIFNvbWUgYXJ0aWNsZXMnIERPTSBzdHJ1Y3R1cmVzIG1pZ2h0IGxvb2sgbGlrZVxuICAvLyA8ZGl2PlxuICAvLyAgIFNlbnRlbmNlczxicj5cbiAgLy8gICA8YnI+XG4gIC8vICAgU2VudGVuY2VzPGJyPlxuICAvLyA8L2Rpdj5cbiAgdmFyIGJyTm9kZXMgPSBkb2MucXVlcnlTZWxlY3RvckFsbChcImRpdiA+IGJyXCIpO1xuICBpZiAoYnJOb2Rlcy5sZW5ndGgpIHtcbiAgICB2YXIgc2V0ID0gbmV3IFNldChub2Rlcyk7XG4gICAgW10uZm9yRWFjaC5jYWxsKGJyTm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICBzZXQuYWRkKG5vZGUucGFyZW50Tm9kZSk7XG4gICAgfSk7XG4gICAgbm9kZXMgPSBBcnJheS5mcm9tKHNldCk7XG4gIH1cblxuICB2YXIgc2NvcmUgPSAwO1xuICAvLyBUaGlzIGlzIGEgbGl0dGxlIGNoZWVreSwgd2UgdXNlIHRoZSBhY2N1bXVsYXRvciAnc2NvcmUnIHRvIGRlY2lkZSB3aGF0IHRvIHJldHVybiBmcm9tXG4gIC8vIHRoaXMgY2FsbGJhY2s6XG4gIHJldHVybiBbXS5zb21lLmNhbGwobm9kZXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgaWYgKCFvcHRpb25zLnZpc2liaWxpdHlDaGVja2VyKG5vZGUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG1hdGNoU3RyaW5nID0gbm9kZS5jbGFzc05hbWUgKyBcIiBcIiArIG5vZGUuaWQ7XG4gICAgaWYgKFxuICAgICAgUkVHRVhQUy51bmxpa2VseUNhbmRpZGF0ZXMudGVzdChtYXRjaFN0cmluZykgJiZcbiAgICAgICFSRUdFWFBTLm9rTWF5YmVJdHNBQ2FuZGlkYXRlLnRlc3QobWF0Y2hTdHJpbmcpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUubWF0Y2hlcyhcImxpIHBcIikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgdGV4dENvbnRlbnRMZW5ndGggPSBub2RlLnRleHRDb250ZW50LnRyaW0oKS5sZW5ndGg7XG4gICAgaWYgKHRleHRDb250ZW50TGVuZ3RoIDwgb3B0aW9ucy5taW5Db250ZW50TGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc2NvcmUgKz0gTWF0aC5zcXJ0KHRleHRDb250ZW50TGVuZ3RoIC0gb3B0aW9ucy5taW5Db250ZW50TGVuZ3RoKTtcblxuICAgIGlmIChzY29yZSA+IG9wdGlvbnMubWluU2NvcmUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xufVxuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIikge1xuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVkZWNsYXJlICovXG4gIC8qIGdsb2JhbCBtb2R1bGUgKi9cbiAgbW9kdWxlLmV4cG9ydHMgPSBpc1Byb2JhYmx5UmVhZGVyYWJsZTtcbn1cbiIsIi8qIGVzbGludC1lbnYgbm9kZSAqL1xudmFyIFJlYWRhYmlsaXR5ID0gcmVxdWlyZShcIi4vUmVhZGFiaWxpdHlcIik7XG52YXIgaXNQcm9iYWJseVJlYWRlcmFibGUgPSByZXF1aXJlKFwiLi9SZWFkYWJpbGl0eS1yZWFkZXJhYmxlXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgUmVhZGFiaWxpdHksXG4gIGlzUHJvYmFibHlSZWFkZXJhYmxlLFxufTtcbiIsImltcG9ydCB7IFJlYWRhYmlsaXR5IH0gZnJvbSAnQG1vemlsbGEvcmVhZGFiaWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb250ZW50U2NyaXB0KHtcbiAgbWF0Y2hlczogWyc8YWxsX3VybHM+J10sXG4gIHJ1bkF0OiAnZG9jdW1lbnRfaWRsZScsXG5cbiAgbWFpbigpIHtcbiAgICBjb25zdCBkb2NDbG9uZSA9IGRvY3VtZW50LmNsb25lTm9kZSh0cnVlKSBhcyBEb2N1bWVudDtcblxuICAgIGNvbnN0IHByZUNsZWFuU2VsZWN0b3JzID0gW1xuICAgICAgJ2ZpZ3VyZScsICdmaWdjYXB0aW9uJywgJ2FzaWRlJywgJ3N1cC5yZWZlcmVuY2UnLFxuICAgICAgJy5pbmZvYm94JywgJy50aHVtYicsICcuaGF0bm90ZScsICcubmF2Ym94JywgJy5jYXRsaW5rcycsXG4gICAgICAnLnJlZmxpc3QnLCAnLnJlZmVyZW5jZXMnLCAnLm13LXJlZmVyZW5jZXMtd3JhcCcsICcubXctZWRpdHNlY3Rpb24nLFxuICAgICAgJ1tyb2xlPVwibm90ZVwiXScsICcuZ2FsbGVyeScsICcuc2lzdGVyc2l0ZWJveCdcbiAgICBdO1xuICAgIGRvY0Nsb25lLnF1ZXJ5U2VsZWN0b3JBbGwocHJlQ2xlYW5TZWxlY3RvcnMuam9pbignLCcpKS5mb3JFYWNoKChlbCkgPT4gZWwucmVtb3ZlKCkpO1xuXG4gICAgY29uc3QgYXJ0aWNsZSA9IG5ldyBSZWFkYWJpbGl0eShkb2NDbG9uZSwgeyBjaGFyVGhyZXNob2xkOiAzMDAgfSkucGFyc2UoKTtcblxuICAgIGlmICghYXJ0aWNsZSB8fCAhYXJ0aWNsZS50ZXh0Q29udGVudCkgcmV0dXJuO1xuXG4gICAgY29uc3QgY2xlYW5UZXh0ID0gYXJ0aWNsZS50ZXh0Q29udGVudFxuICAgICAgLnJlcGxhY2UoL1xcW1teXFxdXSpcXF0vZywgJycpXG4gICAgICAucmVwbGFjZSgvXFxuXFxzKuKGkVtcXHNcXFNdKiQvZywgJycpXG4gICAgICAucmVwbGFjZSgvWyBcXHRdKy9nLCAnICcpXG4gICAgICAucmVwbGFjZSgvXFxuXFxzKlxcbisvZywgJ1xcblxcbicpXG4gICAgICAudHJpbSgpO1xuXG4gICAgaWYgKGNsZWFuVGV4dCkge1xuICAgICAgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbn0pOyIsIi8vI3JlZ2lvbiBzcmMvdXRpbHMvaW50ZXJuYWwvbG9nZ2VyLnRzXG5mdW5jdGlvbiBwcmludChtZXRob2QsIC4uLmFyZ3MpIHtcblx0aWYgKGltcG9ydC5tZXRhLmVudi5NT0RFID09PSBcInByb2R1Y3Rpb25cIikgcmV0dXJuO1xuXHRpZiAodHlwZW9mIGFyZ3NbMF0gPT09IFwic3RyaW5nXCIpIG1ldGhvZChgW3d4dF0gJHthcmdzLnNoaWZ0KCl9YCwgLi4uYXJncyk7XG5cdGVsc2UgbWV0aG9kKFwiW3d4dF1cIiwgLi4uYXJncyk7XG59XG4vKiogV3JhcHBlciBhcm91bmQgYGNvbnNvbGVgIHdpdGggYSBcIlt3eHRdXCIgcHJlZml4ICovXG5jb25zdCBsb2dnZXIgPSB7XG5cdGRlYnVnOiAoLi4uYXJncykgPT4gcHJpbnQoY29uc29sZS5kZWJ1ZywgLi4uYXJncyksXG5cdGxvZzogKC4uLmFyZ3MpID0+IHByaW50KGNvbnNvbGUubG9nLCAuLi5hcmdzKSxcblx0d2FybjogKC4uLmFyZ3MpID0+IHByaW50KGNvbnNvbGUud2FybiwgLi4uYXJncyksXG5cdGVycm9yOiAoLi4uYXJncykgPT4gcHJpbnQoY29uc29sZS5lcnJvciwgLi4uYXJncylcbn07XG4vLyNlbmRyZWdpb25cbmV4cG9ydCB7IGxvZ2dlciB9O1xuIiwiaW1wb3J0IHsgYnJvd3NlciB9IGZyb20gXCJ3eHQvYnJvd3NlclwiO1xuLy8jcmVnaW9uIHNyYy91dGlscy9pbnRlcm5hbC9jdXN0b20tZXZlbnRzLnRzXG4vKipcbiogRmlyZWQgb24gYHdpbmRvd2AgYXMgYHd4dDpsb2NhdGlvbmNoYW5nZWAgd2hlbiBhIGNvbnRlbnQgc2NyaXB0IGRldGVjdHMgYVxuKiBzYW1lLWRvY3VtZW50IFVSTCBjaGFuZ2UuXG4qL1xudmFyIFd4dExvY2F0aW9uQ2hhbmdlRXZlbnQgPSBjbGFzcyBXeHRMb2NhdGlvbkNoYW5nZUV2ZW50IGV4dGVuZHMgRXZlbnQge1xuXHRzdGF0aWMgRVZFTlRfTkFNRSA9IGdldFVuaXF1ZUV2ZW50TmFtZShcInd4dDpsb2NhdGlvbmNoYW5nZVwiKTtcblx0Y29uc3RydWN0b3IobmV3VXJsLCBvbGRVcmwpIHtcblx0XHRzdXBlcihXeHRMb2NhdGlvbkNoYW5nZUV2ZW50LkVWRU5UX05BTUUsIHt9KTtcblx0XHR0aGlzLm5ld1VybCA9IG5ld1VybDtcblx0XHR0aGlzLm9sZFVybCA9IG9sZFVybDtcblx0fVxufTtcbi8qKlxuKiBSZXR1cm5zIGFuIGV2ZW50IG5hbWUgdW5pcXVlIHRvIHRoZSBleHRlbnNpb24gYW5kIGNvbnRlbnQgc2NyaXB0IHRoYXQnc1xuKiBydW5uaW5nLlxuKi9cbmZ1bmN0aW9uIGdldFVuaXF1ZUV2ZW50TmFtZShldmVudE5hbWUpIHtcblx0cmV0dXJuIGAke2Jyb3dzZXI/LnJ1bnRpbWU/LmlkfToke2ltcG9ydC5tZXRhLmVudi5FTlRSWVBPSU5UfToke2V2ZW50TmFtZX1gO1xufVxuLy8jZW5kcmVnaW9uXG5leHBvcnQgeyBXeHRMb2NhdGlvbkNoYW5nZUV2ZW50LCBnZXRVbmlxdWVFdmVudE5hbWUgfTtcbiIsImltcG9ydCB7IFd4dExvY2F0aW9uQ2hhbmdlRXZlbnQgfSBmcm9tIFwiLi9jdXN0b20tZXZlbnRzLm1qc1wiO1xuLy8jcmVnaW9uIHNyYy91dGlscy9pbnRlcm5hbC9sb2NhdGlvbi13YXRjaGVyLnRzXG5jb25zdCBzdXBwb3J0c05hdmlnYXRpb25BcGkgPSB0eXBlb2YgZ2xvYmFsVGhpcy5uYXZpZ2F0aW9uPy5hZGRFdmVudExpc3RlbmVyID09PSBcImZ1bmN0aW9uXCI7XG4vKipcbiogQ3JlYXRlIGEgdXRpbCB0aGF0IHdhdGNoZXMgZm9yIFVSTCBjaGFuZ2VzLCBkaXNwYXRjaGluZyB0aGUgY3VzdG9tIGV2ZW50IHdoZW5cbiogZGV0ZWN0ZWQuIFN0b3BzIHdhdGNoaW5nIHdoZW4gY29udGVudCBzY3JpcHQgaXMgaW52YWxpZGF0ZWQuIFVzZXMgTmF2aWdhdGlvblxuKiBBUEkgd2hlbiBhdmFpbGFibGUsIG90aGVyd2lzZSBmYWxscyBiYWNrIHRvIHBvbGxpbmcuXG4qL1xuZnVuY3Rpb24gY3JlYXRlTG9jYXRpb25XYXRjaGVyKGN0eCkge1xuXHRsZXQgbGFzdFVybDtcblx0bGV0IHdhdGNoaW5nID0gZmFsc2U7XG5cdHJldHVybiB7IHJ1bigpIHtcblx0XHRpZiAod2F0Y2hpbmcpIHJldHVybjtcblx0XHR3YXRjaGluZyA9IHRydWU7XG5cdFx0bGFzdFVybCA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XG5cdFx0aWYgKHN1cHBvcnRzTmF2aWdhdGlvbkFwaSkgZ2xvYmFsVGhpcy5uYXZpZ2F0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJuYXZpZ2F0ZVwiLCAoZXZlbnQpID0+IHtcblx0XHRcdGNvbnN0IG5ld1VybCA9IG5ldyBVUkwoZXZlbnQuZGVzdGluYXRpb24udXJsKTtcblx0XHRcdGlmIChuZXdVcmwuaHJlZiA9PT0gbGFzdFVybC5ocmVmKSByZXR1cm47XG5cdFx0XHR3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgV3h0TG9jYXRpb25DaGFuZ2VFdmVudChuZXdVcmwsIGxhc3RVcmwpKTtcblx0XHRcdGxhc3RVcmwgPSBuZXdVcmw7XG5cdFx0fSwgeyBzaWduYWw6IGN0eC5zaWduYWwgfSk7XG5cdFx0ZWxzZSBjdHguc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXHRcdFx0Y29uc3QgbmV3VXJsID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKTtcblx0XHRcdGlmIChuZXdVcmwuaHJlZiAhPT0gbGFzdFVybC5ocmVmKSB7XG5cdFx0XHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBXeHRMb2NhdGlvbkNoYW5nZUV2ZW50KG5ld1VybCwgbGFzdFVybCkpO1xuXHRcdFx0XHRsYXN0VXJsID0gbmV3VXJsO1xuXHRcdFx0fVxuXHRcdH0sIDFlMyk7XG5cdH0gfTtcbn1cbi8vI2VuZHJlZ2lvblxuZXhwb3J0IHsgY3JlYXRlTG9jYXRpb25XYXRjaGVyIH07XG4iLCJpbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi9pbnRlcm5hbC9sb2dnZXIubWpzXCI7XG5pbXBvcnQgeyBnZXRVbmlxdWVFdmVudE5hbWUgfSBmcm9tIFwiLi9pbnRlcm5hbC9jdXN0b20tZXZlbnRzLm1qc1wiO1xuaW1wb3J0IHsgY3JlYXRlTG9jYXRpb25XYXRjaGVyIH0gZnJvbSBcIi4vaW50ZXJuYWwvbG9jYXRpb24td2F0Y2hlci5tanNcIjtcbmltcG9ydCB7IGJyb3dzZXIgfSBmcm9tIFwid3h0L2Jyb3dzZXJcIjtcbi8vI3JlZ2lvbiBzcmMvdXRpbHMvY29udGVudC1zY3JpcHQtY29udGV4dC50c1xuLyoqXG4qIEltcGxlbWVudHNcbiogW2BBYm9ydENvbnRyb2xsZXJgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQWJvcnRDb250cm9sbGVyKS5cbiogVXNlZCB0byBkZXRlY3QgYW5kIHN0b3AgY29udGVudCBzY3JpcHQgY29kZSB3aGVuIHRoZSBzY3JpcHQgaXMgaW52YWxpZGF0ZWQuXG4qXG4qIEl0IGFsc28gcHJvdmlkZXMgc2V2ZXJhbCB1dGlsaXRpZXMgbGlrZSBgY3R4LnNldFRpbWVvdXRgIGFuZFxuKiBgY3R4LnNldEludGVydmFsYCB0aGF0IHNob3VsZCBiZSB1c2VkIGluIGNvbnRlbnQgc2NyaXB0cyBpbnN0ZWFkIG9mXG4qIGB3aW5kb3cuc2V0VGltZW91dGAgb3IgYHdpbmRvdy5zZXRJbnRlcnZhbGAuXG4qXG4qIFRvIGNyZWF0ZSBjb250ZXh0IGZvciB0ZXN0aW5nLCB5b3UgY2FuIHVzZSB0aGUgY2xhc3MncyBjb25zdHJ1Y3RvcjpcbipcbiogYGBgdHNcbiogaW1wb3J0IHsgQ29udGVudFNjcmlwdENvbnRleHQgfSBmcm9tICd3eHQvdXRpbHMvY29udGVudC1zY3JpcHRzLWNvbnRleHQnO1xuKlxuKiB0ZXN0KCdzdG9yYWdlIGxpc3RlbmVyIHNob3VsZCBiZSByZW1vdmVkIHdoZW4gY29udGV4dCBpcyBpbnZhbGlkYXRlZCcsICgpID0+IHtcbiogICBjb25zdCBjdHggPSBuZXcgQ29udGVudFNjcmlwdENvbnRleHQoJ3Rlc3QnKTtcbiogICBjb25zdCBpdGVtID0gc3RvcmFnZS5kZWZpbmVJdGVtKCdsb2NhbDpjb3VudCcsIHsgZGVmYXVsdFZhbHVlOiAwIH0pO1xuKiAgIGNvbnN0IHdhdGNoZXIgPSB2aS5mbigpO1xuKlxuKiAgIGNvbnN0IHVud2F0Y2ggPSBpdGVtLndhdGNoKHdhdGNoZXIpO1xuKiAgIGN0eC5vbkludmFsaWRhdGVkKHVud2F0Y2gpOyAvLyBMaXN0ZW4gZm9yIGludmFsaWRhdGUgaGVyZVxuKlxuKiAgIGF3YWl0IGl0ZW0uc2V0VmFsdWUoMSk7XG4qICAgZXhwZWN0KHdhdGNoZXIpLnRvQmVDYWxsZWRUaW1lcygxKTtcbiogICBleHBlY3Qod2F0Y2hlcikudG9CZUNhbGxlZFdpdGgoMSwgMCk7XG4qXG4qICAgY3R4Lm5vdGlmeUludmFsaWRhdGVkKCk7IC8vIFVzZSB0aGlzIGZ1bmN0aW9uIHRvIGludmFsaWRhdGUgdGhlIGNvbnRleHRcbiogICBhd2FpdCBpdGVtLnNldFZhbHVlKDIpO1xuKiAgIGV4cGVjdCh3YXRjaGVyKS50b0JlQ2FsbGVkVGltZXMoMSk7XG4qIH0pO1xuKiBgYGBcbiovXG52YXIgQ29udGVudFNjcmlwdENvbnRleHQgPSBjbGFzcyBDb250ZW50U2NyaXB0Q29udGV4dCB7XG5cdHN0YXRpYyBTQ1JJUFRfU1RBUlRFRF9NRVNTQUdFX1RZUEUgPSBnZXRVbmlxdWVFdmVudE5hbWUoXCJ3eHQ6Y29udGVudC1zY3JpcHQtc3RhcnRlZFwiKTtcblx0aWQ7XG5cdGFib3J0Q29udHJvbGxlcjtcblx0bG9jYXRpb25XYXRjaGVyID0gY3JlYXRlTG9jYXRpb25XYXRjaGVyKHRoaXMpO1xuXHRjb25zdHJ1Y3Rvcihjb250ZW50U2NyaXB0TmFtZSwgb3B0aW9ucykge1xuXHRcdHRoaXMuY29udGVudFNjcmlwdE5hbWUgPSBjb250ZW50U2NyaXB0TmFtZTtcblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXHRcdHRoaXMuaWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyKTtcblx0XHR0aGlzLmFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblx0XHR0aGlzLnN0b3BPbGRTY3JpcHRzKCk7XG5cdFx0dGhpcy5saXN0ZW5Gb3JOZXdlclNjcmlwdHMoKTtcblx0fVxuXHRnZXQgc2lnbmFsKCkge1xuXHRcdHJldHVybiB0aGlzLmFib3J0Q29udHJvbGxlci5zaWduYWw7XG5cdH1cblx0YWJvcnQocmVhc29uKSB7XG5cdFx0cmV0dXJuIHRoaXMuYWJvcnRDb250cm9sbGVyLmFib3J0KHJlYXNvbik7XG5cdH1cblx0Z2V0IGlzSW52YWxpZCgpIHtcblx0XHRpZiAoYnJvd3Nlci5ydW50aW1lPy5pZCA9PSBudWxsKSB0aGlzLm5vdGlmeUludmFsaWRhdGVkKCk7XG5cdFx0cmV0dXJuIHRoaXMuc2lnbmFsLmFib3J0ZWQ7XG5cdH1cblx0Z2V0IGlzVmFsaWQoKSB7XG5cdFx0cmV0dXJuICF0aGlzLmlzSW52YWxpZDtcblx0fVxuXHQvKipcblx0KiBBZGQgYSBsaXN0ZW5lciB0aGF0IGlzIGNhbGxlZCB3aGVuIHRoZSBjb250ZW50IHNjcmlwdCdzIGNvbnRleHQgaXNcblx0KiBpbnZhbGlkYXRlZC5cblx0KlxuXHQqIEBleGFtcGxlXG5cdCogICBicm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGNiKTtcblx0KiAgIGNvbnN0IHJlbW92ZUludmFsaWRhdGVkTGlzdGVuZXIgPSBjdHgub25JbnZhbGlkYXRlZCgoKSA9PiB7XG5cdCogICAgIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UucmVtb3ZlTGlzdGVuZXIoY2IpO1xuXHQqICAgfSk7XG5cdCogICAvLyAuLi5cblx0KiAgIHJlbW92ZUludmFsaWRhdGVkTGlzdGVuZXIoKTtcblx0KlxuXHQqIEByZXR1cm5zIEEgZnVuY3Rpb24gdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lci5cblx0Ki9cblx0b25JbnZhbGlkYXRlZChjYikge1xuXHRcdHRoaXMuc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBjYik7XG5cdFx0cmV0dXJuICgpID0+IHRoaXMuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBjYik7XG5cdH1cblx0LyoqXG5cdCogUmV0dXJuIGEgcHJvbWlzZSB0aGF0IG5ldmVyIHJlc29sdmVzLiBVc2VmdWwgaWYgeW91IGhhdmUgYW4gYXN5bmMgZnVuY3Rpb25cblx0KiB0aGF0IHNob3VsZG4ndCBydW4gYWZ0ZXIgdGhlIGNvbnRleHQgaXMgZXhwaXJlZC5cblx0KlxuXHQqIEBleGFtcGxlXG5cdCogICBjb25zdCBnZXRWYWx1ZUZyb21TdG9yYWdlID0gYXN5bmMgKCkgPT4ge1xuXHQqICAgICBpZiAoY3R4LmlzSW52YWxpZCkgcmV0dXJuIGN0eC5ibG9jaygpO1xuXHQqXG5cdCogICAgIC8vIC4uLlxuXHQqICAgfTtcblx0Ki9cblx0YmxvY2soKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKCgpID0+IHt9KTtcblx0fVxuXHQvKipcblx0KiBXcmFwcGVyIGFyb3VuZCBgd2luZG93LnNldEludGVydmFsYCB0aGF0IGF1dG9tYXRpY2FsbHkgY2xlYXJzIHRoZSBpbnRlcnZhbFxuXHQqIHdoZW4gaW52YWxpZGF0ZWQuXG5cdCpcblx0KiBJbnRlcnZhbHMgY2FuIGJlIGNsZWFyZWQgYnkgY2FsbGluZyB0aGUgbm9ybWFsIGBjbGVhckludGVydmFsYCBmdW5jdGlvbi5cblx0Ki9cblx0c2V0SW50ZXJ2YWwoaGFuZGxlciwgdGltZW91dCkge1xuXHRcdGNvbnN0IGlkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMuaXNWYWxpZCkgaGFuZGxlcigpO1xuXHRcdH0sIHRpbWVvdXQpO1xuXHRcdHRoaXMub25JbnZhbGlkYXRlZCgoKSA9PiBjbGVhckludGVydmFsKGlkKSk7XG5cdFx0cmV0dXJuIGlkO1xuXHR9XG5cdC8qKlxuXHQqIFdyYXBwZXIgYXJvdW5kIGB3aW5kb3cuc2V0VGltZW91dGAgdGhhdCBhdXRvbWF0aWNhbGx5IGNsZWFycyB0aGUgaW50ZXJ2YWxcblx0KiB3aGVuIGludmFsaWRhdGVkLlxuXHQqXG5cdCogVGltZW91dHMgY2FuIGJlIGNsZWFyZWQgYnkgY2FsbGluZyB0aGUgbm9ybWFsIGBzZXRUaW1lb3V0YCBmdW5jdGlvbi5cblx0Ki9cblx0c2V0VGltZW91dChoYW5kbGVyLCB0aW1lb3V0KSB7XG5cdFx0Y29uc3QgaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGlmICh0aGlzLmlzVmFsaWQpIGhhbmRsZXIoKTtcblx0XHR9LCB0aW1lb3V0KTtcblx0XHR0aGlzLm9uSW52YWxpZGF0ZWQoKCkgPT4gY2xlYXJUaW1lb3V0KGlkKSk7XG5cdFx0cmV0dXJuIGlkO1xuXHR9XG5cdC8qKlxuXHQqIFdyYXBwZXIgYXJvdW5kIGB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lYCB0aGF0IGF1dG9tYXRpY2FsbHkgY2FuY2Vsc1xuXHQqIHRoZSByZXF1ZXN0IHdoZW4gaW52YWxpZGF0ZWQuXG5cdCpcblx0KiBDYWxsYmFja3MgY2FuIGJlIGNhbmNlbGVkIGJ5IGNhbGxpbmcgdGhlIG5vcm1hbCBgY2FuY2VsQW5pbWF0aW9uRnJhbWVgXG5cdCogZnVuY3Rpb24uXG5cdCovXG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjaykge1xuXHRcdGNvbnN0IGlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCguLi5hcmdzKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5pc1ZhbGlkKSBjYWxsYmFjayguLi5hcmdzKTtcblx0XHR9KTtcblx0XHR0aGlzLm9uSW52YWxpZGF0ZWQoKCkgPT4gY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpKTtcblx0XHRyZXR1cm4gaWQ7XG5cdH1cblx0LyoqXG5cdCogV3JhcHBlciBhcm91bmQgYHdpbmRvdy5yZXF1ZXN0SWRsZUNhbGxiYWNrYCB0aGF0IGF1dG9tYXRpY2FsbHkgY2FuY2VscyB0aGVcblx0KiByZXF1ZXN0IHdoZW4gaW52YWxpZGF0ZWQuXG5cdCpcblx0KiBDYWxsYmFja3MgY2FuIGJlIGNhbmNlbGVkIGJ5IGNhbGxpbmcgdGhlIG5vcm1hbCBgY2FuY2VsSWRsZUNhbGxiYWNrYFxuXHQqIGZ1bmN0aW9uLlxuXHQqL1xuXHRyZXF1ZXN0SWRsZUNhbGxiYWNrKGNhbGxiYWNrLCBvcHRpb25zKSB7XG5cdFx0Y29uc3QgaWQgPSByZXF1ZXN0SWRsZUNhbGxiYWNrKCguLi5hcmdzKSA9PiB7XG5cdFx0XHRpZiAoIXRoaXMuc2lnbmFsLmFib3J0ZWQpIGNhbGxiYWNrKC4uLmFyZ3MpO1xuXHRcdH0sIG9wdGlvbnMpO1xuXHRcdHRoaXMub25JbnZhbGlkYXRlZCgoKSA9PiBjYW5jZWxJZGxlQ2FsbGJhY2soaWQpKTtcblx0XHRyZXR1cm4gaWQ7XG5cdH1cblx0YWRkRXZlbnRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpIHtcblx0XHRpZiAodHlwZSA9PT0gXCJ3eHQ6bG9jYXRpb25jaGFuZ2VcIikge1xuXHRcdFx0aWYgKHRoaXMuaXNWYWxpZCkgdGhpcy5sb2NhdGlvbldhdGNoZXIucnVuKCk7XG5cdFx0fVxuXHRcdHRhcmdldC5hZGRFdmVudExpc3RlbmVyPy4odHlwZS5zdGFydHNXaXRoKFwid3h0OlwiKSA/IGdldFVuaXF1ZUV2ZW50TmFtZSh0eXBlKSA6IHR5cGUsIGhhbmRsZXIsIHtcblx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0XHRzaWduYWw6IHRoaXMuc2lnbmFsXG5cdFx0fSk7XG5cdH1cblx0LyoqXG5cdCogQGludGVybmFsXG5cdCogQWJvcnQgdGhlIGFib3J0IGNvbnRyb2xsZXIgYW5kIGV4ZWN1dGUgYWxsIGBvbkludmFsaWRhdGVkYCBsaXN0ZW5lcnMuXG5cdCovXG5cdG5vdGlmeUludmFsaWRhdGVkKCkge1xuXHRcdHRoaXMuYWJvcnQoXCJDb250ZW50IHNjcmlwdCBjb250ZXh0IGludmFsaWRhdGVkXCIpO1xuXHRcdGxvZ2dlci5kZWJ1ZyhgQ29udGVudCBzY3JpcHQgXCIke3RoaXMuY29udGVudFNjcmlwdE5hbWV9XCIgY29udGV4dCBpbnZhbGlkYXRlZGApO1xuXHR9XG5cdHN0b3BPbGRTY3JpcHRzKCkge1xuXHRcdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KENvbnRlbnRTY3JpcHRDb250ZXh0LlNDUklQVF9TVEFSVEVEX01FU1NBR0VfVFlQRSwgeyBkZXRhaWw6IHtcblx0XHRcdGNvbnRlbnRTY3JpcHROYW1lOiB0aGlzLmNvbnRlbnRTY3JpcHROYW1lLFxuXHRcdFx0bWVzc2FnZUlkOiB0aGlzLmlkXG5cdFx0fSB9KSk7XG5cdFx0aWYgKCF0aGlzLm9wdGlvbnM/Lm5vU2NyaXB0U3RhcnRlZFBvc3RNZXNzYWdlKSB3aW5kb3cucG9zdE1lc3NhZ2Uoe1xuXHRcdFx0dHlwZTogQ29udGVudFNjcmlwdENvbnRleHQuU0NSSVBUX1NUQVJURURfTUVTU0FHRV9UWVBFLFxuXHRcdFx0Y29udGVudFNjcmlwdE5hbWU6IHRoaXMuY29udGVudFNjcmlwdE5hbWUsXG5cdFx0XHRtZXNzYWdlSWQ6IHRoaXMuaWRcblx0XHR9LCBcIipcIik7XG5cdH1cblx0dmVyaWZ5U2NyaXB0U3RhcnRlZEV2ZW50KGV2ZW50KSB7XG5cdFx0Y29uc3QgaXNTYW1lQ29udGVudFNjcmlwdCA9IGV2ZW50LmRldGFpbD8uY29udGVudFNjcmlwdE5hbWUgPT09IHRoaXMuY29udGVudFNjcmlwdE5hbWU7XG5cdFx0Y29uc3QgaXNGcm9tU2VsZiA9IGV2ZW50LmRldGFpbD8ubWVzc2FnZUlkID09PSB0aGlzLmlkO1xuXHRcdHJldHVybiBpc1NhbWVDb250ZW50U2NyaXB0ICYmICFpc0Zyb21TZWxmO1xuXHR9XG5cdGxpc3RlbkZvck5ld2VyU2NyaXB0cygpIHtcblx0XHRjb25zdCBjYiA9IChldmVudCkgPT4ge1xuXHRcdFx0aWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBDdXN0b21FdmVudCkgfHwgIXRoaXMudmVyaWZ5U2NyaXB0U3RhcnRlZEV2ZW50KGV2ZW50KSkgcmV0dXJuO1xuXHRcdFx0dGhpcy5ub3RpZnlJbnZhbGlkYXRlZCgpO1xuXHRcdH07XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihDb250ZW50U2NyaXB0Q29udGV4dC5TQ1JJUFRfU1RBUlRFRF9NRVNTQUdFX1RZUEUsIGNiKTtcblx0XHR0aGlzLm9uSW52YWxpZGF0ZWQoKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihDb250ZW50U2NyaXB0Q29udGV4dC5TQ1JJUFRfU1RBUlRFRF9NRVNTQUdFX1RZUEUsIGNiKSk7XG5cdH1cbn07XG4vLyNlbmRyZWdpb25cbmV4cG9ydCB7IENvbnRlbnRTY3JpcHRDb250ZXh0IH07XG4iXSwiaWdub3JlTGlzdCI6WzAsMSwyLDMsNCw1LDcsOCw5LDEwXSwibWFwcGluZ3MiOiI7Ozs7Q0FDQSxTQUFTLG9CQUFvQixZQUFZO0VBQ3hDLE9BQU87Q0FDUjs7Ozs7Ozs7Ozs7Ozs7OztDRWFBLElBQU0sVURmaUIsV0FBVyxTQUFTLFNBQVMsS0FDaEQsV0FBVyxVQUNYLFdBQVc7Ozs7Ozs7O0VFdUJmLFNBQVMsWUFBWSxLQUFLLFNBQVM7R0FFakMsSUFBSSxXQUFXLFFBQVEsaUJBQWlCO0lBQ3RDLE1BQU07SUFDTixVQUFVLFVBQVU7R0FDdEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksaUJBQ3RCLE1BQU0sSUFBSSxNQUNSLHdFQUNGO0dBRUYsVUFBVSxXQUFXLENBQUM7R0FFdEIsS0FBSyxPQUFPO0dBQ1osS0FBSyxrQkFBa0IsS0FBSyxLQUFLLFdBQVc7R0FDNUMsS0FBSyxnQkFBZ0I7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