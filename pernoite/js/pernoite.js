/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.4
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.4
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.4'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.4
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.4'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.4
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.4'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.4
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.4'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.4
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.4'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--                        // up
    if (e.which == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.4
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.4'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.4
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.4'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (self && self.$tip && self.$tip.is(':visible')) {
      self.hoverState = 'in'
      return
    }

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $container   = this.options.container ? $(this.options.container) : this.$element.parent()
        var containerDim = this.getPosition($container)

        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < containerDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > containerDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < containerDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.4
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.4'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.4
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.4'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.4
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.3.4'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.4
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.4'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = $(document.body).height()

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/*
* bootstrap-table - v1.6.0 - 2015-03-03
* https://github.com/wenzhixin/bootstrap-table
* Copyright (c) 2015 zhixin wen
* Licensed MIT License
*/
!function(a){"use strict";var b=function(a){var b=arguments,c=!0,d=1;return a=a.replace(/%s/g,function(){var a=b[d++];return"undefined"==typeof a?(c=!1,""):a}),c?a:""},c=function(b,c,d,e){var f="";return a.each(b,function(a,b){return b[c]===e?(f=b[d],!1):!0}),f},d=function(b,c){var d=-1;return a.each(b,function(a,b){return b.field===c?(d=a,!1):!0}),d},e=function(){var b,c,d=a("<p/>").addClass("fixed-table-scroll-inner"),e=a("<div/>").addClass("fixed-table-scroll-outer");return e.append(d),a("body").append(e),b=d[0].offsetWidth,e.css("overflow","scroll"),c=d[0].offsetWidth,b===c&&(c=e[0].clientWidth),e.remove(),b-c},f=function(b,c,d,e){if("string"==typeof c){var f=c.split(".");f.length>1?(c=window,a.each(f,function(a,b){c=c[b]})):c=window[c]}return"object"==typeof c?c:"function"==typeof c?c.apply(b,d):e},g=function(a){return"string"==typeof a?a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):a},h=function(b,c){this.options=c,this.$el=a(b),this.$el_=this.$el.clone(),this.timeoutId_=0,this.init()};h.DEFAULTS={classes:"table table-hover",height:void 0,undefinedText:"-",sortName:void 0,sortOrder:"asc",striped:!1,columns:[],data:[],method:"get",url:void 0,cache:!0,contentType:"application/json",dataType:"json",ajaxOptions:{},queryParams:function(a){return a},queryParamsType:"limit",responseHandler:function(a){return a},pagination:!1,sidePagination:"client",totalRows:0,pageNumber:1,pageSize:10,pageList:[10,25,50,100],search:!1,searchAlign:"right",selectItemName:"btSelectItem",showHeader:!0,showColumns:!1,showPaginationSwitch:!1,showRefresh:!1,showToggle:!1,buttonsAlign:"right",smartDisplay:!0,minimumCountColumns:1,idField:void 0,cardView:!1,trimOnSearch:!0,clickToSelect:!1,singleSelect:!1,toolbar:void 0,toolbarAlign:"left",checkboxHeader:!0,sortable:!0,maintainSelected:!1,searchTimeOut:500,iconSize:void 0,iconsPrefix:"glyphicon",icons:{paginationSwitchDown:"glyphicon-collapse-down icon-chevron-down",paginationSwitchUp:"glyphicon-collapse-up icon-chevron-up",refresh:"glyphicon-refresh icon-refresh",toggle:"glyphicon-list-alt icon-list-alt",columns:"glyphicon-th icon-th"},rowStyle:function(){return{}},rowAttributes:function(){return{}},onAll:function(){return!1},onClickRow:function(){return!1},onDblClickRow:function(){return!1},onSort:function(){return!1},onCheck:function(){return!1},onUncheck:function(){return!1},onCheckAll:function(){return!1},onUncheckAll:function(){return!1},onLoadSuccess:function(){return!1},onLoadError:function(){return!1},onColumnSwitch:function(){return!1},onPageChange:function(){return!1},onSearch:function(){return!1},onPreBody:function(){return!1},onPostBody:function(){return!1},onPostHeader:function(){return!1}},h.LOCALES=[],h.LOCALES["en-US"]={formatLoadingMessage:function(){return"Loading, please wait..."},formatRecordsPerPage:function(a){return b("%s records per page",a)},formatShowingRows:function(a,c,d){return b("Showing %s to %s of %s rows",a,c,d)},formatSearch:function(){return"Search"},formatNoMatches:function(){return"No matching records found"},formatPaginationSwitch:function(){return"Hide/Show pagination"},formatRefresh:function(){return"Refresh"},formatToggle:function(){return"Toggle"},formatColumns:function(){return"Columns"}},a.extend(h.DEFAULTS,h.LOCALES["en-US"]),h.COLUMN_DEFAULTS={radio:!1,checkbox:!1,checkboxEnabled:!0,field:void 0,title:void 0,"class":void 0,align:void 0,halign:void 0,valign:void 0,width:void 0,sortable:!1,order:"asc",visible:!0,switchable:!0,clickToSelect:!0,formatter:void 0,events:void 0,sorter:void 0,cellStyle:void 0,searchable:!0},h.EVENTS={"all.bs.table":"onAll","click-row.bs.table":"onClickRow","dbl-click-row.bs.table":"onDblClickRow","sort.bs.table":"onSort","check.bs.table":"onCheck","uncheck.bs.table":"onUncheck","check-all.bs.table":"onCheckAll","uncheck-all.bs.table":"onUncheckAll","load-success.bs.table":"onLoadSuccess","load-error.bs.table":"onLoadError","column-switch.bs.table":"onColumnSwitch","page-change.bs.table":"onPageChange","search.bs.table":"onSearch","pre-body.bs.table":"onPreBody","post-body.bs.table":"onPostBody","post-header.bs.table":"onPostHeader"},h.prototype.init=function(){this.initContainer(),this.initTable(),this.initHeader(),this.initData(),this.initToolbar(),this.initPagination(),this.initBody(),this.initServer()},h.prototype.initContainer=function(){this.$container=a(['<div class="bootstrap-table">','<div class="fixed-table-toolbar"></div>','<div class="fixed-table-container">','<div class="fixed-table-header"><table></table></div>','<div class="fixed-table-body">','<div class="fixed-table-loading">',this.options.formatLoadingMessage(),"</div>","</div>",'<div class="fixed-table-pagination"></div>',"</div>","</div>"].join("")),this.$container.insertAfter(this.$el),this.$container.find(".fixed-table-body").append(this.$el),this.$container.after('<div class="clearfix"></div>'),this.$loading=this.$container.find(".fixed-table-loading"),this.$el.addClass(this.options.classes),this.options.striped&&this.$el.addClass("table-striped")},h.prototype.initTable=function(){var b=this,c=[],d=[];this.$header=this.$el.find("thead"),this.$header.length||(this.$header=a("<thead></thead>").appendTo(this.$el)),this.$header.find("tr").length||this.$header.append("<tr></tr>"),this.$header.find("th").each(function(){var b=a.extend({},{title:a(this).html(),"class":a(this).attr("class")},a(this).data());c.push(b)}),this.options.columns=a.extend([],c,this.options.columns),a.each(this.options.columns,function(c,d){b.options.columns[c]=a.extend({},h.COLUMN_DEFAULTS,{field:c},d)}),this.options.data.length||(this.$el.find("tbody tr").each(function(){var c={};c._id=a(this).attr("id"),c._class=a(this).attr("class"),a(this).find("td").each(function(d){var e=b.options.columns[d].field;c[e]=a(this).html(),c["_"+e+"_id"]=a(this).attr("id"),c["_"+e+"_class"]=a(this).attr("class"),c["_"+e+"_data"]=a(this).data()}),d.push(c)}),this.options.data=d)},h.prototype.initHeader=function(){var c=this,d=[],e=[];this.header={fields:[],styles:[],classes:[],formatters:[],events:[],sorters:[],cellStyles:[],clickToSelects:[],searchables:[]},a.each(this.options.columns,function(a,f){{var g="",h="",i="",j="",k=b(' class="%s"',f["class"]);c.options.sortOrder||f.order}f.visible&&(h=b("text-align: %s; ",f.halign?f.halign:f.align),i=b("text-align: %s; ",f.align),j=b("vertical-align: %s; ",f.valign),j+=b("width: %spx; ",f.checkbox||f.radio?36:f.width),d.push(f),c.header.fields.push(f.field),c.header.styles.push(i+j),c.header.classes.push(k),c.header.formatters.push(f.formatter),c.header.events.push(f.events),c.header.sorters.push(f.sorter),c.header.cellStyles.push(f.cellStyle),c.header.clickToSelects.push(f.clickToSelect),c.header.searchables.push(f.searchable),e.push("<th",f.checkbox||f.radio?b(' class="bs-checkbox %s"',f["class"]||""):k,b(' style="%s"',h+j),">"),e.push(b('<div class="th-inner %s">',c.options.sortable&&f.sortable?"sortable":"")),g=f.title,c.options.sortName===f.field&&c.options.sortable&&f.sortable&&(g+=c.getCaretHtml()),f.checkbox&&(!c.options.singleSelect&&c.options.checkboxHeader&&(g='<input name="btSelectAll" type="checkbox" />'),c.header.stateField=f.field),f.radio&&(g="",c.header.stateField=f.field,c.options.singleSelect=!0),e.push(g),e.push("</div>"),e.push('<div class="fht-cell"></div>'),e.push("</th>"))}),this.$header.find("tr").html(e.join("")),this.$header.find("th").each(function(b){a(this).data(d[b])}),this.$container.off("click","th").on("click","th",function(b){c.options.sortable&&a(this).data().sortable&&c.onSort(b)}),!this.options.showHeader||this.options.cardView?(this.$header.hide(),this.$container.find(".fixed-table-header").hide(),this.$loading.css("top",0)):(this.$header.show(),this.$container.find(".fixed-table-header").show(),this.$loading.css("top","37px")),this.$selectAll=this.$header.find('[name="btSelectAll"]'),this.$container.off("click",'[name="btSelectAll"]').on("click",'[name="btSelectAll"]',function(){var b=a(this).prop("checked");c[b?"checkAll":"uncheckAll"]()})},h.prototype.initData=function(a,b){this.data="append"===b?this.data.concat(a):"prepend"===b?[].concat(a).concat(this.data):a||this.options.data,this.options.data=this.data,"server"!==this.options.sidePagination&&this.initSort()},h.prototype.initSort=function(){var b=this,c=this.options.sortName,d="desc"===this.options.sortOrder?-1:1,e=a.inArray(this.options.sortName,this.header.fields);-1!==e&&this.data.sort(function(g,h){var i=g[c],j=h[c],k=f(b.header,b.header.sorters[e],[i,j]);return void 0!==k?d*k:void 0!==k?d*k:((void 0===i||null===i)&&(i=""),(void 0===j||null===j)&&(j=""),a.isNumeric(i)&&a.isNumeric(j)?(i=parseFloat(i),j=parseFloat(j),j>i?-1*d:d):i===j?0:("string"!=typeof i&&(i=i.toString()),-1===i.localeCompare(j)?-1*d:d))})},h.prototype.onSort=function(b){var c=a(b.currentTarget),d=this.$header.find("th").eq(c.index());return this.$header.add(this.$header_).find("span.order").remove(),this.options.sortName===c.data("field")?this.options.sortOrder="asc"===this.options.sortOrder?"desc":"asc":(this.options.sortName=c.data("field"),this.options.sortOrder="asc"===c.data("order")?"desc":"asc"),this.trigger("sort",this.options.sortName,this.options.sortOrder),c.add(d).data("order",this.options.sortOrder).find(".th-inner").append(this.getCaretHtml()),"server"===this.options.sidePagination?void this.initServer():(this.initSort(),void this.initBody())},h.prototype.initToolbar=function(){var c,d,e=this,g=[],h=0,i=0;this.$toolbar=this.$container.find(".fixed-table-toolbar").html(""),"string"==typeof this.options.toolbar&&a(b('<div class="bars pull-%s"></div>',this.options.toolbarAlign)).appendTo(this.$toolbar).append(a(this.options.toolbar)),g=[b('<div class="columns columns-%s btn-group pull-%s">',this.options.buttonsAlign,this.options.buttonsAlign)],"string"==typeof this.options.icons&&(this.options.icons=f(null,this.options.icons)),this.options.showPaginationSwitch&&g.push(b('<button class="btn btn-default" type="button" name="paginationSwitch" title="%s">',this.options.formatPaginationSwitch()),b('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.paginationSwitchDown),"</button>"),this.options.showRefresh&&g.push(b('<button class="btn btn-default'+(void 0===this.options.iconSize?"":" btn-"+this.options.iconSize)+'" type="button" name="refresh" title="%s">',this.options.formatRefresh()),b('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.refresh),"</button>"),this.options.showToggle&&g.push(b('<button class="btn btn-default'+(void 0===this.options.iconSize?"":" btn-"+this.options.iconSize)+'" type="button" name="toggle" title="%s">',this.options.formatToggle()),b('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.toggle),"</button>"),this.options.showColumns&&(g.push(b('<div class="keep-open btn-group" title="%s">',this.options.formatColumns()),'<button type="button" class="btn btn-default'+(void 0==this.options.iconSize?"":" btn-"+this.options.iconSize)+' dropdown-toggle" data-toggle="dropdown">',b('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.columns),' <span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">'),a.each(this.options.columns,function(a,c){if(!c.radio&&!c.checkbox){var d=c.visible?' checked="checked"':"";c.switchable&&(g.push(b('<li><label><input type="checkbox" data-field="%s" value="%s"%s> %s</label></li>',c.field,a,d,c.title)),i++)}}),g.push("</ul>","</div>")),g.push("</div>"),(this.showToolbar||g.length>2)&&this.$toolbar.append(g.join("")),this.options.showPaginationSwitch&&this.$toolbar.find('button[name="paginationSwitch"]').off("click").on("click",a.proxy(this.togglePagination,this)),this.options.showRefresh&&this.$toolbar.find('button[name="refresh"]').off("click").on("click",a.proxy(this.refresh,this)),this.options.showToggle&&this.$toolbar.find('button[name="toggle"]').off("click").on("click",function(){e.options.cardView=!e.options.cardView,e.initHeader(),e.initBody()}),this.options.showColumns&&(c=this.$toolbar.find(".keep-open"),i<=this.options.minimumCountColumns&&c.find("input").prop("disabled",!0),c.find("li").off("click").on("click",function(a){a.stopImmediatePropagation()}),c.find("input").off("click").on("click",function(){var b=a(this);e.toggleColumn(b.val(),b.prop("checked"),!1),e.trigger("column-switch",a(this).data("field"),b.prop("checked"))})),this.options.search&&(g=[],g.push('<div class="pull-'+this.options.searchAlign+' search">',b('<input class="form-control'+(void 0===this.options.iconSize?"":" input-"+this.options.iconSize)+'" type="text" placeholder="%s">',this.options.formatSearch()),"</div>"),this.$toolbar.append(g.join("")),d=this.$toolbar.find(".search input"),d.off("keyup").on("keyup",function(a){clearTimeout(h),h=setTimeout(function(){e.onSearch(a)},e.options.searchTimeOut)}))},h.prototype.onSearch=function(b){var c=a.trim(a(b.currentTarget).val());this.options.trimOnSearch&&a(b.currentTarget).val(c),c!==this.searchText&&(this.searchText=c,this.options.pageNumber=1,this.initSearch(),this.updatePagination(),this.trigger("search",c))},h.prototype.initSearch=function(){var b=this;if("server"!==this.options.sidePagination){var c=this.searchText&&this.searchText.toLowerCase(),d=a.isEmptyObject(this.filterColumns)?null:this.filterColumns;this.data=d?a.grep(this.options.data,function(a){for(var b in d)if(a[b]!==d[b])return!1;return!0}):this.options.data,this.data=c?a.grep(this.data,function(d,e){for(var g in d){g=a.isNumeric(g)?parseInt(g,10):g;var h=d[g];h=f(b.header,b.header.formatters[a.inArray(g,b.header.fields)],[h,d,e],h);var i=a.inArray(g,b.header.fields);if(-1!==i&&b.header.searchables[i]&&("string"==typeof h||"number"==typeof h)&&-1!==(h+"").toLowerCase().indexOf(c))return!0}return!1}):this.data}},h.prototype.initPagination=function(){if(this.$pagination=this.$container.find(".fixed-table-pagination"),!this.options.pagination)return void this.$pagination.hide();this.$pagination.show();var c,d,e,f,g,h,i,j,k,l=this,m=[],n=this.getData();"server"!==this.options.sidePagination&&(this.options.totalRows=n.length),this.totalPages=0,this.options.totalRows&&(this.totalPages=~~((this.options.totalRows-1)/this.options.pageSize)+1,this.options.totalPages=this.totalPages),this.totalPages>0&&this.options.pageNumber>this.totalPages&&(this.options.pageNumber=this.totalPages),this.pageFrom=(this.options.pageNumber-1)*this.options.pageSize+1,this.pageTo=this.options.pageNumber*this.options.pageSize,this.pageTo>this.options.totalRows&&(this.pageTo=this.options.totalRows),m.push('<div class="pull-left pagination-detail">','<span class="pagination-info">',this.options.formatShowingRows(this.pageFrom,this.pageTo,this.options.totalRows),"</span>"),m.push('<span class="page-list">');var o=['<span class="btn-group dropup">','<button type="button" class="btn btn-default '+(void 0===this.options.iconSize?"":" btn-"+this.options.iconSize)+' dropdown-toggle" data-toggle="dropdown">','<span class="page-size">',this.options.pageSize,"</span>",' <span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">'],p=this.options.pageList;if("string"==typeof this.options.pageList){var q=this.options.pageList.replace("[","").replace("]","").replace(/ /g,"").split(",");p=[],a.each(q,function(a,b){p.push(+b)})}for(a.each(p,function(a,c){if(!l.options.smartDisplay||0===a||p[a-1]<=l.options.totalRows){var d=c===l.options.pageSize?' class="active"':"";o.push(b('<li%s><a href="javascript:void(0)">%s</a></li>',d,c))}}),o.push("</ul></span>"),m.push(this.options.formatRecordsPerPage(o.join(""))),m.push("</span>"),m.push("</div>",'<div class="pull-right pagination">','<ul class="pagination'+(void 0===this.options.iconSize?"":" pagination-"+this.options.iconSize)+'">','<li class="page-first"><a href="javascript:void(0)">&lt;&lt;</a></li>','<li class="page-pre"><a href="javascript:void(0)">&lt;</a></li>'),this.totalPages<5?(d=1,e=this.totalPages):(d=this.options.pageNumber-2,e=d+4,1>d&&(d=1,e=5),e>this.totalPages&&(e=this.totalPages,d=e-4)),c=d;e>=c;c++)m.push('<li class="page-number'+(c===this.options.pageNumber?" active":"")+'">','<a href="javascript:void(0)">',c,"</a>","</li>");m.push('<li class="page-next"><a href="javascript:void(0)">&gt;</a></li>','<li class="page-last"><a href="javascript:void(0)">&gt;&gt;</a></li>',"</ul>","</div>"),this.$pagination.html(m.join("")),f=this.$pagination.find(".page-list a"),g=this.$pagination.find(".page-first"),h=this.$pagination.find(".page-pre"),i=this.$pagination.find(".page-next"),j=this.$pagination.find(".page-last"),k=this.$pagination.find(".page-number"),this.options.pageNumber<=1&&(g.addClass("disabled"),h.addClass("disabled")),this.options.pageNumber>=this.totalPages&&(i.addClass("disabled"),j.addClass("disabled")),this.options.smartDisplay&&(this.totalPages<=1&&this.$pagination.find("div.pagination").hide(),(this.options.pageList.length<2||this.options.totalRows<=this.options.pageList[0])&&this.$pagination.find("span.page-list").hide(),this.$pagination[this.getData().length?"show":"hide"]()),f.off("click").on("click",a.proxy(this.onPageListChange,this)),g.off("click").on("click",a.proxy(this.onPageFirst,this)),h.off("click").on("click",a.proxy(this.onPagePre,this)),i.off("click").on("click",a.proxy(this.onPageNext,this)),j.off("click").on("click",a.proxy(this.onPageLast,this)),k.off("click").on("click",a.proxy(this.onPageNumber,this))},h.prototype.updatePagination=function(b){b&&a(b.currentTarget).hasClass("disabled")||(this.options.maintainSelected||this.resetRows(),this.initPagination(),"server"===this.options.sidePagination?this.initServer():this.initBody(),this.trigger("page-change",this.options.pageNumber,this.options.pageSize))},h.prototype.onPageListChange=function(b){var c=a(b.currentTarget);c.parent().addClass("active").siblings().removeClass("active"),this.options.pageSize=+c.text(),this.$toolbar.find(".page-size").text(this.options.pageSize),this.updatePagination(b)},h.prototype.onPageFirst=function(a){this.options.pageNumber=1,this.updatePagination(a)},h.prototype.onPagePre=function(a){this.options.pageNumber--,this.updatePagination(a)},h.prototype.onPageNext=function(a){this.options.pageNumber++,this.updatePagination(a)},h.prototype.onPageLast=function(a){this.options.pageNumber=this.totalPages,this.updatePagination(a)},h.prototype.onPageNumber=function(b){this.options.pageNumber!==+a(b.currentTarget).text()&&(this.options.pageNumber=+a(b.currentTarget).text(),this.updatePagination(b))},h.prototype.initBody=function(e){var h=this,i=[],j=this.getData();this.trigger("pre-body",j),this.$body=this.$el.find("tbody"),this.$body.length||(this.$body=a("<tbody></tbody>").appendTo(this.$el)),this.options.pagination&&"server"!==this.options.sidePagination||(this.pageFrom=1,this.pageTo=j.length);for(var k=this.pageFrom-1;k<this.pageTo;k++){var l=j[k],m={},n=[],o={},p=[];if(m=f(this.options,this.options.rowStyle,[l,k],m),m&&m.css)for(var q in m.css)n.push(q+": "+m.css[q]);if(o=f(this.options,this.options.rowAttributes,[l,k],o))for(var q in o)p.push(b('%s="%s"',q,g(o[q])));i.push("<tr",b(" %s",p.join(" ")),b(' id="%s"',a.isArray(l)?void 0:l._id),b(' class="%s"',m.classes||(a.isArray(l)?void 0:l._class)),b(' data-index="%s"',k),">"),this.options.cardView&&i.push(b('<td colspan="%s">',this.header.fields.length)),a.each(this.header.fields,function(e,g){var j="",o=l[g],p="",q={},r="",s=h.header.classes[e],t="",u=h.options.columns[d(h.options.columns,g)];if(m=b('style="%s"',n.concat(h.header.styles[e]).join("; ")),o=f(h.header,h.header.formatters[e],[o,l,k],o),l["_"+g+"_id"]&&(r=b(' id="%s"',l["_"+g+"_id"])),l["_"+g+"_class"]&&(s=b(' class="%s"',l["_"+g+"_class"])),q=f(h.header,h.header.cellStyles[e],[o,l,k],q),q.classes&&(s=b(' class="%s"',q.classes)),q.css){var v=[];for(var w in q.css)v.push(w+": "+q.css[w]);m=b('style="%s"',v.concat(h.header.styles[e]).join("; "))}l["_"+g+"_data"]&&!a.isEmptyObject(l["_"+g+"_data"])&&a.each(l["_"+g+"_data"],function(a,c){"index"!==a&&(t+=b(' data-%s="%s"',a,c))}),u.checkbox||u.radio?(p=u.checkbox?"checkbox":p,p=u.radio?"radio":p,j=[h.options.cardView?'<div class="card-view">':'<td class="bs-checkbox">',"<input"+b(' data-index="%s"',k)+b(' name="%s"',h.options.selectItemName)+b(' type="%s"',p)+b(' value="%s"',l[h.options.idField])+b(' checked="%s"',o===!0||o&&o.checked?"checked":void 0)+b(' disabled="%s"',!u.checkboxEnabled||o&&o.disabled?"disabled":void 0)+" />",h.options.cardView?"</div>":"</td>"].join("")):(o="undefined"==typeof o||null===o?h.options.undefinedText:o,j=h.options.cardView?['<div class="card-view">',h.options.showHeader?b('<span class="title" %s>%s</span>',m,c(h.options.columns,"field","title",g)):"",b('<span class="value">%s</span>',o),"</div>"].join(""):[b("<td%s %s %s %s>",r,s,m,t),o,"</td>"].join(""),h.options.cardView&&h.options.smartDisplay&&""===o&&(j="")),i.push(j)}),this.options.cardView&&i.push("</td>"),i.push("</tr>")}i.length||i.push('<tr class="no-records-found">',b('<td colspan="%s">%s</td>',this.header.fields.length,this.options.formatNoMatches()),"</tr>"),this.$body.html(i.join("")),e||this.scrollTo(0),this.$body.find("> tr > td").off("click").on("click",function(){var c=a(this).parent();h.trigger("click-row",h.data[c.data("index")],c),h.options.clickToSelect&&h.header.clickToSelects[c.children().index(a(this))]&&c.find(b('[name="%s"]',h.options.selectItemName))[0].click()}),this.$body.find("tr").off("dblclick").on("dblclick",function(){h.trigger("dbl-click-row",h.data[a(this).data("index")],a(this))}),this.$selectItem=this.$body.find(b('[name="%s"]',this.options.selectItemName)),this.$selectItem.off("click").on("click",function(b){b.stopImmediatePropagation();var c=a(this).prop("checked"),d=h.data[a(this).data("index")];d[h.header.stateField]=c,h.trigger(c?"check":"uncheck",d),h.options.singleSelect&&(h.$selectItem.not(this).each(function(){h.data[a(this).data("index")][h.header.stateField]=!1}),h.$selectItem.filter(":checked").not(this).prop("checked",!1)),h.updateSelected()}),a.each(this.header.events,function(b,c){if(c){"string"==typeof c&&(c=f(null,c));for(var d in c)h.$body.find("tr").each(function(){var e=a(this),f=e.find(h.options.cardView?".card-view":"td").eq(b),g=d.indexOf(" "),i=d.substring(0,g),j=d.substring(g+1),k=c[d];f.find(j).off(i).on(i,function(a){var c=e.data("index"),d=h.data[c],f=d[h.header.fields[b]];k.apply(this,[a,f,d,c])})})}}),this.updateSelected(),this.resetView(),this.trigger("post-body")},h.prototype.initServer=function(b,c){var d=this,e={},g={pageSize:this.options.pageSize,pageNumber:this.options.pageNumber,searchText:this.searchText,sortName:this.options.sortName,sortOrder:this.options.sortOrder};this.options.url&&("limit"===this.options.queryParamsType&&(g={search:g.searchText,sort:g.sortName,order:g.sortOrder},this.options.pagination&&(g.limit=this.options.pageSize,g.offset=this.options.pageSize*(this.options.pageNumber-1))),e=f(this.options,this.options.queryParams,[g],e),a.extend(e,c||{}),e!==!1&&(b||this.$loading.show(),a.ajax(a.extend({},f(null,this.options.ajaxOptions),{type:this.options.method,url:this.options.url,data:"application/json"===this.options.contentType&&"post"===this.options.method?JSON.stringify(e):e,cache:this.options.cache,contentType:this.options.contentType,dataType:this.options.dataType,success:function(a){a=f(d.options,d.options.responseHandler,[a],a),d.load(a),d.trigger("load-success",a)},error:function(a){d.trigger("load-error",a.status)},complete:function(){b||d.$loading.hide()}}))))},h.prototype.getCaretHtml=function(){return['<span class="order'+("desc"===this.options.sortOrder?"":" dropup")+'">','<span class="caret" style="margin: 10px 5px;"></span>',"</span>"].join("")},h.prototype.updateSelected=function(){var b=this.$selectItem.filter(":enabled").length===this.$selectItem.filter(":enabled").filter(":checked").length;this.$selectAll.add(this.$selectAll_).prop("checked",b),this.$selectItem.each(function(){a(this).parents("tr")[a(this).prop("checked")?"addClass":"removeClass"]("selected")})},h.prototype.updateRows=function(b){var c=this;this.$selectItem.each(function(){c.data[a(this).data("index")][c.header.stateField]=b})},h.prototype.resetRows=function(){var b=this;a.each(this.data,function(a,c){b.$selectAll.prop("checked",!1),b.$selectItem.prop("checked",!1),c[b.header.stateField]=!1})},h.prototype.trigger=function(b){var c=Array.prototype.slice.call(arguments,1);b+=".bs.table",this.options[h.EVENTS[b]].apply(this.options,c),this.$el.trigger(a.Event(b),c),this.options.onAll(b,c),this.$el.trigger(a.Event("all.bs.table"),[b,c])},h.prototype.resetHeader=function(){var b=this,c=this.$container.find(".fixed-table-header"),d=this.$container.find(".fixed-table-body"),f=this.$el.width()>d.width()?e():0;return this.$el.is(":hidden")?(clearTimeout(this.timeoutId_),void(this.timeoutId_=setTimeout(a.proxy(this.resetHeader,this),100))):(this.$header_=this.$header.clone(!0,!0),this.$selectAll_=this.$header_.find('[name="btSelectAll"]'),void setTimeout(function(){c.css({height:"37px","border-bottom":"1px solid #dddddd","margin-right":f}).find("table").css("width",b.$el.css("width")).html("").attr("class",b.$el.attr("class")).append(b.$header_),b.$header.find("th").each(function(c){b.$header_.find("th").eq(c).data(a(this).data())}),b.$body.find("tr:first-child:not(.no-records-found) > *").each(function(c){b.$header_.find("div.fht-cell").eq(c).width(a(this).innerWidth())}),b.$el.css("margin-top",-b.$header.height()),d.off("scroll").on("scroll",function(){c.scrollLeft(a(this).scrollLeft())}),b.trigger("post-header")}))},h.prototype.toggleColumn=function(a,c,d){if(-1!==a&&(this.options.columns[a].visible=c,this.initHeader(),this.initSearch(),this.initPagination(),this.initBody(),this.options.showColumns)){var e=this.$toolbar.find(".keep-open input").prop("disabled",!1);d&&e.filter(b('[value="%s"]',a)).prop("checked",c),e.filter(":checked").length<=this.options.minimumCountColumns&&e.filter(":checked").prop("disabled",!0)}},h.prototype.resetView=function(a){{var b=this;this.header}if(a&&a.height&&(this.options.height=a.height),this.$selectAll.prop("checked",this.$selectItem.length>0&&this.$selectItem.length===this.$selectItem.filter(":checked").length),this.options.height){var c=+this.$toolbar.children().outerHeight(!0),d=+this.$pagination.children().outerHeight(!0),e=this.options.height-c-d;this.$container.find(".fixed-table-container").css("height",e+"px")}return this.options.cardView?(b.$el.css("margin-top","0"),void b.$container.find(".fixed-table-container").css("padding-bottom","0")):(this.options.showHeader&&this.options.height?this.resetHeader():this.trigger("post-header"),void(this.options.height&&this.options.showHeader&&this.$container.find(".fixed-table-container").css("padding-bottom","37px")))},h.prototype.getData=function(){return this.searchText||!a.isEmptyObject(this.filterColumns)?this.data:this.options.data},h.prototype.load=function(b){var c=!1;"server"===this.options.sidePagination?(this.options.totalRows=b.total,c=b.fixedScroll,b=b.rows):a.isArray(b)||(c=b.fixedScroll,b=b.data),this.initData(b),this.initSearch(),this.initPagination(),this.initBody(c)},h.prototype.append=function(a){this.initData(a,"append"),this.initSearch(),this.initPagination(),this.initBody(!0)},h.prototype.prepend=function(a){this.initData(a,"prepend"),this.initSearch(),this.initPagination(),this.initBody(!0)},h.prototype.remove=function(b){var c,d,e=this.options.data.length;if(b.hasOwnProperty("field")&&b.hasOwnProperty("values")){for(c=e-1;c>=0;c--)d=this.options.data[c],d.hasOwnProperty(b.field)&&-1!==a.inArray(d[b.field],b.values)&&this.options.data.splice(c,1);e!==this.options.data.length&&(this.initSearch(),this.initPagination(),this.initBody(!0))}},h.prototype.insertRow=function(a){a.hasOwnProperty("index")&&a.hasOwnProperty("row")&&(this.data.splice(a.index,0,a.row),this.initBody(!0))},h.prototype.updateRow=function(b){b.hasOwnProperty("index")&&b.hasOwnProperty("row")&&(a.extend(this.data[b.index],b.row),this.initBody(!0))},h.prototype.mergeCells=function(b){var c,d,e=b.index,f=a.inArray(b.field,this.header.fields),g=b.rowspan||1,h=b.colspan||1,i=this.$body.find("tr"),j=i.eq(e).find("td").eq(f);if(!(0>e||0>f||e>=this.data.length)){for(c=e;e+g>c;c++)for(d=f;f+h>d;d++)i.eq(c).find("td").eq(d).hide();j.attr("rowspan",g).attr("colspan",h).show()}},h.prototype.getOptions=function(){return this.options},h.prototype.getSelections=function(){var b=this;return a.grep(this.data,function(a){return a[b.header.stateField]})},h.prototype.checkAll=function(){this.checkAll_(!0)},h.prototype.uncheckAll=function(){this.checkAll_(!1)},h.prototype.checkAll_=function(a){var b;a||(b=this.getSelections()),this.$selectItem.filter(":enabled").prop("checked",a),this.updateRows(a),this.updateSelected(),a&&(b=this.getSelections()),this.trigger(a?"check-all":"uncheck-all",b)},h.prototype.check=function(a){this.check_(!0,a)},h.prototype.uncheck=function(a){this.check_(!1,a)},h.prototype.check_=function(a,c){this.$selectItem.filter(b('[data-index="%s"]',c)).prop("checked",a),this.data[c][this.header.stateField]=a,this.updateSelected(),this.trigger(a?"check":"uncheck",this.data[c])},h.prototype.checkBy=function(a){this.checkBy_(!0,a)},h.prototype.uncheckBy=function(a){this.checkBy_(!1,a)},h.prototype.checkBy_=function(c,d){if(d.hasOwnProperty("field")&&d.hasOwnProperty("values")){var e=this;a.each(this.options.data,function(f,g){return g.hasOwnProperty(d.field)?void(-1!==a.inArray(g[d.field],d.values)&&(e.$selectItem.filter(b('[data-index="%s"]',f)).prop("checked",c),g[e.header.stateField]=c,e.trigger(c?"check":"uncheck",g))):!1}),this.updateSelected()}},h.prototype.destroy=function(){this.$el.insertBefore(this.$container),a(this.options.toolbar).insertBefore(this.$el),this.$container.next().remove(),this.$container.remove(),this.$el.html(this.$el_.html()).css("margin-top","0").attr("class",this.$el_.attr("class")||"")},h.prototype.showLoading=function(){this.$loading.show()},h.prototype.hideLoading=function(){this.$loading.hide()},h.prototype.togglePagination=function(){this.options.pagination=!this.options.pagination;var a=this.$toolbar.find('button[name="paginationSwitch"] i');this.options.pagination?a.attr("class",this.options.iconsPrefix+" "+this.options.icons.paginationSwitchDown):a.attr("class",this.options.iconsPrefix+" "+this.options.icons.paginationSwitchUp),this.updatePagination()},h.prototype.refresh=function(a){a&&a.url&&(this.options.url=a.url,this.options.pageNumber=1),this.initServer(a&&a.silent,a&&a.query)},h.prototype.showColumn=function(a){this.toggleColumn(d(this.options.columns,a),!0,!0)},h.prototype.hideColumn=function(a){this.toggleColumn(d(this.options.columns,a),!1,!0)},h.prototype.filterBy=function(b){this.filterColumns=a.isEmptyObject(b)?{}:b,this.options.pageNumber=1,this.initSearch(),this.updatePagination()},h.prototype.scrollTo=function(a){var b=this.$container.find(".fixed-table-body");"string"==typeof a&&(a="bottom"===a?b[0].scrollHeight:0),"number"==typeof a&&b.scrollTop(a)},h.prototype.selectPage=function(a){a>0&&a<=this.options.totalPages&&(this.options.pageNumber=a,this.updatePagination())},h.prototype.prevPage=function(){this.options.pageNumber>1&&(this.options.pageNumber--,this.updatePagination())},h.prototype.nextPage=function(){this.options.pageNumber<this.options.totalPages&&(this.options.pageNumber++,this.updatePagination())},h.prototype.toggleView=function(){this.options.cardView=!this.options.cardView,this.initHeader(),this.initBody()};var i=["getOptions","getSelections","getData","load","append","prepend","remove","insertRow","updateRow","mergeCells","checkAll","uncheckAll","check","uncheck","checkBy","uncheckBy","refresh","resetView","destroy","showLoading","hideLoading","showColumn","hideColumn","filterBy","scrollTo","selectPage","prevPage","nextPage","togglePagination","toggleView"];a.fn.bootstrapTable=function(b,c){var d;return this.each(function(){var e=a(this),f=e.data("bootstrap.table"),g=a.extend({},h.DEFAULTS,e.data(),"object"==typeof b&&b);
if("string"==typeof b){if(a.inArray(b,i)<0)throw"Unknown method: "+b;if(!f)return;d=f[b](c),"destroy"===b&&e.removeData("bootstrap.table")}f||e.data("bootstrap.table",f=new h(this,g))}),"undefined"==typeof d?this:d},a.fn.bootstrapTable.Constructor=h,a.fn.bootstrapTable.defaults=h.DEFAULTS,a.fn.bootstrapTable.columnDefaults=h.COLUMN_DEFAULTS,a.fn.bootstrapTable.locales=h.LOCALES,a.fn.bootstrapTable.methods=i,a(function(){a('[data-toggle="table"]').bootstrapTable()})}(jQuery);
/*!
 * Timepicker Component for Twitter Bootstrap
 *
 * Copyright 2013 Joris de Wit
 *
 * Contributors https://github.com/jdewit/bootstrap-timepicker/graphs/contributors
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
(function($, window, document, undefined) {
  'use strict';

  // TIMEPICKER PUBLIC CLASS DEFINITION
  var Timepicker = function(element, options) {
    this.widget = '';
    this.$element = $(element);
    this.defaultTime = options.defaultTime;
    this.disableFocus = options.disableFocus;
    this.disableMousewheel = options.disableMousewheel;
    this.isOpen = options.isOpen;
    this.minuteStep = options.minuteStep;
    this.modalBackdrop = options.modalBackdrop;
    this.orientation = options.orientation;
    this.secondStep = options.secondStep;
    this.showInputs = options.showInputs;
    this.showMeridian = options.showMeridian;
    this.showSeconds = options.showSeconds;
    this.template = options.template;
    this.appendWidgetTo = options.appendWidgetTo;
    this.showWidgetOnAddonClick = options.showWidgetOnAddonClick;

    this._init();
  };

  Timepicker.prototype = {

    constructor: Timepicker,
    _init: function() {
      var self = this;

      if (this.showWidgetOnAddonClick && (this.$element.parent().hasClass('input-append') || this.$element.parent().hasClass('input-prepend'))) {
        this.$element.parent('.input-append, .input-prepend').find('.add-on').on({
          'click.timepicker': $.proxy(this.showWidget, this)
        });
        this.$element.on({
          'focus.timepicker': $.proxy(this.highlightUnit, this),
          'click.timepicker': $.proxy(this.highlightUnit, this),
          'keydown.timepicker': $.proxy(this.elementKeydown, this),
          'blur.timepicker': $.proxy(this.blurElement, this),
          'mousewheel.timepicker DOMMouseScroll.timepicker': $.proxy(this.mousewheel, this)
        });
      } else {
        if (this.template) {
          this.$element.on({
            'focus.timepicker': $.proxy(this.showWidget, this),
            'click.timepicker': $.proxy(this.showWidget, this),
            'blur.timepicker': $.proxy(this.blurElement, this),
            'mousewheel.timepicker DOMMouseScroll.timepicker': $.proxy(this.mousewheel, this)
          });
        } else {
          this.$element.on({
            'focus.timepicker': $.proxy(this.highlightUnit, this),
            'click.timepicker': $.proxy(this.highlightUnit, this),
            'keydown.timepicker': $.proxy(this.elementKeydown, this),
            'blur.timepicker': $.proxy(this.blurElement, this),
            'mousewheel.timepicker DOMMouseScroll.timepicker': $.proxy(this.mousewheel, this)
          });
        }
      }

      if (this.template !== false) {
        this.$widget = $(this.getTemplate()).on('click', $.proxy(this.widgetClick, this));
      } else {
        this.$widget = false;
      }

      if (this.showInputs && this.$widget !== false) {
        this.$widget.find('input').each(function() {
          $(this).on({
            'click.timepicker': function() { $(this).select(); },
            'keydown.timepicker': $.proxy(self.widgetKeydown, self),
            'keyup.timepicker': $.proxy(self.widgetKeyup, self)
          });
        });
      }

      this.setDefaultTime(this.defaultTime);
    },

    blurElement: function() {
      this.highlightedUnit = null;
      this.updateFromElementVal();
    },

    clear: function() {
      this.hour = '';
      this.minute = '';
      this.second = '';
      this.meridian = '';

      this.$element.val('');
    },

    decrementHour: function() {
      if (this.showMeridian) {
        if (this.hour === 1) {
          this.hour = 12;
        } else if (this.hour === 12) {
          this.hour--;

          return this.toggleMeridian();
        } else if (this.hour === 0) {
          this.hour = 11;

          return this.toggleMeridian();
        } else {
          this.hour--;
        }
      } else {
        if (this.hour <= 0) {
          this.hour = 23;
        } else {
          this.hour--;
        }
      }
    },

    decrementMinute: function(step) {
      var newVal;

      if (step) {
        newVal = this.minute - step;
      } else {
        newVal = this.minute - this.minuteStep;
      }

      if (newVal < 0) {
        this.decrementHour();
        this.minute = newVal + 60;
      } else {
        this.minute = newVal;
      }
    },

    decrementSecond: function() {
      var newVal = this.second - this.secondStep;

      if (newVal < 0) {
        this.decrementMinute(true);
        this.second = newVal + 60;
      } else {
        this.second = newVal;
      }
    },

    elementKeydown: function(e) {
      switch (e.keyCode) {
      case 9: //tab
      case 27: // escape
        this.updateFromElementVal();
        break;
      case 37: // left arrow
        e.preventDefault();
        this.highlightPrevUnit();
        break;
      case 38: // up arrow
        e.preventDefault();
        switch (this.highlightedUnit) {
        case 'hour':
          this.incrementHour();
          this.highlightHour();
          break;
        case 'minute':
          this.incrementMinute();
          this.highlightMinute();
          break;
        case 'second':
          this.incrementSecond();
          this.highlightSecond();
          break;
        case 'meridian':
          this.toggleMeridian();
          this.highlightMeridian();
          break;
        }
        this.update();
        break;
      case 39: // right arrow
        e.preventDefault();
        this.highlightNextUnit();
        break;
      case 40: // down arrow
        e.preventDefault();
        switch (this.highlightedUnit) {
        case 'hour':
          this.decrementHour();
          this.highlightHour();
          break;
        case 'minute':
          this.decrementMinute();
          this.highlightMinute();
          break;
        case 'second':
          this.decrementSecond();
          this.highlightSecond();
          break;
        case 'meridian':
          this.toggleMeridian();
          this.highlightMeridian();
          break;
        }

        this.update();
        break;
      }
    },

    getCursorPosition: function() {
      var input = this.$element.get(0);

      if ('selectionStart' in input) {// Standard-compliant browsers

        return input.selectionStart;
      } else if (document.selection) {// IE fix
        input.focus();
        var sel = document.selection.createRange(),
          selLen = document.selection.createRange().text.length;

        sel.moveStart('character', - input.value.length);

        return sel.text.length - selLen;
      }
    },

    getTemplate: function() {
      var template,
        hourTemplate,
        minuteTemplate,
        secondTemplate,
        meridianTemplate,
        templateContent;

      if (this.showInputs) {
        hourTemplate = '<input type="text" class="bootstrap-timepicker-hour" maxlength="2"/>';
        minuteTemplate = '<input type="text" class="bootstrap-timepicker-minute" maxlength="2"/>';
        secondTemplate = '<input type="text" class="bootstrap-timepicker-second" maxlength="2"/>';
        meridianTemplate = '<input type="text" class="bootstrap-timepicker-meridian" maxlength="2"/>';
      } else {
        hourTemplate = '<span class="bootstrap-timepicker-hour"></span>';
        minuteTemplate = '<span class="bootstrap-timepicker-minute"></span>';
        secondTemplate = '<span class="bootstrap-timepicker-second"></span>';
        meridianTemplate = '<span class="bootstrap-timepicker-meridian"></span>';
      }

      templateContent = '<table>'+
         '<tr>'+
           '<td><a href="#" data-action="incrementHour"><i class="glyphicon glyphicon-chevron-up"></i></a></td>'+
           '<td class="separator">&nbsp;</td>'+
           '<td><a href="#" data-action="incrementMinute"><i class="glyphicon glyphicon-chevron-up"></i></a></td>'+
           (this.showSeconds ?
             '<td class="separator">&nbsp;</td>'+
             '<td><a href="#" data-action="incrementSecond"><i class="glyphicon glyphicon-chevron-up"></i></a></td>'
           : '') +
           (this.showMeridian ?
             '<td class="separator">&nbsp;</td>'+
             '<td class="meridian-column"><a href="#" data-action="toggleMeridian"><i class="glyphicon glyphicon-chevron-up"></i></a></td>'
           : '') +
         '</tr>'+
         '<tr>'+
           '<td>'+ hourTemplate +'</td> '+
           '<td class="separator">:</td>'+
           '<td>'+ minuteTemplate +'</td> '+
           (this.showSeconds ?
            '<td class="separator">:</td>'+
            '<td>'+ secondTemplate +'</td>'
           : '') +
           (this.showMeridian ?
            '<td class="separator">&nbsp;</td>'+
            '<td>'+ meridianTemplate +'</td>'
           : '') +
         '</tr>'+
         '<tr>'+
           '<td><a href="#" data-action="decrementHour"><i class="glyphicon glyphicon-chevron-down"></i></a></td>'+
           '<td class="separator"></td>'+
           '<td><a href="#" data-action="decrementMinute"><i class="glyphicon glyphicon-chevron-down"></i></a></td>'+
           (this.showSeconds ?
            '<td class="separator">&nbsp;</td>'+
            '<td><a href="#" data-action="decrementSecond"><i class="glyphicon glyphicon-chevron-down"></i></a></td>'
           : '') +
           (this.showMeridian ?
            '<td class="separator">&nbsp;</td>'+
            '<td><a href="#" data-action="toggleMeridian"><i class="glyphicon glyphicon-chevron-down"></i></a></td>'
           : '') +
         '</tr>'+
       '</table>';

      switch(this.template) {
      case 'modal':
        template = '<div class="bootstrap-timepicker-widget modal hide fade in" data-backdrop="'+ (this.modalBackdrop ? 'true' : 'false') +'">'+
          '<div class="modal-header">'+
            '<a href="#" class="close" data-dismiss="modal">×</a>'+
            '<h3>Pick a Time</h3>'+
          '</div>'+
          '<div class="modal-content">'+
            templateContent +
          '</div>'+
          '<div class="modal-footer">'+
            '<a href="#" class="btn btn-primary" data-dismiss="modal">OK</a>'+
          '</div>'+
        '</div>';
        break;
      case 'dropdown':
        template = '<div class="bootstrap-timepicker-widget dropdown-menu">'+ templateContent +'</div>';
        break;
      }

      return template;
    },

    getTime: function() {
      if (this.hour === '') {
        return '';
      }

      return this.hour + ':' + (this.minute.toString().length === 1 ? '0' + this.minute : this.minute) + (this.showSeconds ? ':' + (this.second.toString().length === 1 ? '0' + this.second : this.second) : '') + (this.showMeridian ? ' ' + this.meridian : '');
    },

    hideWidget: function() {
      if (this.isOpen === false) {
        return;
      }

      this.$element.trigger({
        'type': 'hide.timepicker',
        'time': {
          'value': this.getTime(),
          'hours': this.hour,
          'minutes': this.minute,
          'seconds': this.second,
          'meridian': this.meridian
        }
      });

      if (this.template === 'modal' && this.$widget.modal) {
        this.$widget.modal('hide');
      } else {
        this.$widget.removeClass('open');
      }

      $(document).off('mousedown.timepicker, touchend.timepicker');

      this.isOpen = false;
      // show/hide approach taken by datepicker
      this.$widget.detach();
    },

    highlightUnit: function() {
      this.position = this.getCursorPosition();
      if (this.position >= 0 && this.position <= 2) {
        this.highlightHour();
      } else if (this.position >= 3 && this.position <= 5) {
        this.highlightMinute();
      } else if (this.position >= 6 && this.position <= 8) {
        if (this.showSeconds) {
          this.highlightSecond();
        } else {
          this.highlightMeridian();
        }
      } else if (this.position >= 9 && this.position <= 11) {
        this.highlightMeridian();
      }
    },

    highlightNextUnit: function() {
      switch (this.highlightedUnit) {
      case 'hour':
        this.highlightMinute();
        break;
      case 'minute':
        if (this.showSeconds) {
          this.highlightSecond();
        } else if (this.showMeridian){
          this.highlightMeridian();
        } else {
          this.highlightHour();
        }
        break;
      case 'second':
        if (this.showMeridian) {
          this.highlightMeridian();
        } else {
          this.highlightHour();
        }
        break;
      case 'meridian':
        this.highlightHour();
        break;
      }
    },

    highlightPrevUnit: function() {
      switch (this.highlightedUnit) {
      case 'hour':
        if(this.showMeridian){
          this.highlightMeridian();
        } else if (this.showSeconds) {
          this.highlightSecond();
        } else {
          this.highlightMinute();
        }
        break;
      case 'minute':
        this.highlightHour();
        break;
      case 'second':
        this.highlightMinute();
        break;
      case 'meridian':
        if (this.showSeconds) {
          this.highlightSecond();
        } else {
          this.highlightMinute();
        }
        break;
      }
    },

    highlightHour: function() {
      var $element = this.$element.get(0),
          self = this;

      this.highlightedUnit = 'hour';

			if ($element.setSelectionRange) {
				setTimeout(function() {
          if (self.hour < 10) {
            $element.setSelectionRange(0,1);
          } else {
            $element.setSelectionRange(0,2);
          }
				}, 0);
			}
    },

    highlightMinute: function() {
      var $element = this.$element.get(0),
          self = this;

      this.highlightedUnit = 'minute';

			if ($element.setSelectionRange) {
				setTimeout(function() {
          if (self.hour < 10) {
            $element.setSelectionRange(2,4);
          } else {
            $element.setSelectionRange(3,5);
          }
				}, 0);
			}
    },

    highlightSecond: function() {
      var $element = this.$element.get(0),
          self = this;

      this.highlightedUnit = 'second';

			if ($element.setSelectionRange) {
				setTimeout(function() {
          if (self.hour < 10) {
            $element.setSelectionRange(5,7);
          } else {
            $element.setSelectionRange(6,8);
          }
				}, 0);
			}
    },

    highlightMeridian: function() {
      var $element = this.$element.get(0),
          self = this;

      this.highlightedUnit = 'meridian';

			if ($element.setSelectionRange) {
				if (this.showSeconds) {
					setTimeout(function() {
            if (self.hour < 10) {
              $element.setSelectionRange(8,10);
            } else {
              $element.setSelectionRange(9,11);
            }
					}, 0);
				} else {
					setTimeout(function() {
            if (self.hour < 10) {
              $element.setSelectionRange(5,7);
            } else {
              $element.setSelectionRange(6,8);
            }
					}, 0);
				}
			}
    },

    incrementHour: function() {
      if (this.showMeridian) {
        if (this.hour === 11) {
          this.hour++;
          return this.toggleMeridian();
        } else if (this.hour === 12) {
          this.hour = 0;
        }
      }
      if (this.hour === 23) {
        this.hour = 0;

        return;
      }
      this.hour++;
    },

    incrementMinute: function(step) {
      var newVal;

      if (step) {
        newVal = this.minute + step;
      } else {
        newVal = this.minute + this.minuteStep - (this.minute % this.minuteStep);
      }

      if (newVal > 59) {
        this.incrementHour();
        this.minute = newVal - 60;
      } else {
        this.minute = newVal;
      }
    },

    incrementSecond: function() {
      var newVal = this.second + this.secondStep - (this.second % this.secondStep);

      if (newVal > 59) {
        this.incrementMinute(true);
        this.second = newVal - 60;
      } else {
        this.second = newVal;
      }
    },

    mousewheel: function(e) {
      if (this.disableMousewheel) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail,
          scrollTo = null;

      if (e.type === 'mousewheel') {
        scrollTo = (e.originalEvent.wheelDelta * -1);
      }
      else if (e.type === 'DOMMouseScroll') {
        scrollTo = 40 * e.originalEvent.detail;
      }

      if (scrollTo) {
        e.preventDefault();
        $(this).scrollTop(scrollTo + $(this).scrollTop());
      }

      switch (this.highlightedUnit) {
      case 'minute':
        if (delta > 0) {
          this.incrementMinute();
        } else {
          this.decrementMinute();
        }
        this.highlightMinute();
        break;
      case 'second':
        if (delta > 0) {
          this.incrementSecond();
        } else {
          this.decrementSecond();
        }
        this.highlightSecond();
        break;
      case 'meridian':
        this.toggleMeridian();
        this.highlightMeridian();
        break;
      default:
        if (delta > 0) {
          this.incrementHour();
        } else {
          this.decrementHour();
        }
        this.highlightHour();
        break;
      }

      return false;
    },

    // This method was adapted from bootstrap-datepicker.
    place : function() {
      if (this.isInline) {
        return;
      }
      var widgetWidth = this.$widget.outerWidth(), widgetHeight = this.$widget.outerHeight(), visualPadding = 10, windowWidth =
        $(window).width(), windowHeight = $(window).height(), scrollTop = $(window).scrollTop();

      var zIndex = parseInt(this.$element.parents().filter(function() {}).first().css('z-index'), 10) + 10;
      var offset = this.component ? this.component.parent().offset() : this.$element.offset();
      var height = this.component ? this.component.outerHeight(true) : this.$element.outerHeight(false);
      var width = this.component ? this.component.outerWidth(true) : this.$element.outerWidth(false);
      var left = offset.left, top = offset.top;

      this.$widget.removeClass('timepicker-orient-top timepicker-orient-bottom timepicker-orient-right timepicker-orient-left');

      if (this.orientation.x !== 'auto') {
        this.picker.addClass('datepicker-orient-' + this.orientation.x);
        if (this.orientation.x === 'right') {
          left -= widgetWidth - width;
        }
      } else{
        // auto x orientation is best-placement: if it crosses a window edge, fudge it sideways
        // Default to left
        this.$widget.addClass('timepicker-orient-left');
        if (offset.left < 0) {
          left -= offset.left - visualPadding;
        } else if (offset.left + widgetWidth > windowWidth) {
          left = windowWidth - widgetWidth - visualPadding;
        }
      }
      // auto y orientation is best-situation: top or bottom, no fudging, decision based on which shows more of the widget
      var yorient = this.orientation.y, topOverflow, bottomOverflow;
      if (yorient === 'auto') {
        topOverflow = -scrollTop + offset.top - widgetHeight;
        bottomOverflow = scrollTop + windowHeight - (offset.top + height + widgetHeight);
        if (Math.max(topOverflow, bottomOverflow) === bottomOverflow) {
          yorient = 'top';
        } else {
          yorient = 'bottom';
        }
      }
      this.$widget.addClass('timepicker-orient-' + yorient);
      if (yorient === 'top'){
        top += height;
      } else{
        top -= widgetHeight + parseInt(this.$widget.css('padding-top'), 10);
      }

      this.$widget.css({
        top : top,
        left : left,
        zIndex : zIndex
      });
    },

    remove: function() {
      $('document').off('.timepicker');
      if (this.$widget) {
        this.$widget.remove();
      }
      delete this.$element.data().timepicker;
    },

    setDefaultTime: function(defaultTime) {
      if (!this.$element.val()) {
        if (defaultTime === 'current') {
          var dTime = new Date(),
            hours = dTime.getHours(),
            minutes = dTime.getMinutes(),
            seconds = dTime.getSeconds(),
            meridian = 'AM';

          if (seconds !== 0) {
            seconds = Math.ceil(dTime.getSeconds() / this.secondStep) * this.secondStep;
            if (seconds === 60) {
              minutes += 1;
              seconds = 0;
            }
          }

          if (minutes !== 0) {
            minutes = Math.ceil(dTime.getMinutes() / this.minuteStep) * this.minuteStep;
            if (minutes === 60) {
              hours += 1;
              minutes = 0;
            }
          }

          if (this.showMeridian) {
            if (hours === 0) {
              hours = 12;
            } else if (hours >= 12) {
              if (hours > 12) {
                hours = hours - 12;
              }
              meridian = 'PM';
            } else {
              meridian = 'AM';
            }
          }

          this.hour = hours;
          this.minute = minutes;
          this.second = seconds;
          this.meridian = meridian;

          this.update();

        } else if (defaultTime === false) {
          this.hour = 0;
          this.minute = 0;
          this.second = 0;
          this.meridian = 'AM';
        } else {
          this.setTime(defaultTime);
        }
      } else {
        this.updateFromElementVal();
      }
    },

    setTime: function(time, ignoreWidget) {
      if (!time) {
        this.clear();
        return;
      }

      var timeArray,
          hour,
          minute,
          second,
          meridian;

      if (typeof time === 'object' && time.getMonth){
        // this is a date object
        hour    = time.getHours();
        minute  = time.getMinutes();
        second  = time.getSeconds();

        if (this.showMeridian){
          meridian = 'AM';
          if (hour > 12){
            meridian = 'PM';
            hour = hour % 12;
          }

          if (hour === 12){
            meridian = 'PM';
          }
        }
      } else {
        if (time.match(/p/i) !== null) {
          meridian = 'PM';
        } else {
          meridian = 'AM';
        }

        time = time.replace(/[^0-9\:]/g, '');

        timeArray = time.split(':');

        hour = timeArray[0] ? timeArray[0].toString() : timeArray.toString();
        minute = timeArray[1] ? timeArray[1].toString() : '';
        second = timeArray[2] ? timeArray[2].toString() : '';

        // idiot proofing
        if (hour.length > 4) {
          second = hour.substr(4, 2);
        }
        if (hour.length > 2) {
          minute = hour.substr(2, 2);
          hour = hour.substr(0, 2);
        }
        if (minute.length > 2) {
          second = minute.substr(2, 2);
          minute = minute.substr(0, 2);
        }
        if (second.length > 2) {
          second = second.substr(2, 2);
        }

        hour = parseInt(hour, 10);
        minute = parseInt(minute, 10);
        second = parseInt(second, 10);

        if (isNaN(hour)) {
          hour = 0;
        }
        if (isNaN(minute)) {
          minute = 0;
        }
        if (isNaN(second)) {
          second = 0;
        }

        if (this.showMeridian) {
          if (hour < 1) {
            hour = 1;
          } else if (hour > 12) {
            hour = 12;
          }
        } else {
          if (hour >= 24) {
            hour = 23;
          } else if (hour < 0) {
            hour = 0;
          }
          if (hour < 13 && meridian === 'PM') {
            hour = hour + 12;
          }
        }

        if (minute < 0) {
          minute = 0;
        } else if (minute >= 60) {
          minute = 59;
        }

        if (this.showSeconds) {
          if (isNaN(second)) {
            second = 0;
          } else if (second < 0) {
            second = 0;
          } else if (second >= 60) {
            second = 59;
          }
        }
      }

      this.hour = hour;
      this.minute = minute;
      this.second = second;
      this.meridian = meridian;

      this.update(ignoreWidget);
    },

    showWidget: function() {
      if (this.isOpen) {
        return;
      }

      if (this.$element.is(':disabled')) {
        return;
      }

      // show/hide approach taken by datepicker
      this.$widget.appendTo(this.appendWidgetTo);
      var self = this;
      $(document).on('mousedown.timepicker, touchend.timepicker', function (e) {
        // This condition was inspired by bootstrap-datepicker.
        // The element the timepicker is invoked on is the input but it has a sibling for addon/button.
        if (!(self.$element.parent().find(e.target).length ||
            self.$widget.is(e.target) ||
            self.$widget.find(e.target).length)) {
          self.hideWidget();
        }
      });

      this.$element.trigger({
        'type': 'show.timepicker',
        'time': {
          'value': this.getTime(),
          'hours': this.hour,
          'minutes': this.minute,
          'seconds': this.second,
          'meridian': this.meridian
        }
      });

      this.place();
      if (this.disableFocus) {
        this.$element.blur();
      }

      // widget shouldn't be empty on open
      if (this.hour === '') {
        if (this.defaultTime) {
          this.setDefaultTime(this.defaultTime);
        } else {
          this.setTime('0:0:0');
        }
      }

      if (this.template === 'modal' && this.$widget.modal) {
        this.$widget.modal('show').on('hidden', $.proxy(this.hideWidget, this));
      } else {
        if (this.isOpen === false) {
          this.$widget.addClass('open');
        }
      }

      this.isOpen = true;
    },

    toggleMeridian: function() {
      this.meridian = this.meridian === 'AM' ? 'PM' : 'AM';
    },

    update: function(ignoreWidget) {
      this.updateElement();
      if (!ignoreWidget) {
        this.updateWidget();
      }

      this.$element.trigger({
        'type': 'changeTime.timepicker',
        'time': {
          'value': this.getTime(),
          'hours': this.hour,
          'minutes': this.minute,
          'seconds': this.second,
          'meridian': this.meridian
        }
      });
    },

    updateElement: function() {
      this.$element.val(this.getTime()).change();
    },

    updateFromElementVal: function() {
      this.setTime(this.$element.val());
    },

    updateWidget: function() {
      if (this.$widget === false) {
        return;
      }

      var hour = this.hour,
          minute = this.minute.toString().length === 1 ? '0' + this.minute : this.minute,
          second = this.second.toString().length === 1 ? '0' + this.second : this.second;

      if (this.showInputs) {
        this.$widget.find('input.bootstrap-timepicker-hour').val(hour);
        this.$widget.find('input.bootstrap-timepicker-minute').val(minute);

        if (this.showSeconds) {
          this.$widget.find('input.bootstrap-timepicker-second').val(second);
        }
        if (this.showMeridian) {
          this.$widget.find('input.bootstrap-timepicker-meridian').val(this.meridian);
        }
      } else {
        this.$widget.find('span.bootstrap-timepicker-hour').text(hour);
        this.$widget.find('span.bootstrap-timepicker-minute').text(minute);

        if (this.showSeconds) {
          this.$widget.find('span.bootstrap-timepicker-second').text(second);
        }
        if (this.showMeridian) {
          this.$widget.find('span.bootstrap-timepicker-meridian').text(this.meridian);
        }
      }
    },

    updateFromWidgetInputs: function() {
      if (this.$widget === false) {
        return;
      }

      var t = this.$widget.find('input.bootstrap-timepicker-hour').val() + ':' +
              this.$widget.find('input.bootstrap-timepicker-minute').val() +
              (this.showSeconds ? ':' + this.$widget.find('input.bootstrap-timepicker-second').val() : '') +
              (this.showMeridian ? this.$widget.find('input.bootstrap-timepicker-meridian').val() : '')
      ;

      this.setTime(t, true);
    },

    widgetClick: function(e) {
      e.stopPropagation();
      e.preventDefault();

      var $input = $(e.target),
          action = $input.closest('a').data('action');

      if (action) {
        this[action]();
      }
      this.update();

      if ($input.is('input')) {
        $input.get(0).setSelectionRange(0,2);
      }
    },

    widgetKeydown: function(e) {
      var $input = $(e.target),
          name = $input.attr('class').replace('bootstrap-timepicker-', '');

      switch (e.keyCode) {
      case 9: //tab
        if ((this.showMeridian && name === 'meridian') || (this.showSeconds && name === 'second') || (!this.showMeridian && !this.showSeconds && name === 'minute')) {
          return this.hideWidget();
        }
        break;
      case 27: // escape
        this.hideWidget();
        break;
      case 38: // up arrow
        e.preventDefault();
        switch (name) {
        case 'hour':
          this.incrementHour();
          break;
        case 'minute':
          this.incrementMinute();
          break;
        case 'second':
          this.incrementSecond();
          break;
        case 'meridian':
          this.toggleMeridian();
          break;
        }
        this.setTime(this.getTime());
        $input.get(0).setSelectionRange(0,2);
        break;
      case 40: // down arrow
        e.preventDefault();
        switch (name) {
        case 'hour':
          this.decrementHour();
          break;
        case 'minute':
          this.decrementMinute();
          break;
        case 'second':
          this.decrementSecond();
          break;
        case 'meridian':
          this.toggleMeridian();
          break;
        }
        this.setTime(this.getTime());
        $input.get(0).setSelectionRange(0,2);
        break;
      }
    },

    widgetKeyup: function(e) {
      if ((e.keyCode === 65) || (e.keyCode === 77) || (e.keyCode === 80) || (e.keyCode === 46) || (e.keyCode === 8) || (e.keyCode >= 46 && e.keyCode <= 57)) {
        this.updateFromWidgetInputs();
      }
    }
  };

  //TIMEPICKER PLUGIN DEFINITION
  $.fn.timepicker = function(option) {
    var args = Array.apply(null, arguments);
    args.shift();
    return this.each(function() {
      var $this = $(this),
        data = $this.data('timepicker'),
        options = typeof option === 'object' && option;

      if (!data) {
        $this.data('timepicker', (data = new Timepicker(this, $.extend({}, $.fn.timepicker.defaults, options, $(this).data()))));
      }

      if (typeof option === 'string') {
        data[option].apply(data, args);
      }
    });
  };

  $.fn.timepicker.defaults = {
    defaultTime: 'current',
    disableFocus: false,
    disableMousewheel: false,
    isOpen: false,
    minuteStep: 15,
    modalBackdrop: false,
    orientation: { x: 'auto', y: 'auto'},
    secondStep: 15,
    showSeconds: false,
    showInputs: true,
    showMeridian: true,
    template: 'dropdown',
    appendWidgetTo: 'body',
    showWidgetOnAddonClick: true
  };

  $.fn.timepicker.Constructor = Timepicker;

})(jQuery, window, document);

/*!
 * Fuel UX v3.6.5
 * Copyright 2012-2015 ExactTarget
 * Licensed under the BSD-3-Clause license (https://github.com/ExactTarget/fuelux/blob/master/LICENSE)
 */


// For more information on UMD visit: https://github.com/umdjs/umd/
( function( factory ) {
	if ( typeof define === 'function' && define.amd ) {
		define( [ 'jquery', 'bootstrap' ], factory );
	} else {
		factory( jQuery );
	}
}( function( jQuery ) {

	if ( typeof jQuery === 'undefined' ) {
		throw new Error( 'Fuel UX\'s JavaScript requires jQuery' )
	}

	if ( typeof jQuery.fn.dropdown === 'undefined' || typeof jQuery.fn.collapse === 'undefined' ) {
		throw new Error( 'Fuel UX\'s JavaScript requires Bootstrap' )
	}

	( function( $ ) {

		/*
		 * Fuel UX Checkbox
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.checkbox;

		// CHECKBOX CONSTRUCTOR AND PROTOTYPE

		var Checkbox = function( element, options ) {
			this.options = $.extend( {}, $.fn.checkbox.defaults, options );

			// cache elements
			this.$element = $( element ).is( 'input[type="checkbox"]' ) ? $( element ) : $( element ).find( 'input[type="checkbox"]:first' );
			this.$label = this.$element.parent();
			this.$parent = this.$label.parent( '.checkbox' );
			this.$toggleContainer = this.$element.attr( 'data-toggle' );
			this.state = {
				disabled: false,
				checked: false
			};

			if ( this.$parent.length === 0 ) {
				this.$parent = null;
			}

			if ( Boolean( this.$toggleContainer ) ) {
				this.$toggleContainer = $( this.$toggleContainer );
			} else {
				this.$toggleContainer = null;
			}

			// handle events
			this.$element.on( 'change.fu.checkbox', $.proxy( this.itemchecked, this ) );
			this.$label.unbind( 'click', $.proxy( this.toggle, this ) ); //unbind previous binds so that double clickage doesn't happen (thus making checkbox appear to not work)
			this.$label.on( 'click', $.proxy( this.toggle, this ) ); //make repeated label clicks work

			// set default state
			this.setState();
		};

		Checkbox.prototype = {

			constructor: Checkbox,

			setState: function( $chk ) {
				$chk = $chk || this.$element;

				this.state.disabled = Boolean( $chk.prop( 'disabled' ) );
				this.state.checked = Boolean( $chk.is( ':checked' ) );

				this._resetClasses();

				// set state of checkbox
				this._toggleCheckedState();
				this._toggleDisabledState();

				//toggle container
				this.toggleContainer();
			},

			enable: function() {
				this.state.disabled = false;
				this.$element.removeAttr( 'disabled' );
				this.$element.prop( 'disabled', false );
				this._resetClasses();
				this.$element.trigger( 'enabled.fu.checkbox' );
			},

			disable: function() {
				this.state.disabled = true;
				this.$element.prop( 'disabled', true );
				this.$element.attr( 'disabled', 'disabled' );
				this._setDisabledClass();
				this.$element.trigger( 'disabled.fu.checkbox' );
			},

			check: function() {
				this.state.checked = true;
				this.$element.prop( 'checked', true );
				this.$element.attr( 'checked', 'checked' );
				this._setCheckedClass();
				this.$element.trigger( 'checked.fu.checkbox' );
			},

			uncheck: function() {
				this.state.checked = false;
				this.$element.prop( 'checked', false );
				this.$element.removeAttr( 'checked' );
				this._resetClasses();
				this.$element.trigger( 'unchecked.fu.checkbox' );
			},

			isChecked: function() {
				return this.state.checked;
			},

			toggle: function( e ) {
				//keep checkbox from being used if it is disabled. You can't rely on this.state.disabled, because on bind time it might not be disabled, but, state.disabled may be set to true after bind time (and this.state.disabled won't be updated for this bound instance)
				//To see how this works, uncomment the next line of code and go to http://0.0.0.0:8000/index.html click the "disable #myCustomCheckbox1" and then click on the first checkbox and see the disparity in the output between this.state and this.$element.attr
				//console.log('is disabled? this.state says, "' + this.state.disabled + '"; this.$element.attr says, "' + this.$element.attr('disabled') + '"');
				if ( /* do not change this to this.state.disabled. It will break edge cases */ this.$element.prop( 'disabled' ) ) {
					return;
				}

				//keep event from firing twice in Chrome
				if ( !e || ( e.target === e.originalEvent.target ) ) {
					this.state.checked = !this.state.checked;

					this._toggleCheckedState();

					if ( Boolean( e ) ) {
						//stop bubbling, otherwise event fires twice in Firefox.
						e.preventDefault();
						//make change event still fire (prevented by preventDefault to avoid firefox bug, see preceeding line)
						this.$element.trigger( 'change', e );
					}

				}
			},

			toggleContainer: function() {
				if ( Boolean( this.$toggleContainer ) ) {
					if ( this.state.checked ) {
						this.$toggleContainer.removeClass( 'hide hidden' );
						this.$toggleContainer.attr( 'aria-hidden', 'false' );
					} else {
						this.$toggleContainer.addClass( 'hidden' );
						this.$toggleContainer.attr( 'aria-hidden', 'true' );
					}

				}
			},

			itemchecked: function( element ) {
				this.setState( $( element.target ) );
			},

			destroy: function() {
				this.$parent.remove();
				// remove any external bindings
				// [none]
				// empty elements to return to original markup
				// [none]
				return this.$parent[ 0 ].outerHTML;
			},

			_resetClasses: function() {
				var classesToRemove = [];

				if ( !this.state.checked ) {
					classesToRemove.push( 'checked' );
				}

				if ( !this.state.disabled ) {
					classesToRemove.push( 'disabled' );
				}

				classesToRemove = classesToRemove.join( ' ' );

				this.$label.removeClass( classesToRemove );

				if ( this.$parent ) {
					this.$parent.removeClass( classesToRemove );
				}
			},

			_toggleCheckedState: function() {
				if ( this.state.checked ) {
					this.check();
				} else {
					this.uncheck();
				}
			},

			_toggleDisabledState: function() {
				if ( this.state.disabled ) {
					this.disable();
				} else {
					this.enable();
				}
			},

			_setCheckedClass: function() {
				this.$label.addClass( 'checked' );

				if ( this.$parent ) {
					this.$parent.addClass( 'checked' );
				}
			},

			_setDisabledClass: function() {
				this.$label.addClass( 'disabled' );

				if ( this.$parent ) {
					this.$parent.addClass( 'disabled' );
				}
			}
		};


		// CHECKBOX PLUGIN DEFINITION

		$.fn.checkbox = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.checkbox' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.checkbox', ( data = new Checkbox( this, options ) ) );
				}

				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.checkbox.defaults = {};

		$.fn.checkbox.Constructor = Checkbox;

		$.fn.checkbox.noConflict = function() {
			$.fn.checkbox = old;
			return this;
		};

		// DATA-API

		$( document ).on( 'mouseover.fu.checkbox.data-api', '[data-initialize=checkbox]', function( e ) {
			var $control = $( e.target ).closest( '.checkbox' ).find( '[type=checkbox]' );
			if ( !$control.data( 'fu.checkbox' ) ) {
				$control.checkbox( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=checkbox] [type=checkbox]' ).each( function() {
				var $this = $( this );
				if ( !$this.data( 'fu.checkbox' ) ) {
					$this.checkbox( $this.data() );
				}
			} );
		} );



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Combobox
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.combobox;


		// COMBOBOX CONSTRUCTOR AND PROTOTYPE

		var Combobox = function( element, options ) {
			this.$element = $( element );
			this.options = $.extend( {}, $.fn.combobox.defaults, options );

			this.$dropMenu = this.$element.find( '.dropdown-menu' );
			this.$input = this.$element.find( 'input' );
			this.$button = this.$element.find( '.btn' );

			this.$element.on( 'click.fu.combobox', 'a', $.proxy( this.itemclicked, this ) );
			this.$element.on( 'change.fu.combobox', 'input', $.proxy( this.inputchanged, this ) );
			this.$element.on( 'shown.bs.dropdown', $.proxy( this.menuShown, this ) );

			// set default selection
			this.setDefaultSelection();
		};

		Combobox.prototype = {

			constructor: Combobox,

			destroy: function() {
				this.$element.remove();
				// remove any external bindings
				// [none]

				// set input value attrbute in markup
				this.$element.find( 'input' ).each( function() {
					$( this ).attr( 'value', $( this ).val() );
				} );

				// empty elements to return to original markup
				// [none]

				return this.$element[ 0 ].outerHTML;
			},

			doSelect: function( $item ) {
				if ( typeof $item[ 0 ] !== 'undefined' ) {
					this.$selectedItem = $item;
					this.$input.val( this.$selectedItem.text().trim() );
				} else {
					this.$selectedItem = null;
				}
			},

			menuShown: function() {
				if ( this.options.autoResizeMenu ) {
					this.resizeMenu();
				}
			},

			resizeMenu: function() {
				var width = this.$element.outerWidth();
				this.$dropMenu.outerWidth( width );
			},

			selectedItem: function() {
				var item = this.$selectedItem;
				var data = {};

				if ( item ) {
					var txt = this.$selectedItem.text().trim();
					data = $.extend( {
						text: txt
					}, this.$selectedItem.data() );
				} else {
					data = {
						text: this.$input.val()
					};
				}

				return data;
			},

			selectByText: function( text ) {
				var $item = $( [] );
				this.$element.find( 'li' ).each( function() {
					if ( ( this.textContent || this.innerText || $( this ).text() || '' ).toLowerCase() === ( text || '' ).toLowerCase() ) {
						$item = $( this );
						return false;
					}
				} );
				this.doSelect( $item );
			},

			selectByValue: function( value ) {
				var selector = 'li[data-value="' + value + '"]';
				this.selectBySelector( selector );
			},

			selectByIndex: function( index ) {
				// zero-based index
				var selector = 'li:eq(' + index + ')';
				this.selectBySelector( selector );
			},

			selectBySelector: function( selector ) {
				var $item = this.$element.find( selector );
				this.doSelect( $item );
			},

			setDefaultSelection: function() {
				var selector = 'li[data-selected=true]:first';
				var item = this.$element.find( selector );

				if ( item.length > 0 ) {
					// select by data-attribute
					this.selectBySelector( selector );
					item.removeData( 'selected' );
					item.removeAttr( 'data-selected' );
				}
			},

			enable: function() {
				this.$element.removeClass( 'disabled' );
				this.$input.removeAttr( 'disabled' );
				this.$button.removeClass( 'disabled' );
			},

			disable: function() {
				this.$element.addClass( 'disabled' );
				this.$input.attr( 'disabled', true );
				this.$button.addClass( 'disabled' );
			},

			itemclicked: function( e ) {
				this.$selectedItem = $( e.target ).parent();

				// set input text and trigger input change event marked as synthetic
				this.$input.val( this.$selectedItem.text().trim() ).trigger( 'change', {
					synthetic: true
				} );

				// pass object including text and any data-attributes
				// to onchange event
				var data = this.selectedItem();

				// trigger changed event
				this.$element.trigger( 'changed.fu.combobox', data );

				e.preventDefault();

				// return focus to control after selecting an option
				this.$element.find( '.dropdown-toggle' ).focus();
			},

			inputchanged: function( e, extra ) {
				// skip processing for internally-generated synthetic event
				// to avoid double processing
				if ( extra && extra.synthetic ) return;
				var val = $( e.target ).val();
				this.selectByText( val );

				// find match based on input
				// if no match, pass the input value
				var data = this.selectedItem();
				if ( data.text.length === 0 ) {
					data = {
						text: val
					};
				}

				// trigger changed event
				this.$element.trigger( 'changed.fu.combobox', data );
			}
		};


		// COMBOBOX PLUGIN DEFINITION

		$.fn.combobox = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.combobox' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.combobox', ( data = new Combobox( this, options ) ) );
				}

				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.combobox.defaults = {
			autoResizeMenu: true
		};

		$.fn.combobox.Constructor = Combobox;

		$.fn.combobox.noConflict = function() {
			$.fn.combobox = old;
			return this;
		};

		// DATA-API

		$( document ).on( 'mousedown.fu.combobox.data-api', '[data-initialize=combobox]', function( e ) {
			var $control = $( e.target ).closest( '.combobox' );
			if ( !$control.data( 'fu.combobox' ) ) {
				$control.combobox( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=combobox]' ).each( function() {
				var $this = $( this );
				if ( !$this.data( 'fu.combobox' ) ) {
					$this.combobox( $this.data() );
				}
			} );
		} );



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Datepicker
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var INVALID_DATE = 'Invalid Date';
		var MOMENT_NOT_AVAILABLE = 'moment.js is not available so you cannot use this function';

		var datepickerStack = [];
		var moment = false;
		var old = $.fn.datepicker;
		var requestedMoment = false;

		var runStack = function() {
			var i, l;
			requestedMoment = true;
			for ( i = 0, l = datepickerStack.length; i < l; i++ ) {
				datepickerStack[ i ].init.call( datepickerStack[ i ].scope );
			}
			datepickerStack = [];
		};

		//only load moment if it's there. otherwise we'll look for it in window.moment
		if ( typeof define === 'function' && define.amd ) { //check if AMD is available
			require( [ 'moment' ], function( amdMoment ) {
				moment = amdMoment;
				runStack();
			}, function( err ) {
				var failedId = err.requireModules && err.requireModules[ 0 ];
				if ( failedId === 'moment' ) {
					runStack();
				}
			} );
		} else {
			runStack();
		}

		// DATEPICKER CONSTRUCTOR AND PROTOTYPE

		var Datepicker = function( element, options ) {
			this.$element = $( element );
			this.options = $.extend( true, {}, $.fn.datepicker.defaults, options );

			this.$calendar = this.$element.find( '.datepicker-calendar' );
			this.$days = this.$calendar.find( '.datepicker-calendar-days' );
			this.$header = this.$calendar.find( '.datepicker-calendar-header' );
			this.$headerTitle = this.$header.find( '.title' );
			this.$input = this.$element.find( 'input' );
			this.$wheels = this.$element.find( '.datepicker-wheels' );
			this.$wheelsMonth = this.$element.find( '.datepicker-wheels-month' );
			this.$wheelsYear = this.$element.find( '.datepicker-wheels-year' );

			this.artificialScrolling = false;
			this.formatDate = this.options.formatDate || this.formatDate;
			this.inputValue = null;
			this.moment = false;
			this.momentFormat = null;
			this.parseDate = this.options.parseDate || this.parseDate;
			this.preventBlurHide = false;
			this.restricted = this.options.restricted || [];
			this.restrictedParsed = [];
			this.restrictedText = this.options.restrictedText;
			this.sameYearOnly = this.options.sameYearOnly;
			this.selectedDate = null;
			this.yearRestriction = null;

			this.$calendar.find( '.datepicker-today' ).on( 'click.fu.datepicker', $.proxy( this.todayClicked, this ) );
			this.$days.on( 'click.fu.datepicker', 'tr td button', $.proxy( this.dateClicked, this ) );
			this.$element.find( '.dropdown-menu' ).on( 'mousedown.fu.datepicker', $.proxy( this.dropdownMousedown, this ) );
			this.$header.find( '.next' ).on( 'click.fu.datepicker', $.proxy( this.next, this ) );
			this.$header.find( '.prev' ).on( 'click.fu.datepicker', $.proxy( this.prev, this ) );
			this.$headerTitle.on( 'click.fu.datepicker', $.proxy( this.titleClicked, this ) );
			this.$input.on( 'blur.fu.datepicker', $.proxy( this.inputBlurred, this ) );
			this.$input.on( 'focus.fu.datepicker', $.proxy( this.inputFocused, this ) );
			this.$wheels.find( '.datepicker-wheels-back' ).on( 'click.fu.datepicker', $.proxy( this.backClicked, this ) );
			this.$wheels.find( '.datepicker-wheels-select' ).on( 'click.fu.datepicker', $.proxy( this.selectClicked, this ) );
			this.$wheelsMonth.on( 'click.fu.datepicker', 'ul button', $.proxy( this.monthClicked, this ) );
			this.$wheelsYear.on( 'click.fu.datepicker', 'ul button', $.proxy( this.yearClicked, this ) );
			this.$wheelsYear.find( 'ul' ).on( 'scroll.fu.datepicker', $.proxy( this.onYearScroll, this ) );

			var init = function() {
				if ( this.checkForMomentJS() ) {
					moment = moment || window.moment; // need to pull in the global moment if they didn't do it via require
					this.moment = true;
					this.momentFormat = this.options.momentConfig.format;
					this.setCulture( this.options.momentConfig.culture );

					// support moment with lang (< v2.8) or locale
					moment.locale = moment.locale || moment.lang;
				}

				this.setRestrictedDates( this.restricted );
				if ( !this.setDate( this.options.date ) ) {
					this.$input.val( '' );
					this.inputValue = this.$input.val();
				}

				if ( this.sameYearOnly ) {
					this.yearRestriction = ( this.selectedDate ) ? this.selectedDate.getFullYear() : new Date().getFullYear();
				}
			};

			if ( requestedMoment ) {
				init.call( this );
			} else {
				datepickerStack.push( {
					init: init,
					scope: this
				} );
			}
		};

		Datepicker.prototype = {

			constructor: Datepicker,

			backClicked: function() {
				this.changeView( 'calendar' );
			},

			changeView: function( view, date ) {
				if ( view === 'wheels' ) {
					this.$calendar.hide().attr( 'aria-hidden', 'true' );
					this.$wheels.show().removeAttr( 'aria-hidden', '' );
					if ( date ) {
						this.renderWheel( date );
					}

				} else {
					this.$wheels.hide().attr( 'aria-hidden', 'true' );
					this.$calendar.show().removeAttr( 'aria-hidden', '' );
					if ( date ) {
						this.renderMonth( date );
					}

				}
			},

			checkForMomentJS: function() {
				if (
					( $.isFunction( window.moment ) || ( typeof moment !== 'undefined' && $.isFunction( moment ) ) ) &&
					$.isPlainObject( this.options.momentConfig ) &&
					this.options.momentConfig.culture && this.options.momentConfig.format
				) {
					return true;
				} else {
					return false;
				}
			},

			dateClicked: function( e ) {
				var $td = $( e.currentTarget ).parents( 'td:first' );
				var date;

				if ( $td.hasClass( 'restricted' ) ) {
					return;
				}

				this.$days.find( 'td.selected' ).removeClass( 'selected' );
				$td.addClass( 'selected' );

				date = new Date( $td.attr( 'data-year' ), $td.attr( 'data-month' ), $td.attr( 'data-date' ) );
				this.selectedDate = date;
				this.$input.val( this.formatDate( date ) );
				this.inputValue = this.$input.val();
				this.$input.focus();
				this.$element.trigger( 'dateClicked.fu.datepicker', date );
			},

			destroy: function() {
				this.$element.remove();
				// any external bindings
				// [none]

				// empty elements to return to original markup
				this.$days.find( 'tbody' ).empty();
				this.$wheelsYear.find( 'ul' ).empty();

				return this.$element[ 0 ].outerHTML;
			},

			disable: function() {
				this.$element.addClass( 'disabled' );
				this.$element.find( 'input, button' ).attr( 'disabled', 'disabled' );
				this.$element.find( '.input-group-btn' ).removeClass( 'open' );
			},

			dropdownMousedown: function() {
				var self = this;
				this.preventBlurHide = true;
				setTimeout( function() {
					self.preventBlurHide = false;
				}, 0 );
			},

			enable: function() {
				this.$element.removeClass( 'disabled' );
				this.$element.find( 'input, button' ).removeAttr( 'disabled' );
			},

			formatDate: function( date ) {
				var padTwo = function( value ) {
					var s = '0' + value;
					return s.substr( s.length - 2 );
				};

				if ( this.moment ) {
					return moment( date ).format( this.momentFormat );
				} else {
					return padTwo( date.getMonth() + 1 ) + '/' + padTwo( date.getDate() ) + '/' + date.getFullYear();
				}
			},

			getCulture: function() {
				if ( this.moment ) {
					return moment.locale();
				} else {
					throw MOMENT_NOT_AVAILABLE;
				}
			},

			getDate: function() {
				return ( !this.selectedDate ) ? new Date( NaN ) : this.selectedDate;
			},

			getFormat: function() {
				if ( this.moment ) {
					return this.momentFormat;
				} else {
					throw MOMENT_NOT_AVAILABLE;
				}
			},

			getFormattedDate: function() {
				return ( !this.selectedDate ) ? INVALID_DATE : this.formatDate( this.selectedDate );
			},

			getRestrictedDates: function() {
				return this.restricted;
			},

			inputBlurred: function( e ) {
				var inputVal = this.$input.val();
				var date;
				if ( inputVal !== this.inputValue ) {
					date = this.setDate( inputVal );
					if ( date === null ) {
						this.$element.trigger( 'inputParsingFailed.fu.datepicker', inputVal );
					} else if ( date === false ) {
						this.$element.trigger( 'inputRestrictedDate.fu.datepicker', date );
					} else {
						this.$element.trigger( 'changed.fu.datepicker', date );
					}

				}

				if ( !this.preventBlurHide ) {
					this.$element.find( '.input-group-btn' ).removeClass( 'open' );
				}
			},

			inputFocused: function( e ) {
				this.$element.find( '.input-group-btn' ).addClass( 'open' );
			},

			isInvalidDate: function( date ) {
				var dateString = date.toString();
				if ( dateString === INVALID_DATE || dateString === 'NaN' ) {
					return true;
				}

				return false;
			},

			isRestricted: function( date, month, year ) {
				var restricted = this.restrictedParsed;
				var i, from, l, to;

				if ( this.sameYearOnly && this.yearRestriction !== null && year !== this.yearRestriction ) {
					return true;
				}

				for ( i = 0, l = restricted.length; i < l; i++ ) {
					from = restricted[ i ].from;
					to = restricted[ i ].to;
					if (
						( year > from.year || ( year === from.year && month > from.month ) || ( year === from.year && month === from.month && date >= from.date ) ) &&
						( year < to.year || ( year === to.year && month < to.month ) || ( year === to.year && month === to.month && date <= to.date ) )
					) {
						return true;
					}

				}

				return false;
			},

			monthClicked: function( e ) {
				this.$wheelsMonth.find( '.selected' ).removeClass( 'selected' );
				$( e.currentTarget ).parent().addClass( 'selected' );
			},

			next: function() {
				var month = this.$headerTitle.attr( 'data-month' );
				var year = this.$headerTitle.attr( 'data-year' );
				month++;
				if ( month > 11 ) {
					if ( this.sameYearOnly ) {
						return;
					}

					month = 0;
					year++;
				}

				this.renderMonth( new Date( year, month, 1 ) );
			},

			onYearScroll: function( e ) {
				if ( this.artificialScrolling ) {
					return;
				}

				var $yearUl = $( e.currentTarget );
				var height = ( $yearUl.css( 'box-sizing' ) === 'border-box' ) ? $yearUl.outerHeight() : $yearUl.height();
				var scrollHeight = $yearUl.get( 0 ).scrollHeight;
				var scrollTop = $yearUl.scrollTop();
				var bottomPercentage = ( height / ( scrollHeight - scrollTop ) ) * 100;
				var topPercentage = ( scrollTop / scrollHeight ) * 100;
				var i, start;

				if ( topPercentage < 5 ) {
					start = parseInt( $yearUl.find( 'li:first' ).attr( 'data-year' ), 10 );
					for ( i = ( start - 1 ); i > ( start - 11 ); i-- ) {
						$yearUl.prepend( '<li data-year="' + i + '"><button type="button">' + i + '</button></li>' );
					}
					this.artificialScrolling = true;
					$yearUl.scrollTop( ( $yearUl.get( 0 ).scrollHeight - scrollHeight ) + scrollTop );
					this.artificialScrolling = false;
				} else if ( bottomPercentage > 90 ) {
					start = parseInt( $yearUl.find( 'li:last' ).attr( 'data-year' ), 10 );
					for ( i = ( start + 1 ); i < ( start + 11 ); i++ ) {
						$yearUl.append( '<li data-year="' + i + '"><button type="button">' + i + '</button></li>' );
					}
				}
			},

			//some code ripped from http://stackoverflow.com/questions/2182246/javascript-dates-in-ie-nan-firefox-chrome-ok
			parseDate: function( date ) {
				var self = this;
				var BAD_DATE = new Date( NaN );
				var dt, isoExp, momentParse, momentParseWithFormat, tryMomentParseAll, month, parts, use;

				if ( date ) {
					if ( this.moment ) { //if we have moment, use that to parse the dates
						momentParseWithFormat = function( d ) {
							var md = moment( d, self.momentFormat );
							return ( true === md.isValid() ) ? md.toDate() : BAD_DATE;
						};
						momentParse = function( d ) {
							var md = moment( new Date( d ) );
							return ( true === md.isValid() ) ? md.toDate() : BAD_DATE;
						};

						tryMomentParseAll = function( d, parseFunc1, parseFunc2 ) {
							var pd = parseFunc1( d );
							if ( !self.isInvalidDate( pd ) ) {
								return pd;
							}

							pd = parseFunc2( pd );
							if ( !self.isInvalidDate( pd ) ) {
								return pd;
							}

							return BAD_DATE;
						};

						if ( 'string' === typeof( date ) ) {
							// Attempts to parse date strings using this.momentFormat, falling back on newing a date
							return tryMomentParseAll( date, momentParseWithFormat, momentParse );
						} else {
							// Attempts to parse date by newing a date object directly, falling back on parsing using this.momentFormat
							return tryMomentParseAll( date, momentParse, momentParseWithFormat );
						}

					} else { //if moment isn't present, use previous date parsing strategy
						if ( typeof( date ) === 'string' ) {
							dt = new Date( Date.parse( date ) );
							if ( !this.isInvalidDate( dt ) ) {
								return dt;
							} else {
								date = date.split( 'T' )[ 0 ];
								isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/;
								parts = isoExp.exec( date );
								if ( parts ) {
									month = parseInt( parts[ 2 ], 10 );
									dt = new Date( parts[ 1 ], month - 1, parts[ 3 ] );
									if ( month === ( dt.getMonth() + 1 ) ) {
										return dt;
									}

								}

							}

						} else {
							dt = new Date( date );
							if ( !this.isInvalidDate( dt ) ) {
								return dt;
							}

						}

					}

				}

				return new Date( NaN );
			},

			prev: function() {
				var month = this.$headerTitle.attr( 'data-month' );
				var year = this.$headerTitle.attr( 'data-year' );
				month--;
				if ( month < 0 ) {
					if ( this.sameYearOnly ) {
						return;
					}

					month = 11;
					year--;
				}

				this.renderMonth( new Date( year, month, 1 ) );
			},

			renderMonth: function( date ) {
				date = date || new Date();

				var firstDay = new Date( date.getFullYear(), date.getMonth(), 1 ).getDay();
				var lastDate = new Date( date.getFullYear(), date.getMonth() + 1, 0 ).getDate();
				var lastMonthDate = new Date( date.getFullYear(), date.getMonth(), 0 ).getDate();
				var $month = this.$headerTitle.find( '.month' );
				var month = date.getMonth();
				var now = new Date();
				var nowDate = now.getDate();
				var nowMonth = now.getMonth();
				var nowYear = now.getFullYear();
				var selected = this.selectedDate;
				var $tbody = this.$days.find( 'tbody' );
				var year = date.getFullYear();
				var curDate, curMonth, curYear, i, j, rows, stage, previousStage, lastStage, $td, $tr;

				if ( selected ) {
					selected = {
						date: selected.getDate(),
						month: selected.getMonth(),
						year: selected.getFullYear()
					};
				}

				$month.find( '.current' ).removeClass( 'current' );
				$month.find( 'span[data-month="' + month + '"]' ).addClass( 'current' );
				this.$headerTitle.find( '.year' ).text( year );
				this.$headerTitle.attr( {
					'data-month': month,
					'data-year': year
				} );


				$tbody.empty();
				if ( firstDay !== 0 ) {
					curDate = lastMonthDate - firstDay + 1;
					stage = -1;
				} else {
					curDate = 1;
					stage = 0;
				}

				rows = ( lastDate <= ( 35 - firstDay ) ) ? 5 : 6;
				for ( i = 0; i < rows; i++ ) {
					$tr = $( '<tr></tr>' );
					for ( j = 0; j < 7; j++ ) {
						$td = $( '<td></td>' );
						if ( stage === -1 ) {
							$td.addClass( 'last-month' );
							if ( previousStage !== stage ) {
								$td.addClass( 'first' );
							}
						} else if ( stage === 1 ) {
							$td.addClass( 'next-month' );
							if ( previousStage !== stage ) {
								$td.addClass( 'first' );
							}
						}

						curMonth = month + stage;
						curYear = year;
						if ( curMonth < 0 ) {
							curMonth = 11;
							curYear--;
						} else if ( curMonth > 11 ) {
							curMonth = 0;
							curYear++;
						}

						$td.attr( {
							'data-date': curDate,
							'data-month': curMonth,
							'data-year': curYear
						} );
						if ( curYear === nowYear && curMonth === nowMonth && curDate === nowDate ) {
							$td.addClass( 'current-day' );
						} else if ( curYear < nowYear || ( curYear === nowYear && curMonth < nowMonth ) ||
							( curYear === nowYear && curMonth === nowMonth && curDate < nowDate ) ) {
							$td.addClass( 'past' );
							if ( !this.options.allowPastDates ) {
								$td.addClass( 'restricted' ).attr( 'title', this.restrictedText );
							}

						}

						if ( this.isRestricted( curDate, curMonth, curYear ) ) {
							$td.addClass( 'restricted' ).attr( 'title', this.restrictedText );
						}

						if ( selected && curYear === selected.year && curMonth === selected.month && curDate === selected.date ) {
							$td.addClass( 'selected' );
						}

						if ( $td.hasClass( 'restricted' ) ) {
							$td.html( '<span><b class="datepicker-date">' + curDate + '</b></span>' );
						} else {
							$td.html( '<span><button type="button" class="datepicker-date">' + curDate + '</button></span>' );
						}

						curDate++;
						lastStage = previousStage;
						previousStage = stage;
						if ( stage === -1 && curDate > lastMonthDate ) {
							curDate = 1;
							stage = 0;
							if ( lastStage !== stage ) {
								$td.addClass( 'last' );
							}
						} else if ( stage === 0 && curDate > lastDate ) {
							curDate = 1;
							stage = 1;
							if ( lastStage !== stage ) {
								$td.addClass( 'last' );
							}
						}
						if ( i === ( rows - 1 ) && j === 6 ) {
							$td.addClass( 'last' );
						}

						$tr.append( $td );
					}
					$tbody.append( $tr );
				}
			},

			renderWheel: function( date ) {
				var month = date.getMonth();
				var $monthUl = this.$wheelsMonth.find( 'ul' );
				var year = date.getFullYear();
				var $yearUl = this.$wheelsYear.find( 'ul' );
				var i, $monthSelected, $yearSelected;

				if ( this.sameYearOnly ) {
					this.$wheelsMonth.addClass( 'full' );
					this.$wheelsYear.addClass( 'hidden' );
				} else {
					this.$wheelsMonth.removeClass( 'full' );
					this.$wheelsYear.removeClass( 'hide hidden' ); // .hide is deprecated
				}

				$monthUl.find( '.selected' ).removeClass( 'selected' );
				$monthSelected = $monthUl.find( 'li[data-month="' + month + '"]' );
				$monthSelected.addClass( 'selected' );
				$monthUl.scrollTop( $monthUl.scrollTop() + ( $monthSelected.position().top - $monthUl.outerHeight() / 2 - $monthSelected.outerHeight( true ) / 2 ) );

				$yearUl.empty();
				for ( i = ( year - 10 ); i < ( year + 11 ); i++ ) {
					$yearUl.append( '<li data-year="' + i + '"><button type="button">' + i + '</button></li>' );
				}
				$yearSelected = $yearUl.find( 'li[data-year="' + year + '"]' );
				$yearSelected.addClass( 'selected' );
				this.artificialScrolling = true;
				$yearUl.scrollTop( $yearUl.scrollTop() + ( $yearSelected.position().top - $yearUl.outerHeight() / 2 - $yearSelected.outerHeight( true ) / 2 ) );
				this.artificialScrolling = false;
				$monthSelected.find( 'button' ).focus();
			},

			selectClicked: function() {
				var month = this.$wheelsMonth.find( '.selected' ).attr( 'data-month' );
				var year = this.$wheelsYear.find( '.selected' ).attr( 'data-year' );
				this.changeView( 'calendar', new Date( year, month, 1 ) );
			},

			setCulture: function( cultureCode ) {
				if ( !cultureCode ) {
					return false;
				}

				if ( this.moment ) {
					moment.locale( cultureCode );
				} else {
					throw MOMENT_NOT_AVAILABLE;
				}
			},

			setDate: function( date ) {
				var parsed = this.parseDate( date );
				if ( !this.isInvalidDate( parsed ) ) {
					if ( !this.isRestricted( parsed.getDate(), parsed.getMonth(), parsed.getFullYear() ) ) {
						this.selectedDate = parsed;
						this.renderMonth( parsed );
						this.$input.val( this.formatDate( parsed ) );
					} else {
						this.selectedDate = false;
						this.renderMonth();
					}

				} else {
					this.selectedDate = null;
					this.renderMonth();
				}

				this.inputValue = this.$input.val();
				return this.selectedDate;
			},

			setFormat: function( format ) {
				if ( !format ) {
					return false;
				}

				if ( this.moment ) {
					this.momentFormat = format;
				} else {
					throw MOMENT_NOT_AVAILABLE;
				}
			},

			setRestrictedDates: function( restricted ) {
				var parsed = [];
				var self = this;
				var i, l;

				var parseItem = function( val ) {
					if ( val === -Infinity ) {
						return {
							date: -Infinity,
							month: -Infinity,
							year: -Infinity
						};
					} else if ( val === Infinity ) {
						return {
							date: Infinity,
							month: Infinity,
							year: Infinity
						};
					} else {
						val = self.parseDate( val );
						return {
							date: val.getDate(),
							month: val.getMonth(),
							year: val.getFullYear()
						};
					}
				};

				this.restricted = restricted;
				for ( i = 0, l = restricted.length; i < l; i++ ) {
					parsed.push( {
						from: parseItem( restricted[ i ].from ),
						to: parseItem( restricted[ i ].to )
					} );
				}
				this.restrictedParsed = parsed;
			},

			titleClicked: function( e ) {
				this.changeView( 'wheels', new Date( this.$headerTitle.attr( 'data-year' ), this.$headerTitle.attr( 'data-month' ), 1 ) );
			},

			todayClicked: function( e ) {
				var date = new Date();

				if ( ( date.getMonth() + '' ) !== this.$headerTitle.attr( 'data-month' ) || ( date.getFullYear() + '' ) !== this.$headerTitle.attr( 'data-year' ) ) {
					this.renderMonth( date );
				}
			},

			yearClicked: function( e ) {
				this.$wheelsYear.find( '.selected' ).removeClass( 'selected' );
				$( e.currentTarget ).parent().addClass( 'selected' );
			}
		};


		// DATEPICKER PLUGIN DEFINITION

		$.fn.datepicker = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.datepicker' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.datepicker', ( data = new Datepicker( this, options ) ) );
				}

				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.datepicker.defaults = {
			allowPastDates: false,
			date: new Date(),
			formatDate: null,
			momentConfig: {
				culture: 'en',
				format: 'L' // more formats can be found here http://momentjs.com/docs/#/customization/long-date-formats/.
			},
			parseDate: null,
			restricted: [], //accepts an array of objects formatted as so: { from: {{date}}, to: {{date}} }  (ex: [ { from: new Date('12/11/2014'), to: new Date('03/31/2015') } ])
			restrictedText: 'Restricted',
			sameYearOnly: false
		};

		$.fn.datepicker.Constructor = Datepicker;

		$.fn.datepicker.noConflict = function() {
			$.fn.datepicker = old;
			return this;
		};

		// DATA-API

		$( document ).on( 'mousedown.fu.datepicker.data-api', '[data-initialize=datepicker]', function( e ) {
			var $control = $( e.target ).closest( '.datepicker' );
			if ( !$control.data( 'datepicker' ) ) {
				$control.datepicker( $control.data() );
			}
		} );

		//used to prevent the dropdown from closing when clicking within it's bounds
		$( document ).on( 'click.fu.datepicker.data-api', '.datepicker .dropdown-menu', function( e ) {
			var $target = $( e.target );
			if ( !$target.is( '.datepicker-date' ) || $target.closest( '.restricted' ).length ) {
				e.stopPropagation();
			}
		} );

		//used to prevent the dropdown from closing when clicking on the input
		$( document ).on( 'click.fu.datepicker.data-api', '.datepicker input', function( e ) {
			e.stopPropagation();
		} );

		$( function() {
			$( '[data-initialize=datepicker]' ).each( function() {
				var $this = $( this );
				if ( $this.data( 'datepicker' ) ) {
					return;
				}

				$this.datepicker( $this.data() );
			} );
		} );



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Dropdown Auto Flip
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		$( document.body ).on( 'click.fu.dropdown-autoflip', '[data-toggle=dropdown][data-flip]', function( event ) {
			if ( $( this ).data().flip === "auto" ) {
				// have the drop down decide where to place itself
				_autoFlip( $( this ).next( '.dropdown-menu' ) );
			}
		} );

		// For pillbox suggestions dropdown
		$( document.body ).on( 'suggested.fu.pillbox', function( event, element ) {
			_autoFlip( $( element ) );
			$( element ).parent().addClass( 'open' );
		} );

		function _autoFlip( menu ) {
			// hide while the browser thinks
			$( menu ).css( {
				visibility: "hidden"
			} );

			// decide where to put menu
			if ( dropUpCheck( menu ) ) {
				menu.parent().addClass( "dropup" );
			} else {
				menu.parent().removeClass( "dropup" );
			}

			// show again
			$( menu ).css( {
				visibility: "visible"
			} );
		}

		function dropUpCheck( element ) {
			// caching container
			var $container = _getContainer( element );

			// building object with measurementsances for later use
			var measurements = {};
			measurements.parentHeight = element.parent().outerHeight();
			measurements.parentOffsetTop = element.parent().offset().top;
			measurements.dropdownHeight = element.outerHeight();
			measurements.containerHeight = $container.overflowElement.outerHeight();

			// this needs to be different if the window is the container or another element is
			measurements.containerOffsetTop = ( !!$container.isWindow ) ? $container.overflowElement.scrollTop() : $container.overflowElement.offset().top;

			// doing the calculations
			measurements.fromTop = measurements.parentOffsetTop - measurements.containerOffsetTop;
			measurements.fromBottom = measurements.containerHeight - measurements.parentHeight - ( measurements.parentOffsetTop - measurements.containerOffsetTop );

			// actual determination of where to put menu
			// false = drop down
			// true = drop up
			if ( measurements.dropdownHeight < measurements.fromBottom ) {
				return false;
			} else if ( measurements.dropdownHeight < measurements.fromTop ) {
				return true;
			} else if ( measurements.dropdownHeight >= measurements.fromTop && measurements.dropdownHeight >= measurements.fromBottom ) {
				// decide which one is bigger and put it there
				if ( measurements.fromTop >= measurements.fromBottom ) {
					return true;
				} else {
					return false;
				}

			}

		}

		function _getContainer( element ) {
			var containerElement, isWindow;
			if ( element.attr( 'data-target' ) ) {
				containerElement = element.attr( 'data-target' );
				isWindow = false;
			} else {
				containerElement = window;
				isWindow = true;
			}

			$.each( element.parents(), function( index, value ) {
				if ( $( value ).css( 'overflow' ) !== 'visible' ) {
					containerElement = value;
					isWindow = false;
					return false;
				}
			} );

			return {
				overflowElement: $( containerElement ),
				isWindow: isWindow
			};
		}

		// register empty plugin
		$.fn.dropdownautoflip = function() {
			/* empty */
		};



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Loader
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.loader;

		// LOADER CONSTRUCTOR AND PROTOTYPE

		var Loader = function( element, options ) {
			this.$element = $( element );
			this.options = $.extend( {}, $.fn.loader.defaults, options );

			this.begin = ( this.$element.is( '[data-begin]' ) ) ? parseInt( this.$element.attr( 'data-begin' ), 10 ) : 1;
			this.delay = ( this.$element.is( '[data-delay]' ) ) ? parseFloat( this.$element.attr( 'data-delay' ) ) : 150;
			this.end = ( this.$element.is( '[data-end]' ) ) ? parseInt( this.$element.attr( 'data-end' ), 10 ) : 8;
			this.frame = ( this.$element.is( '[data-frame]' ) ) ? parseInt( this.$element.attr( 'data-frame' ), 10 ) : this.begin;
			this.isIElt9 = false;
			this.timeout = {};

			var ieVer = this.msieVersion();
			if ( ieVer !== false && ieVer < 9 ) {
				this.$element.addClass( 'iefix' );
				this.isIElt9 = true;
			}

			this.$element.attr( 'data-frame', this.frame + '' );
			this.play();
		};

		Loader.prototype = {

			constructor: Loader,

			destroy: function() {
				this.$element.remove();
				// any external bindings
				// [none]
				// empty elements to return to original markup
				// [none]
				// returns string of markup
				return this.$element[ 0 ].outerHTML;
			},

			ieRepaint: function() {
				if ( this.isIElt9 ) {
					this.$element.addClass( 'iefix_repaint' ).removeClass( 'iefix_repaint' );
				}
			},

			msieVersion: function() {
				var ua = window.navigator.userAgent;
				var msie = ua.indexOf( 'MSIE ' );
				if ( msie > 0 ) {
					return parseInt( ua.substring( msie + 5, ua.indexOf( ".", msie ) ), 10 );
				} else {
					return false;
				}
			},

			next: function() {
				this.frame++;
				if ( this.frame > this.end ) {
					this.frame = this.begin;
				}

				this.$element.attr( 'data-frame', this.frame + '' );
				this.ieRepaint();
			},

			pause: function() {
				clearTimeout( this.timeout );
			},

			play: function() {
				var self = this;
				clearTimeout( this.timeout );
				this.timeout = setTimeout( function() {
					self.next();
					self.play();
				}, this.delay );
			},

			previous: function() {
				this.frame--;
				if ( this.frame < this.begin ) {
					this.frame = this.end;
				}

				this.$element.attr( 'data-frame', this.frame + '' );
				this.ieRepaint();
			},

			reset: function() {
				this.frame = this.begin;
				this.$element.attr( 'data-frame', this.frame + '' );
				this.ieRepaint();
			}
		};

		// LOADER PLUGIN DEFINITION

		$.fn.loader = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.loader' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.loader', ( data = new Loader( this, options ) ) );
				}

				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.loader.defaults = {};

		$.fn.loader.Constructor = Loader;

		$.fn.loader.noConflict = function() {
			$.fn.loader = old;
			return this;
		};

		// INIT LOADER ON DOMCONTENTLOADED

		$( function() {
			$( '[data-initialize=loader]' ).each( function() {
				var $this = $( this );
				if ( !$this.data( 'fu.loader' ) ) {
					$this.loader( $this.data() );
				}
			} );
		} );



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Placard
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.placard;

		// PLACARD CONSTRUCTOR AND PROTOTYPE

		var Placard = function( element, options ) {
			var self = this;
			this.$element = $( element );
			this.options = $.extend( {}, $.fn.placard.defaults, options );

			this.$accept = this.$element.find( '.placard-accept' );
			this.$cancel = this.$element.find( '.placard-cancel' );
			this.$field = this.$element.find( '.placard-field' );
			this.$footer = this.$element.find( '.placard-footer' );
			this.$header = this.$element.find( '.placard-header' );
			this.$popup = this.$element.find( '.placard-popup' );

			this.actualValue = null;
			this.clickStamp = '_';
			this.previousValue = '';
			if ( this.options.revertOnCancel === -1 ) {
				this.options.revertOnCancel = ( this.$accept.length > 0 ) ? true : false;
			}

			this.isInput = this.$field.is( 'input' );

			this.$field.on( 'focus.fu.placard', $.proxy( this.show, this ) );
			this.$field.on( 'keydown.fu.placard', $.proxy( this.keyComplete, this ) );
			this.$accept.on( 'click.fu.placard', $.proxy( this.complete, this, 'accept' ) );
			this.$cancel.on( 'click.fu.placard', function( e ) {
				e.preventDefault();
				self.complete( 'cancel' );
			} );

			this.ellipsis();
		};

		Placard.prototype = {
			constructor: Placard,

			complete: function( action ) {
				var func = this.options[ 'on' + action[ 0 ].toUpperCase() + action.substring( 1 ) ];
				var obj = {
					previousValue: this.previousValue,
					value: this.$field.val()
				};
				if ( func ) {
					func( obj );
					this.$element.trigger( action, obj );
				} else {
					if ( action === 'cancel' && this.options.revertOnCancel ) {
						this.$field.val( this.previousValue );
					}

					this.$element.trigger( action, obj );
					this.hide();
				}
			},

			keyComplete: function( e ) {
				if ( this.isInput && e.keyCode === 13 ) {
					this.complete( 'accept' );
					this.$field.blur();
				} else if ( e.keyCode === 27 ) {
					this.complete( 'cancel' );
					this.$field.blur();
				}
			},

			destroy: function() {
				this.$element.remove();
				// remove any external bindings
				$( document ).off( 'click.fu.placard.externalClick.' + this.clickStamp );
				// set input value attrbute
				this.$element.find( 'input' ).each( function() {
					$( this ).attr( 'value', $( this ).val() );
				} );
				// empty elements to return to original markup
				// [none]
				// return string of markup
				return this.$element[ 0 ].outerHTML;
			},

			disable: function() {
				this.$element.addClass( 'disabled' );
				this.$field.attr( 'disabled', 'disabled' );
				this.hide();
			},

			ellipsis: function() {
				var field, i, str;
				if ( this.$element.attr( 'data-ellipsis' ) === 'true' ) {
					field = this.$field.get( 0 );
					if ( this.$field.is( 'input' ) ) {
						field.scrollLeft = 0;
					} else {
						field.scrollTop = 0;
						if ( field.clientHeight < field.scrollHeight ) {
							this.actualValue = this.$field.val();
							this.$field.val( '' );
							str = '';
							i = 0;
							while ( field.clientHeight >= field.scrollHeight ) {
								str += this.actualValue[ i ];
								this.$field.val( str + '...' );
								i++;
							}
							str = ( str.length > 0 ) ? str.substring( 0, str.length - 1 ) : '';
							this.$field.val( str + '...' );
						}

					}

				}
			},

			enable: function() {
				this.$element.removeClass( 'disabled' );
				this.$field.removeAttr( 'disabled' );
			},

			externalClickListener: function( e, force ) {
				if ( force === true || this.isExternalClick( e ) ) {
					this.complete( this.options.externalClickAction );
				}
			},

			getValue: function() {
				if ( this.actualValue !== null ) {
					return this.actualValue;
				} else {
					return this.$field.val();
				}
			},

			hide: function() {
				if ( !this.$element.hasClass( 'showing' ) ) {
					return;
				}

				this.$element.removeClass( 'showing' );
				this.ellipsis();
				$( document ).off( 'click.fu.placard.externalClick.' + this.clickStamp );
				this.$element.trigger( 'hidden.fu.placard' );
			},

			isExternalClick: function( e ) {
				var el = this.$element.get( 0 );
				var exceptions = this.options.externalClickExceptions || [];
				var $originEl = $( e.target );
				var i, l;

				if ( e.target === el || $originEl.parents( '.placard:first' ).get( 0 ) === el ) {
					return false;
				} else {
					for ( i = 0, l = exceptions.length; i < l; i++ ) {
						if ( $originEl.is( exceptions[ i ] ) || $originEl.parents( exceptions[ i ] ).length > 0 ) {
							return false;
						}

					}
				}

				return true;
			},

			setValue: function( val ) {
				this.$field.val( val );
				if ( !this.$element.hasClass( 'showing' ) ) {
					this.ellipsis();
				}
			},

			show: function() {
				var other;

				if ( this.$element.hasClass( 'showing' ) ) {
					return;
				}

				other = $( document ).find( '.placard.showing' );
				if ( other.length > 0 ) {
					if ( other.data( 'fu.placard' ) && other.data( 'fu.placard' ).options.explicit ) {
						return;
					}

					other.placard( 'externalClickListener', {}, true );
				}

				this.previousValue = this.$field.val();

				this.$element.addClass( 'showing' );
				if ( this.actualValue !== null ) {
					this.$field.val( this.actualValue );
					this.actualValue = null;
				}

				if ( this.$header.length > 0 ) {
					this.$popup.css( 'top', '-' + this.$header.outerHeight( true ) + 'px' );
				}

				if ( this.$footer.length > 0 ) {
					this.$popup.css( 'bottom', '-' + this.$footer.outerHeight( true ) + 'px' );
				}

				this.$element.trigger( 'shown.fu.placard' );
				this.clickStamp = new Date().getTime() + ( Math.floor( Math.random() * 100 ) + 1 );
				if ( !this.options.explicit ) {
					$( document ).on( 'click.fu.placard.externalClick.' + this.clickStamp, $.proxy( this.externalClickListener, this ) );
				}
			}
		};

		// PLACARD PLUGIN DEFINITION

		$.fn.placard = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.placard' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.placard', ( data = new Placard( this, options ) ) );
				}

				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.placard.defaults = {
			onAccept: undefined,
			onCancel: undefined,
			externalClickAction: 'cancel',
			externalClickExceptions: [],
			explicit: false,
			revertOnCancel: -1 //negative 1 will check for an '.placard-accept' button. Also can be set to true or false
		};

		$.fn.placard.Constructor = Placard;

		$.fn.placard.noConflict = function() {
			$.fn.placard = old;
			return this;
		};

		// DATA-API

		$( document ).on( 'focus.fu.placard.data-api', '[data-initialize=placard]', function( e ) {
			var $control = $( e.target ).closest( '.placard' );
			if ( !$control.data( 'fu.placard' ) ) {
				$control.placard( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=placard]' ).each( function() {
				var $this = $( this );
				if ( $this.data( 'fu.placard' ) ) return;
				$this.placard( $this.data() );
			} );
		} );



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Radio
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.radio;

		// RADIO CONSTRUCTOR AND PROTOTYPE

		var Radio = function( element, options ) {
			this.options = $.extend( {}, $.fn.radio.defaults, options );

			// cache elements
			this.$radio = $( element ).is( 'input[type="radio"]' ) ? $( element ) : $( element ).find( 'input[type="radio"]:first' );
			this.$label = this.$radio.parent();
			this.groupName = this.$radio.attr( 'name' );
			this.$blockWrapper = this.$label.parent( '.radio' ); // only used if block radio control, otherwise radio is inline
			this.isBlockWrapped = true; // initialized as a block radio control
			this.$toggleContainer = null;

			if ( this.$blockWrapper.length === 0 ) {
				this.isBlockWrapped = false;
			}

			var toggleSelector = this.$radio.attr( 'data-toggle' );
			if ( toggleSelector ) {
				this.$toggleContainer = $( toggleSelector );
			}

			// set default state
			this.setState( this.$radio );

			// handle events
			this.$radio.on( 'change.fu.radio', $.proxy( this.itemchecked, this ) );
		};

		Radio.prototype = {

			constructor: Radio,

			destroy: function() {
				// remove any external bindings
				// [none]
				// empty elements to return to original markup
				// [none]
				// return string of markup
				if ( this.isBlockWrapped ) {
					this.$blockWrapper.remove();
					return this.$blockWrapper[ 0 ].outerHTML;
				} else {
					this.$label.remove();
					return this.$label[ 0 ].outerHTML;
				}

			},

			setState: function( $radio ) {
				$radio = $radio || this.$radio;

				var checked = $radio.is( ':checked' );
				var disabled = !!$radio.prop( 'disabled' );

				this.$label.removeClass( 'checked' );
				if ( this.isBlockWrapped ) {
					this.$blockWrapper.removeClass( 'checked disabled' );
				}

				// set state of radio
				if ( checked === true ) {
					this.$label.addClass( 'checked' );
					if ( this.isBlockWrapped ) {
						this.$blockWrapper.addClass( 'checked' );
					}

				}

				if ( disabled === true ) {
					this.$label.addClass( 'disabled' );
					if ( this.isBlockWrapped ) {
						this.$blockWrapper.addClass( 'disabled' );
					}

				}

				//toggle container
				this.toggleContainer();
			},

			resetGroup: function() {
				var group = $( 'input[name="' + this.groupName + '"]' );

				group.each( function() {
					var lbl = $( this ).parent( 'label' );
					lbl.removeClass( 'checked' );
					lbl.parent( '.radio' ).removeClass( 'checked' );
				} );
			},

			enable: function() {
				this.$radio.attr( 'disabled', false );
				this.$label.removeClass( 'disabled' );
				if ( this.isBlockWrapped ) {
					this.$blockWrapper.removeClass( 'disabled' );
				}
			},

			disable: function() {
				this.$radio.attr( 'disabled', true );
				this.$label.addClass( 'disabled' );
				if ( this.isBlockWrapped ) {
					this.$blockWrapper.addClass( 'disabled' );
				}
			},

			itemchecked: function( e ) {
				var radio = $( e.target );

				this.resetGroup();
				this.setState( radio );
			},

			check: function() {
				this.resetGroup();
				this.$radio.prop( 'checked', true );
				this.$radio.attr( 'checked', 'checked' );
				this.setState( this.$radio );
			},

			toggleContainer: function() {
				var group;
				if ( this.$toggleContainer ) {
					// show corresponding container for currently selected radio
					if ( this.isChecked() ) {
						// hide containers for each item in group
						group = $( 'input[name="' + this.groupName + '"]' );
						group.each( function() {
							var selector = $( this ).attr( 'data-toggle' );
							$( selector ).addClass( 'hidden' );
							$( selector ).attr( 'aria-hidden', 'true' );
						} );
						this.$toggleContainer.removeClass( 'hide hidden' ); // hide is deprecated
						this.$toggleContainer.attr( 'aria-hidden', 'false' );
					} else {
						this.$toggleContainer.addClass( 'hidden' );
						this.$toggleContainer.attr( 'aria-hidden', 'true' );
					}

				}
			},

			uncheck: function() {
				this.$radio.prop( 'checked', false );
				this.$radio.removeAttr( 'checked' );
				this.setState( this.$radio );
			},

			isChecked: function() {
				return this.$radio.is( ':checked' );
			}
		};


		// RADIO PLUGIN DEFINITION

		$.fn.radio = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.radio' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.radio', ( data = new Radio( this, options ) ) );
				}

				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.radio.defaults = {};

		$.fn.radio.Constructor = Radio;

		$.fn.radio.noConflict = function() {
			$.fn.radio = old;
			return this;
		};


		// DATA-API

		$( document ).on( 'mouseover.fu.checkbox.data-api', '[data-initialize=radio]', function( e ) {
			var $control = $( e.target ).closest( '.radio' ).find( '[type=radio]' );
			if ( !$control.data( 'fu.radio' ) ) {
				$control.radio( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=radio] [type=radio]' ).each( function() {
				var $this = $( this );
				if ( $this.data( 'fu.radio' ) ) return;
				$this.radio( $this.data() );
			} );
		} );



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Search
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.search;

		// SEARCH CONSTRUCTOR AND PROTOTYPE

		var Search = function( element, options ) {
			this.$element = $( element );
			this.options = $.extend( {}, $.fn.search.defaults, options );

			this.$button = this.$element.find( 'button' );
			this.$input = this.$element.find( 'input' );
			this.$icon = this.$element.find( '.glyphicon' );

			this.$button.on( 'click.fu.search', $.proxy( this.buttonclicked, this ) );
			this.$input.on( 'keydown.fu.search', $.proxy( this.keypress, this ) );
			this.$input.on( 'keyup.fu.search', $.proxy( this.keypressed, this ) );

			this.activeSearch = '';
		};

		Search.prototype = {

			constructor: Search,

			destroy: function() {
				this.$element.remove();
				// any external bindings
				// [none]
				// set input value attrbute
				this.$element.find( 'input' ).each( function() {
					$( this ).attr( 'value', $( this ).val() );
				} );
				// empty elements to return to original markup
				// [none]
				// returns string of markup
				return this.$element[ 0 ].outerHTML;
			},

			search: function( searchText ) {
				if ( this.$icon.hasClass( 'glyphicon' ) ) {
					this.$icon.removeClass( 'glyphicon-search' ).addClass( 'glyphicon-remove' );
				}

				this.activeSearch = searchText;
				this.$element.addClass( 'searched' );
				this.$element.trigger( 'searched.fu.search', searchText );
			},

			clear: function() {
				if ( this.$icon.hasClass( 'glyphicon' ) ) {
					this.$icon.removeClass( 'glyphicon-remove' ).addClass( 'glyphicon-search' );
				}

				this.activeSearch = '';
				this.$input.val( '' );
				this.$element.removeClass( 'searched' );
				this.$element.trigger( 'cleared.fu.search' );
			},

			action: function() {
				var val = this.$input.val();
				var inputEmptyOrUnchanged = ( val === '' || val === this.activeSearch );

				if ( this.activeSearch && inputEmptyOrUnchanged ) {
					this.clear();
				} else if ( val ) {
					this.search( val );
				}
			},

			buttonclicked: function( e ) {
				e.preventDefault();
				if ( $( e.currentTarget ).is( '.disabled, :disabled' ) ) return;
				this.action();
			},

			keypress: function( e ) {
				if ( e.which === 13 ) {
					e.preventDefault();
				}
			},

			keypressed: function( e ) {
				var remove = 'glyphicon-remove';
				var search = 'glyphicon-search';
				var val;

				if ( e.which === 13 ) {
					e.preventDefault();
					this.action();
				} else if ( e.which === 9 ) {
					e.preventDefault();
				} else {
					val = this.$input.val();

					if ( val !== this.activeSearch || !val ) {
						this.$icon.removeClass( remove ).addClass( search );
						if ( val ) {
							this.$element.removeClass( 'searched' );
						} else if ( this.options.clearOnEmpty ) {
							this.clear();
						}

					} else {
						this.$icon.removeClass( search ).addClass( remove );
					}

				}
			},

			disable: function() {
				this.$element.addClass( 'disabled' );
				this.$input.attr( 'disabled', 'disabled' );
				this.$button.addClass( 'disabled' );
			},

			enable: function() {
				this.$element.removeClass( 'disabled' );
				this.$input.removeAttr( 'disabled' );
				this.$button.removeClass( 'disabled' );
			}
		};


		// SEARCH PLUGIN DEFINITION

		$.fn.search = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.search' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.search', ( data = new Search( this, options ) ) );
				}

				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.search.defaults = {
			clearOnEmpty: false
		};

		$.fn.search.Constructor = Search;

		$.fn.search.noConflict = function() {
			$.fn.search = old;
			return this;
		};


		// DATA-API

		$( document ).on( 'mousedown.fu.search.data-api', '[data-initialize=search]', function( e ) {
			var $control = $( e.target ).closest( '.search' );
			if ( !$control.data( 'fu.search' ) ) {
				$control.search( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=search]' ).each( function() {
				var $this = $( this );
				if ( $this.data( 'fu.search' ) ) return;
				$this.search( $this.data() );
			} );
		} );



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Selectlist
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.selectlist;
		// SELECT CONSTRUCTOR AND PROTOTYPE

		var Selectlist = function( element, options ) {
			this.$element = $( element );
			this.options = $.extend( {}, $.fn.selectlist.defaults, options );

			this.$button = this.$element.find( '.btn.dropdown-toggle' );
			this.$hiddenField = this.$element.find( '.hidden-field' );
			this.$label = this.$element.find( '.selected-label' );
			this.$dropdownMenu = this.$element.find( '.dropdown-menu' );

			this.$element.on( 'click.fu.selectlist', '.dropdown-menu a', $.proxy( this.itemClicked, this ) );
			this.setDefaultSelection();

			if ( options.resize === 'auto' || this.$element.attr( 'data-resize' ) === 'auto' ) {
				this.resize();
			}
		};

		Selectlist.prototype = {

			constructor: Selectlist,

			destroy: function() {
				this.$element.remove();
				// any external bindings
				// [none]
				// empty elements to return to original markup
				// [none]
				// returns string of markup
				return this.$element[ 0 ].outerHTML;
			},

			doSelect: function( $item ) {
				var $selectedItem;
				this.$selectedItem = $selectedItem = $item;

				this.$hiddenField.val( this.$selectedItem.attr( 'data-value' ) );
				this.$label.html( $( this.$selectedItem.children()[ 0 ] ).html() );

				// clear and set selected item to allow declarative init state
				// unlike other controls, selectlist's value is stored internal, not in an input
				this.$element.find( 'li' ).each( function() {
					if ( $selectedItem.is( $( this ) ) ) {
						$( this ).attr( 'data-selected', true );
					} else {
						$( this ).removeData( 'selected' ).removeAttr( 'data-selected' );
					}
				} );
			},

			itemClicked: function( e ) {
				this.$element.trigger( 'clicked.fu.selectlist', this.$selectedItem );

				e.preventDefault();

				// is clicked element different from currently selected element?
				if ( !( $( e.target ).parent().is( this.$selectedItem ) ) ) {
					this.itemChanged( e );
				}

				// return focus to control after selecting an option
				this.$element.find( '.dropdown-toggle' ).focus();
			},

			itemChanged: function( e ) {
				//selectedItem needs to be <li> since the data is stored there, not in <a>
				this.doSelect( $( e.target ).closest( 'li' ) );

				// pass object including text and any data-attributes
				// to onchange event
				var data = this.selectedItem();
				// trigger changed event
				this.$element.trigger( 'changed.fu.selectlist', data );
			},

			resize: function() {
				var width = 0;
				var newWidth = 0;
				var sizer = $( '<div/>' ).addClass( 'selectlist-sizer' );


				if ( Boolean( $( document ).find( 'html' ).hasClass( 'fuelux' ) ) ) {
					// default behavior for fuel ux setup. means fuelux was a class on the html tag
					$( document.body ).append( sizer );
				} else {
					// fuelux is not a class on the html tag. So we'll look for the first one we find so the correct styles get applied to the sizer
					$( '.fuelux:first' ).append( sizer );
				}

				sizer.append( this.$element.clone() );

				this.$element.find( 'a' ).each( function() {
					sizer.find( '.selected-label' ).text( $( this ).text() );
					newWidth = sizer.find( '.selectlist' ).outerWidth();
					newWidth = newWidth + sizer.find( '.sr-only' ).outerWidth();
					if ( newWidth > width ) {
						width = newWidth;
					}
				} );

				if ( width <= 1 ) {
					return;
				}

				this.$button.css( 'width', width );
				this.$dropdownMenu.css( 'width', width );

				sizer.remove();
			},

			selectedItem: function() {
				var txt = this.$selectedItem.text();
				return $.extend( {
					text: txt
				}, this.$selectedItem.data() );
			},

			selectByText: function( text ) {
				var $item = $( [] );
				this.$element.find( 'li' ).each( function() {
					if ( ( this.textContent || this.innerText || $( this ).text() || '' ).toLowerCase() === ( text || '' ).toLowerCase() ) {
						$item = $( this );
						return false;
					}
				} );
				this.doSelect( $item );
			},

			selectByValue: function( value ) {
				var selector = 'li[data-value="' + value + '"]';
				this.selectBySelector( selector );
			},

			selectByIndex: function( index ) {
				// zero-based index
				var selector = 'li:eq(' + index + ')';
				this.selectBySelector( selector );
			},

			selectBySelector: function( selector ) {
				var $item = this.$element.find( selector );
				this.doSelect( $item );
			},

			setDefaultSelection: function() {
				var $item = this.$element.find( 'li[data-selected=true]' ).eq( 0 );

				if ( $item.length === 0 ) {
					$item = this.$element.find( 'li' ).has( 'a' ).eq( 0 );
				}

				this.doSelect( $item );
			},

			enable: function() {
				this.$element.removeClass( 'disabled' );
				this.$button.removeClass( 'disabled' );
			},

			disable: function() {
				this.$element.addClass( 'disabled' );
				this.$button.addClass( 'disabled' );
			}
		};


		// SELECT PLUGIN DEFINITION

		$.fn.selectlist = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.selectlist' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.selectlist', ( data = new Selectlist( this, options ) ) );
				}

				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.selectlist.defaults = {};

		$.fn.selectlist.Constructor = Selectlist;

		$.fn.selectlist.noConflict = function() {
			$.fn.selectlist = old;
			return this;
		};


		// DATA-API

		$( document ).on( 'mousedown.fu.selectlist.data-api', '[data-initialize=selectlist]', function( e ) {
			var $control = $( e.target ).closest( '.selectlist' );
			if ( !$control.data( 'fu.selectlist' ) ) {
				$control.selectlist( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=selectlist]' ).each( function() {
				var $this = $( this );
				if ( !$this.data( 'fu.selectlist' ) ) {
					$this.selectlist( $this.data() );
				}
			} );
		} );



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Spinbox
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.spinbox;

		// SPINBOX CONSTRUCTOR AND PROTOTYPE

		var Spinbox = function( element, options ) {
			this.$element = $( element );
			this.$element.find( '.btn' ).on( 'click', function( e ) {
				//keep spinbox from submitting if they forgot to say type="button" on their spinner buttons
				e.preventDefault();
			} );
			this.options = $.extend( {}, $.fn.spinbox.defaults, options );
			this.$input = this.$element.find( '.spinbox-input' );
			this.$element.on( 'focusin.fu.spinbox', this.$input, $.proxy( this.changeFlag, this ) );
			this.$element.on( 'focusout.fu.spinbox', this.$input, $.proxy( this.change, this ) );
			this.$element.on( 'keydown.fu.spinbox', this.$input, $.proxy( this.keydown, this ) );
			this.$element.on( 'keyup.fu.spinbox', this.$input, $.proxy( this.keyup, this ) );

			this.bindMousewheelListeners();
			this.mousewheelTimeout = {};

			if ( this.options.hold ) {
				this.$element.on( 'mousedown.fu.spinbox', '.spinbox-up', $.proxy( function() {
					this.startSpin( true );
				}, this ) );
				this.$element.on( 'mouseup.fu.spinbox', '.spinbox-up, .spinbox-down', $.proxy( this.stopSpin, this ) );
				this.$element.on( 'mouseout.fu.spinbox', '.spinbox-up, .spinbox-down', $.proxy( this.stopSpin, this ) );
				this.$element.on( 'mousedown.fu.spinbox', '.spinbox-down', $.proxy( function() {
					this.startSpin( false );
				}, this ) );
			} else {
				this.$element.on( 'click.fu.spinbox', '.spinbox-up', $.proxy( function() {
					this.step( true );
				}, this ) );
				this.$element.on( 'click.fu.spinbox', '.spinbox-down', $.proxy( function() {
					this.step( false );
				}, this ) );
			}

			this.switches = {
				count: 1,
				enabled: true
			};

			if ( this.options.speed === 'medium' ) {
				this.switches.speed = 300;
			} else if ( this.options.speed === 'fast' ) {
				this.switches.speed = 100;
			} else {
				this.switches.speed = 500;
			}

			this.lastValue = this.options.value;

			this.render();

			if ( this.options.disabled ) {
				this.disable();
			}
		};

		Spinbox.prototype = {
			constructor: Spinbox,

			destroy: function() {
				this.$element.remove();
				// any external bindings
				// [none]
				// set input value attrbute
				this.$element.find( 'input' ).each( function() {
					$( this ).attr( 'value', $( this ).val() );
				} );
				// empty elements to return to original markup
				// [none]
				// returns string of markup
				return this.$element[ 0 ].outerHTML;
			},

			render: function() {
				var inputValue = this.parseInput( this.$input.val() );
				var maxUnitLength = '';

				// if input is empty and option value is default, 0
				if ( inputValue !== '' && this.options.value === 0 ) {
					this.value( inputValue );
				} else {
					this.output( this.options.value );
				}

				if ( this.options.units.length ) {
					$.each( this.options.units, function( index, value ) {
						if ( value.length > maxUnitLength.length ) {
							maxUnitLength = value;
						}
					} );
				}
			},

			output: function( value, updateField ) {
				value = ( value + '' ).split( '.' ).join( this.options.decimalMark );
				updateField = ( updateField || true );
				if ( updateField ) {
					this.$input.val( value );
				}

				return value;
			},

			parseInput: function( value ) {
				value = ( value + '' ).split( this.options.decimalMark ).join( '.' );

				return value;
			},

			change: function() {
				var newVal = this.parseInput( this.$input.val() ) || '';

				if ( this.options.units.length || this.options.decimalMark !== '.' ) {
					newVal = this.parseValueWithUnit( newVal );
				} else if ( newVal / 1 ) {
					newVal = this.options.value = this.checkMaxMin( newVal / 1 );
				} else {
					newVal = this.checkMaxMin( newVal.replace( /[^0-9.-]/g, '' ) || '' );
					this.options.value = newVal / 1;
				}

				this.output( newVal );

				this.changeFlag = false;
				this.triggerChangedEvent();
			},

			changeFlag: function() {
				this.changeFlag = true;
			},

			stopSpin: function() {
				if ( this.switches.timeout !== undefined ) {
					clearTimeout( this.switches.timeout );
					this.switches.count = 1;
					this.triggerChangedEvent();
				}
			},

			triggerChangedEvent: function() {
				var currentValue = this.value();
				if ( currentValue === this.lastValue ) return;
				this.lastValue = currentValue;

				// Primary changed event
				this.$element.trigger( 'changed.fu.spinbox', this.output( currentValue, false ) ); // no DOM update
			},

			startSpin: function( type ) {
				if ( !this.options.disabled ) {
					var divisor = this.switches.count;

					if ( divisor === 1 ) {
						this.step( type );
						divisor = 1;
					} else if ( divisor < 3 ) {
						divisor = 1.5;
					} else if ( divisor < 8 ) {
						divisor = 2.5;
					} else {
						divisor = 4;
					}

					this.switches.timeout = setTimeout( $.proxy( function() {
						this.iterate( type );
					}, this ), this.switches.speed / divisor );
					this.switches.count++;
				}
			},

			iterate: function( type ) {
				this.step( type );
				this.startSpin( type );
			},

			step: function( isIncrease ) {
				// isIncrease: true is up, false is down

				var digits, multiple, currentValue, limitValue;

				// trigger change event
				if ( this.changeFlag ) {
					this.change();
				}

				// get current value and min/max options
				currentValue = this.options.value;
				limitValue = isIncrease ? this.options.max : this.options.min;

				if ( ( isIncrease ? currentValue < limitValue : currentValue > limitValue ) ) {
					var newVal = currentValue + ( isIncrease ? 1 : -1 ) * this.options.step;

					// raise to power of 10 x number of decimal places, then round
					if ( this.options.step % 1 !== 0 ) {
						digits = ( this.options.step + '' ).split( '.' )[ 1 ].length;
						multiple = Math.pow( 10, digits );
						newVal = Math.round( newVal * multiple ) / multiple;
					}

					// if outside limits, set to limit value
					if ( isIncrease ? newVal > limitValue : newVal < limitValue ) {
						this.value( limitValue );
					} else {
						this.value( newVal );
					}

				} else if ( this.options.cycle ) {
					var cycleVal = isIncrease ? this.options.min : this.options.max;
					this.value( cycleVal );
				}
			},

			value: function( value ) {
				if ( value || value === 0 ) {
					if ( this.options.units.length || this.options.decimalMark !== '.' ) {
						this.output( this.parseValueWithUnit( value + ( this.unit || '' ) ) );
						return this;

					} else if ( !isNaN( parseFloat( value ) ) && isFinite( value ) ) {
						this.options.value = value / 1;
						this.output( value + ( this.unit ? this.unit : '' ) );
						return this;

					}

				} else {
					if ( this.changeFlag ) {
						this.change();
					}

					if ( this.unit ) {
						return this.options.value + this.unit;
					} else {
						return this.output( this.options.value, false ); // no DOM update
					}

				}
			},

			isUnitLegal: function( unit ) {
				var legalUnit;

				$.each( this.options.units, function( index, value ) {
					if ( value.toLowerCase() === unit.toLowerCase() ) {
						legalUnit = unit.toLowerCase();
						return false;
					}
				} );

				return legalUnit;
			},

			// strips units and add them back
			parseValueWithUnit: function( value ) {
				var unit = value.replace( /[^a-zA-Z]/g, '' );
				var number = value.replace( /[^0-9.-]/g, '' );

				if ( unit ) {
					unit = this.isUnitLegal( unit );
				}

				this.options.value = this.checkMaxMin( number / 1 );
				this.unit = unit || undefined;
				return this.options.value + ( unit || '' );
			},

			checkMaxMin: function( value ) {
				// if unreadable
				if ( isNaN( parseFloat( value ) ) ) {
					return value;
				}

				// if not within range return the limit
				if ( !( value <= this.options.max && value >= this.options.min ) ) {
					value = value >= this.options.max ? this.options.max : this.options.min;
				}

				return value;
			},

			disable: function() {
				this.options.disabled = true;
				this.$element.addClass( 'disabled' );
				this.$input.attr( 'disabled', '' );
				this.$element.find( 'button' ).addClass( 'disabled' );
			},

			enable: function() {
				this.options.disabled = false;
				this.$element.removeClass( 'disabled' );
				this.$input.removeAttr( 'disabled' );
				this.$element.find( 'button' ).removeClass( 'disabled' );
			},

			keydown: function( event ) {
				var keyCode = event.keyCode;
				if ( keyCode === 38 ) {
					this.step( true );
				} else if ( keyCode === 40 ) {
					this.step( false );
				}
			},

			keyup: function( event ) {
				var keyCode = event.keyCode;

				if ( keyCode === 38 || keyCode === 40 ) {
					this.triggerChangedEvent();
				}
			},

			bindMousewheelListeners: function() {
				var inputEl = this.$input.get( 0 );
				if ( inputEl.addEventListener ) {
					//IE 9, Chrome, Safari, Opera
					inputEl.addEventListener( 'mousewheel', $.proxy( this.mousewheelHandler, this ), false );
					// Firefox
					inputEl.addEventListener( 'DOMMouseScroll', $.proxy( this.mousewheelHandler, this ), false );
				} else {
					// IE <9
					inputEl.attachEvent( 'onmousewheel', $.proxy( this.mousewheelHandler, this ) );
				}
			},

			mousewheelHandler: function( event ) {
				if ( !this.options.disabled ) {
					var e = window.event || event; // old IE support
					var delta = Math.max( -1, Math.min( 1, ( e.wheelDelta || -e.detail ) ) );
					var self = this;

					clearTimeout( this.mousewheelTimeout );
					this.mousewheelTimeout = setTimeout( function() {
						self.triggerChangedEvent();
					}, 300 );

					if ( delta < 0 ) {
						this.step( true );
					} else {
						this.step( false );
					}

					if ( e.preventDefault ) {
						e.preventDefault();
					} else {
						e.returnValue = false;
					}

					return false;
				}
			}
		};


		// SPINBOX PLUGIN DEFINITION

		$.fn.spinbox = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.spinbox' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.spinbox', ( data = new Spinbox( this, options ) ) );
				}

				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		// value needs to be 0 for this.render();
		$.fn.spinbox.defaults = {
			value: 0,
			min: 0,
			max: 999,
			step: 1,
			hold: true,
			speed: 'medium',
			disabled: false,
			cycle: false,
			units: [],
			decimalMark: '.'
		};

		$.fn.spinbox.Constructor = Spinbox;

		$.fn.spinbox.noConflict = function() {
			$.fn.spinbox = old;
			return this;
		};


		// DATA-API

		$( document ).on( 'mousedown.fu.spinbox.data-api', '[data-initialize=spinbox]', function( e ) {
			var $control = $( e.target ).closest( '.spinbox' );
			if ( !$control.data( 'fu.spinbox' ) ) {
				$control.spinbox( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=spinbox]' ).each( function() {
				var $this = $( this );
				if ( !$this.data( 'fu.spinbox' ) ) {
					$this.spinbox( $this.data() );
				}
			} );
		} );



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Tree
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.tree;

		// TREE CONSTRUCTOR AND PROTOTYPE

		var Tree = function Tree( element, options ) {
			this.$element = $( element );
			this.options = $.extend( {}, $.fn.tree.defaults, options );

			if ( this.options.itemSelect ) {
				this.$element.on( 'click.fu.tree', '.tree-item', $.proxy( function( ev ) {
					this.selectItem( ev.currentTarget );
				}, this ) );
			}

			this.$element.on( 'click.fu.tree', '.tree-branch-name', $.proxy( function( ev ) {
				this.toggleFolder( ev.currentTarget );
			}, this ) );

			if ( this.options.folderSelect ) {
				this.$element.off( 'click.fu.tree', '.tree-branch-name' );
				this.$element.on( 'click.fu.tree', '.icon-caret', $.proxy( function( ev ) {
					this.toggleFolder( $( ev.currentTarget ).parent() );
				}, this ) );
				this.$element.on( 'click.fu.tree', '.tree-branch-name', $.proxy( function( ev ) {
					this.selectFolder( $( ev.currentTarget ) );
				}, this ) );
			}

			this.render();
		};

		Tree.prototype = {
			constructor: Tree,

			destroy: function destroy() {
				// any external bindings [none]
				// empty elements to return to original markup
				this.$element.find( "li:not([data-template])" ).remove();

				this.$element.remove();
				// returns string of markup
				return this.$element[ 0 ].outerHTML;
			},

			render: function render() {
				this.populate( this.$element );
			},

			populate: function populate( $el ) {
				var self = this;
				var $parent = ( $el.hasClass( 'tree' ) ) ? $el : $el.parent();
				var loader = $parent.find( '.tree-loader:eq(0)' );
				var treeData = $parent.data();

				loader.removeClass( 'hide hidden' ); // hide is deprecated
				this.options.dataSource( treeData ? treeData : {}, function( items ) {
					loader.addClass( 'hidden' );

					$.each( items.data, function( index, value ) {
						var $entity;

						if ( value.type === 'folder' ) {
							$entity = self.$element.find( '[data-template=treebranch]:eq(0)' ).clone().removeClass( 'hide hidden' ).removeData( 'template' ); // hide is deprecated
							$entity.data( value );
							$entity.find( '.tree-branch-name > .tree-label' ).html( value.text || value.name );
						} else if ( value.type === 'item' ) {
							$entity = self.$element.find( '[data-template=treeitem]:eq(0)' ).clone().removeClass( 'hide hidden' ).removeData( 'template' ); // hide is deprecated
							$entity.find( '.tree-item-name > .tree-label' ).html( value.text || value.name );
							$entity.data( value );
						}

						// Decorate $entity with data or other attributes making the
						// element easily accessable with libraries like jQuery.
						//
						// Values are contained within the object returned
						// for folders and items as attr:
						//
						// {
						//     text: "An Item",
						//     type: 'item',
						//     attr = {
						//         'classes': 'required-item red-text',
						//         'data-parent': parentId,
						//         'guid': guid,
						//         'id': guid
						//     }
						// };
						//
						// the "name" attribute is also supported but is deprecated for "text".

						// add attributes to tree-branch or tree-item
						var attr = value.attr || value.dataAttributes || [];
						$.each( attr, function( key, value ) {
							switch ( key ) {
								case 'cssClass':
								case 'class':
								case 'className':
									$entity.addClass( value );
									break;

									// allow custom icons
								case 'data-icon':
									$entity.find( '.icon-item' ).removeClass().addClass( 'icon-item ' + value );
									$entity.attr( key, value );
									break;

									// ARIA support
								case 'id':
									$entity.attr( key, value );
									$entity.attr( 'aria-labelledby', value + '-label' );
									$entity.find( '.tree-branch-name > .tree-label' ).attr( 'id', value + '-label' );
									break;

									// style, data-*
								default:
									$entity.attr( key, value );
									break;
							}
						} );

						// add child nodes
						if ( $el.hasClass( 'tree-branch-header' ) ) {
							$parent.find( '.tree-branch-children:eq(0)' ).append( $entity );
						} else {
							$el.append( $entity );
						}
					} );

					// return newly populated folder
					self.$element.trigger( 'loaded.fu.tree', $parent );
				} );
			},

			selectItem: function selectItem( el ) {
				if ( !this.options.itemSelect ) return;
				var $el = $( el );
				var selData = $el.data();
				var $all = this.$element.find( '.tree-selected' );
				var data = [];
				var $icon = $el.find( '.icon-item' );

				if ( this.options.multiSelect ) {
					$.each( $all, function( index, value ) {
						var $val = $( value );
						if ( $val[ 0 ] !== $el[ 0 ] ) {
							data.push( $( value ).data() );
						}
					} );
				} else if ( $all[ 0 ] !== $el[ 0 ] ) {
					$all.removeClass( 'tree-selected' )
						.find( '.glyphicon' ).removeClass( 'glyphicon-ok' ).addClass( 'fueluxicon-bullet' );
					data.push( selData );
				}

				var eventType = 'selected';
				if ( $el.hasClass( 'tree-selected' ) ) {
					eventType = 'deselected';
					$el.removeClass( 'tree-selected' );
					if ( $icon.hasClass( 'glyphicon-ok' ) || $icon.hasClass( 'fueluxicon-bullet' ) ) {
						$icon.removeClass( 'glyphicon-ok' ).addClass( 'fueluxicon-bullet' );
					}

				} else {
					$el.addClass( 'tree-selected' );
					// add tree dot back in
					if ( $icon.hasClass( 'glyphicon-ok' ) || $icon.hasClass( 'fueluxicon-bullet' ) ) {
						$icon.removeClass( 'fueluxicon-bullet' ).addClass( 'glyphicon-ok' );
					}

					if ( this.options.multiSelect ) {
						data.push( selData );
					}

				}

				this.$element.trigger( eventType + '.fu.tree', {
					target: selData,
					selected: data
				} );

				// Return new list of selected items, the item
				// clicked, and the type of event:
				$el.trigger( 'updated.fu.tree', {
					selected: data,
					item: $el,
					eventType: eventType
				} );
			},

			openFolder: function openFolder( el, ignoreRedundantOpens ) {
				var $el = $( el );

				//don't break the API :| (make this functionally the same as calling 'toggleFolder')
				if ( !ignoreRedundantOpens && $el.find( '.glyphicon-folder-open' ).length && !this.options.ignoreRedundantOpens ) {
					this.closeFolder( el );
				}

				var $branch = $el.closest( '.tree-branch' );
				var $treeFolderContent = $branch.find( '.tree-branch-children' );
				var $treeFolderContentFirstChild = $treeFolderContent.eq( 0 );

				//take care of the styles
				$branch.addClass( 'tree-open' );
				$branch.attr( 'aria-expanded', 'true' );
				$treeFolderContentFirstChild.removeClass( 'hide hidden' ); // hide is deprecated
				$branch.find( '> .tree-branch-header .icon-folder' ).eq( 0 )
					.removeClass( 'glyphicon-folder-close' )
					.addClass( 'glyphicon-folder-open' );

				//add the children to the folder
				if ( !$treeFolderContent.children().length ) {
					this.populate( $treeFolderContent );
				}

				this.$element.trigger( 'opened.fu.tree', $branch.data() );
			},

			closeFolder: function closeFolder( el ) {
				var $el = $( el );
				var $branch = $el.closest( '.tree-branch' );
				var $treeFolderContent = $branch.find( '.tree-branch-children' );
				var $treeFolderContentFirstChild = $treeFolderContent.eq( 0 );

				//take care of the styles
				$branch.removeClass( 'tree-open' );
				$branch.attr( 'aria-expanded', 'false' );
				$treeFolderContentFirstChild.addClass( 'hidden' );
				$branch.find( '> .tree-branch-header .icon-folder' ).eq( 0 )
					.removeClass( 'glyphicon-folder-open' )
					.addClass( 'glyphicon-folder-close' );

				// remove chidren if no cache
				if ( !this.options.cacheItems ) {
					$treeFolderContentFirstChild.empty();
				}

				this.$element.trigger( 'closed.fu.tree', $branch.data() );
			},

			toggleFolder: function toggleFolder( el ) {
				var $el = $( el );

				if ( $el.find( '.glyphicon-folder-close' ).length ) {
					this.openFolder( el );
				} else if ( $el.find( '.glyphicon-folder-open' ).length ) {
					this.closeFolder( el );
				}
			},

			selectFolder: function selectFolder( clickedElement ) {
				if ( !this.options.folderSelect ) return;
				var $clickedElement = $( clickedElement );
				var $clickedBranch = $clickedElement.closest( '.tree-branch' );
				var $selectedBranch = this.$element.find( '.tree-branch.tree-selected' );
				var clickedData = $clickedBranch.data();
				var selectedData = [];
				var eventType = 'selected';

				// select clicked item
				if ( $clickedBranch.hasClass( 'tree-selected' ) ) {
					eventType = 'deselected';
					$clickedBranch.removeClass( 'tree-selected' );
				} else {
					$clickedBranch.addClass( 'tree-selected' );
				}

				if ( this.options.multiSelect ) {
					// get currently selected
					$selectedBranch = this.$element.find( '.tree-branch.tree-selected' );

					$.each( $selectedBranch, function( index, value ) {
						var $value = $( value );
						if ( $value[ 0 ] !== $clickedElement[ 0 ] ) {
							selectedData.push( $( value ).data() );
						}
					} );

				} else if ( $selectedBranch[ 0 ] !== $clickedElement[ 0 ] ) {
					$selectedBranch.removeClass( 'tree-selected' );

					selectedData.push( clickedData );
				}

				this.$element.trigger( eventType + '.fu.tree', {
					target: clickedData,
					selected: selectedData
				} );

				// Return new list of selected items, the item
				// clicked, and the type of event:
				$clickedElement.trigger( 'updated.fu.tree', {
					selected: selectedData,
					item: $clickedElement,
					eventType: eventType
				} );
			},

			selectedItems: function selectedItems() {
				var $sel = this.$element.find( '.tree-selected' );
				var data = [];

				$.each( $sel, function( index, value ) {
					data.push( $( value ).data() );
				} );
				return data;
			},

			// collapses open folders
			collapse: function collapse() {
				var self = this;
				var reportedClosed = [];

				var closedReported = function closedReported( event, closed ) {
					reportedClosed.push( closed );

					// hide is deprecated
					if ( self.$element.find( ".tree-branch.tree-open:not('.hidden, .hide')" ).length === 0 ) {
						self.$element.trigger( 'closedAll.fu.tree', {
							tree: self.$element,
							reportedClosed: reportedClosed
						} );
						self.$element.off( 'loaded.fu.tree', self.$element, closedReported );
					}
				};

				//trigger callback when all folders have reported closed
				self.$element.on( 'closed.fu.tree', closedReported );

				self.$element.find( ".tree-branch.tree-open:not('.hidden, .hide')" ).each( function() {
					self.closeFolder( this );
				} );
			},

			//disclose visible will only disclose visible tree folders
			discloseVisible: function discloseVisible() {
				var self = this;

				var $openableFolders = self.$element.find( ".tree-branch:not('.tree-open, .hidden, .hide')" );
				var reportedOpened = [];

				var openReported = function openReported( event, opened ) {
					reportedOpened.push( opened );

					if ( reportedOpened.length === $openableFolders.length ) {
						self.$element.trigger( 'disclosedVisible.fu.tree', {
							tree: self.$element,
							reportedOpened: reportedOpened
						} );
						/*
						 * Unbind the `openReported` event. `discloseAll` may be running and we want to reset this
						 * method for the next iteration.
						 */
						self.$element.off( 'loaded.fu.tree', self.$element, openReported );
					}
				};

				//trigger callback when all folders have reported opened
				self.$element.on( 'loaded.fu.tree', openReported );

				// open all visible folders
				self.$element.find( ".tree-branch:not('.tree-open, .hidden, .hide')" ).each( function triggerOpen() {
					self.openFolder( $( this ).find( '.tree-branch-header' ), true );
				} );
			},

			/**
			 * Disclose all will keep listening for `loaded.fu.tree` and if `$(tree-el).data('ignore-disclosures-limit')`
			 * is `true` (defaults to `true`) it will attempt to disclose any new closed folders than were
			 * loaded in during the last disclosure.
			 */
			discloseAll: function discloseAll() {
				var self = this;

				//first time
				if ( typeof self.$element.data( 'disclosures' ) === 'undefined' ) {
					self.$element.data( 'disclosures', 0 );
				}

				var isExceededLimit = ( self.options.disclosuresUpperLimit >= 1 && self.$element.data( 'disclosures' ) >= self.options.disclosuresUpperLimit );
				var isAllDisclosed = self.$element.find( ".tree-branch:not('.tree-open, .hidden, .hide')" ).length === 0;


				if ( !isAllDisclosed ) {
					if ( isExceededLimit ) {
						self.$element.trigger( 'exceededDisclosuresLimit.fu.tree', {
							tree: self.$element,
							disclosures: self.$element.data( 'disclosures' )
						} );

						/*
						 * If you've exceeded the limit, the loop will be killed unless you
						 * explicitly ignore the limit and start the loop again:
						 *
						 *    $tree.one('exceededDisclosuresLimit.fu.tree', function () {
						 *        $tree.data('ignore-disclosures-limit', true);
						 *        $tree.tree('discloseAll');
						 *    });
						 */
						if ( !self.$element.data( 'ignore-disclosures-limit' ) ) {
							return;
						}

					}

					self.$element.data( 'disclosures', self.$element.data( 'disclosures' ) + 1 );

					/*
					 * A new branch that is closed might be loaded in, make sure those get handled too.
					 * This attachment needs to occur before calling `discloseVisible` to make sure that
					 * if the execution of `discloseVisible` happens _super fast_ (as it does in our QUnit tests
					 * this will still be called. However, make sure this only gets called _once_, because
					 * otherwise, every single time we go through this loop, _another_ event will be bound
					 * and then when the trigger happens, this will fire N times, where N equals the number
					 * of recursive `discloseAll` executions (instead of just one)
					 */
					self.$element.one( 'disclosedVisible.fu.tree', function() {
						self.discloseAll();
					} );

					/*
					 * If the page is very fast, calling this first will cause `disclosedVisible.fu.tree` to not
					 * be bound in time to be called, so, we need to call this last so that the things bound
					 * and triggered above can have time to take place before the next execution of the
					 * `discloseAll` method.
					 */
					self.discloseVisible();
				} else {
					self.$element.trigger( 'disclosedAll.fu.tree', {
						tree: self.$element,
						disclosures: self.$element.data( 'disclosures' )
					} );

					//if `cacheItems` is false, and they call closeAll, the data is trashed and therefore
					//disclosures needs to accurately reflect that
					if ( !self.options.cacheItems ) {
						self.$element.one( 'closeAll.fu.tree', function() {
							self.$element.data( 'disclosures', 0 );
						} );
					}

				}
			}
		};

		//alias for collapse for consistency. "Collapse" is an ambiguous term (collapse what? All? One specific branch?)
		Tree.prototype.closeAll = Tree.prototype.collapse;

		// TREE PLUGIN DEFINITION

		$.fn.tree = function tree( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.tree' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.tree', ( data = new Tree( this, options ) ) );
				}

				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.tree.defaults = {
			dataSource: function dataSource( options, callback ) {},
			multiSelect: false,
			cacheItems: true,
			folderSelect: true,
			itemSelect: true,
			/*
			 * Calling "open" on something, should do that. However, the current API
			 * instead treats "open" as a "toggle" and will close a folder that is open
			 * if you call `openFolder` on it. Setting `ignoreRedundantOpens` to `true`
			 * will make the folder instead ignore the redundant call and stay open.
			 * This allows you to fix the API until 3.7.x when we can deprecate the switch
			 * and make `openFolder` behave correctly by default.
			 */
			ignoreRedundantOpens: false,
			/*
			 * How many times `discloseAll` should be called before a stopping and firing
			 * an `exceededDisclosuresLimit` event. You can force it to continue by
			 * listening for this event, setting `ignore-disclosures-limit` to `true` and
			 * starting `discloseAll` back up again. This lets you make more decisions
			 * about if/when/how/why/how many times `discloseAll` will be started back
			 * up after it exceeds the limit.
			 *
			 *    $tree.one('exceededDisclosuresLimit.fu.tree', function () {
			 *        $tree.data('ignore-disclosures-limit', true);
			 *        $tree.tree('discloseAll');
			 *    });
			 *
			 * `disclusuresUpperLimit` defaults to `0`, so by default this trigger
			 * will never fire. The true hard the upper limit is the browser's
			 * ability to load new items (i.e. it will keep loading until the browser
			 * falls over and dies). On the Fuel UX `index.html` page, the point at
			 * which the page became super slow (enough to seem almost unresponsive)
			 * was `4`, meaning 256 folders had been opened, and 1024 were attempting to open.
			 */
			disclosuresUpperLimit: 0
		};

		$.fn.tree.Constructor = Tree;

		$.fn.tree.noConflict = function() {
			$.fn.tree = old;
			return this;
		};


		// NO DATA-API DUE TO NEED OF DATA-SOURCE



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Wizard
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.wizard;

		// WIZARD CONSTRUCTOR AND PROTOTYPE

		var Wizard = function( element, options ) {
			var kids;

			this.$element = $( element );
			this.options = $.extend( {}, $.fn.wizard.defaults, options );
			this.options.disablePreviousStep = ( this.$element.attr( 'data-restrict' ) === 'previous' ) ? true : this.options.disablePreviousStep;
			this.currentStep = this.options.selectedItem.step;
			this.numSteps = this.$element.find( '.steps li' ).length;
			this.$prevBtn = this.$element.find( 'button.btn-prev' );
			this.$nextBtn = this.$element.find( 'button.btn-next' );

			kids = this.$nextBtn.children().detach();
			this.nextText = $.trim( this.$nextBtn.text() );
			this.$nextBtn.append( kids );

			// handle events
			this.$prevBtn.on( 'click.fu.wizard', $.proxy( this.previous, this ) );
			this.$nextBtn.on( 'click.fu.wizard', $.proxy( this.next, this ) );
			this.$element.on( 'click.fu.wizard', 'li.complete', $.proxy( this.stepclicked, this ) );

			this.selectedItem( this.options.selectedItem );

			if ( this.options.disablePreviousStep ) {
				this.$prevBtn.attr( 'disabled', true );
				this.$element.find( '.steps' ).addClass( 'previous-disabled' );
			}
		};

		Wizard.prototype = {

			constructor: Wizard,

			destroy: function() {
				this.$element.remove();
				// any external bindings [none]
				// empty elements to return to original markup [none]
				// returns string of markup
				return this.$element[ 0 ].outerHTML;
			},

			//index is 1 based
			//second parameter can be array of objects [{ ... }, { ... }] or you can pass n additional objects as args
			//object structure is as follows (all params are optional): { badge: '', label: '', pane: '' }
			addSteps: function( index ) {
				var items = [].slice.call( arguments ).slice( 1 );
				var $steps = this.$element.find( '.steps' );
				var $stepContent = this.$element.find( '.step-content' );
				var i, l, $pane, $startPane, $startStep, $step;

				index = ( index === -1 || ( index > ( this.numSteps + 1 ) ) ) ? this.numSteps + 1 : index;
				if ( items[ 0 ] instanceof Array ) {
					items = items[ 0 ];
				}

				$startStep = $steps.find( 'li:nth-child(' + index + ')' );
				$startPane = $stepContent.find( '.step-pane:nth-child(' + index + ')' );
				if ( $startStep.length < 1 ) {
					$startStep = null;
				}

				for ( i = 0, l = items.length; i < l; i++ ) {
					$step = $( '<li data-step="' + index + '"><span class="badge badge-info"></span></li>' );
					$step.append( items[ i ].label || '' ).append( '<span class="chevron"></span>' );
					$step.find( '.badge' ).append( items[ i ].badge || index );

					$pane = $( '<div class="step-pane" data-step="' + index + '"></div>' );
					$pane.append( items[ i ].pane || '' );

					if ( !$startStep ) {
						$steps.append( $step );
						$stepContent.append( $pane );
					} else {
						$startStep.before( $step );
						$startPane.before( $pane );
					}

					index++;
				}

				this.syncSteps();
				this.numSteps = $steps.find( 'li' ).length;
				this.setState();
			},

			//index is 1 based, howMany is number to remove
			removeSteps: function( index, howMany ) {
				var action = 'nextAll';
				var i = 0;
				var $steps = this.$element.find( '.steps' );
				var $stepContent = this.$element.find( '.step-content' );
				var $start;

				howMany = ( howMany !== undefined ) ? howMany : 1;

				if ( index > $steps.find( 'li' ).length ) {
					$start = $steps.find( 'li:last' );
				} else {
					$start = $steps.find( 'li:nth-child(' + index + ')' ).prev();
					if ( $start.length < 1 ) {
						action = 'children';
						$start = $steps;
					}

				}

				$start[ action ]().each( function() {
					var item = $( this );
					var step = item.attr( 'data-step' );
					if ( i < howMany ) {
						item.remove();
						$stepContent.find( '.step-pane[data-step="' + step + '"]:first' ).remove();
					} else {
						return false;
					}

					i++;
				} );

				this.syncSteps();
				this.numSteps = $steps.find( 'li' ).length;
				this.setState();
			},

			setState: function() {
				var canMovePrev = ( this.currentStep > 1 ); //remember, steps index is 1 based...
				var isFirstStep = ( this.currentStep === 1 );
				var isLastStep = ( this.currentStep === this.numSteps );

				// disable buttons based on current step
				if ( !this.options.disablePreviousStep ) {
					this.$prevBtn.attr( 'disabled', ( isFirstStep === true || canMovePrev === false ) );
				}

				// change button text of last step, if specified
				var last = this.$nextBtn.attr( 'data-last' );
				if ( last ) {
					this.lastText = last;
					// replace text
					var text = this.nextText;
					if ( isLastStep === true ) {
						text = this.lastText;
						// add status class to wizard
						this.$element.addClass( 'complete' );
					} else {
						this.$element.removeClass( 'complete' );
					}

					var kids = this.$nextBtn.children().detach();
					this.$nextBtn.text( text ).append( kids );
				}

				// reset classes for all steps
				var $steps = this.$element.find( '.steps li' );
				$steps.removeClass( 'active' ).removeClass( 'complete' );
				$steps.find( 'span.badge' ).removeClass( 'badge-info' ).removeClass( 'badge-success' );

				// set class for all previous steps
				var prevSelector = '.steps li:lt(' + ( this.currentStep - 1 ) + ')';
				var $prevSteps = this.$element.find( prevSelector );
				$prevSteps.addClass( 'complete' );
				$prevSteps.find( 'span.badge' ).addClass( 'badge-success' );

				// set class for current step
				var currentSelector = '.steps li:eq(' + ( this.currentStep - 1 ) + ')';
				var $currentStep = this.$element.find( currentSelector );
				$currentStep.addClass( 'active' );
				$currentStep.find( 'span.badge' ).addClass( 'badge-info' );

				// set display of target element
				var $stepContent = this.$element.find( '.step-content' );
				var target = $currentStep.attr( 'data-step' );
				$stepContent.find( '.step-pane' ).removeClass( 'active' );
				$stepContent.find( '.step-pane[data-step="' + target + '"]:first' ).addClass( 'active' );

				// reset the wizard position to the left
				this.$element.find( '.steps' ).first().attr( 'style', 'margin-left: 0' );

				// check if the steps are wider than the container div
				var totalWidth = 0;
				this.$element.find( '.steps > li' ).each( function() {
					totalWidth += $( this ).outerWidth();
				} );
				var containerWidth = 0;
				if ( this.$element.find( '.actions' ).length ) {
					containerWidth = this.$element.width() - this.$element.find( '.actions' ).first().outerWidth();
				} else {
					containerWidth = this.$element.width();
				}

				if ( totalWidth > containerWidth ) {
					// set the position so that the last step is on the right
					var newMargin = totalWidth - containerWidth;
					this.$element.find( '.steps' ).first().attr( 'style', 'margin-left: -' + newMargin + 'px' );

					// set the position so that the active step is in a good
					// position if it has been moved out of view
					if ( this.$element.find( 'li.active' ).first().position().left < 200 ) {
						newMargin += this.$element.find( 'li.active' ).first().position().left - 200;
						if ( newMargin < 1 ) {
							this.$element.find( '.steps' ).first().attr( 'style', 'margin-left: 0' );
						} else {
							this.$element.find( '.steps' ).first().attr( 'style', 'margin-left: -' + newMargin + 'px' );
						}

					}

				}

				// only fire changed event after initializing
				if ( typeof( this.initialized ) !== 'undefined' ) {
					var e = $.Event( 'changed.fu.wizard' );
					this.$element.trigger( e, {
						step: this.currentStep
					} );
				}

				this.initialized = true;
			},

			stepclicked: function( e ) {
				var li = $( e.currentTarget );
				var index = this.$element.find( '.steps li' ).index( li );

				if ( index < this.currentStep && this.options.disablePreviousStep ) { //enforce restrictions
					return;
				} else {
					var evt = $.Event( 'stepclicked.fu.wizard' );
					this.$element.trigger( evt, {
						step: index + 1
					} );
					if ( evt.isDefaultPrevented() ) {
						return;
					}

					this.currentStep = ( index + 1 );
					this.setState();
				}
			},

			syncSteps: function() {
				var i = 1;
				var $steps = this.$element.find( '.steps' );
				var $stepContent = this.$element.find( '.step-content' );

				$steps.children().each( function() {
					var item = $( this );
					var badge = item.find( '.badge' );
					var step = item.attr( 'data-step' );

					if ( !isNaN( parseInt( badge.html(), 10 ) ) ) {
						badge.html( i );
					}

					item.attr( 'data-step', i );
					$stepContent.find( '.step-pane[data-step="' + step + '"]:last' ).attr( 'data-step', i );
					i++;
				} );
			},

			previous: function() {
				if ( this.options.disablePreviousStep || this.currentStep === 1 ) {
					return;
				}

				var e = $.Event( 'actionclicked.fu.wizard' );
				this.$element.trigger( e, {
					step: this.currentStep,
					direction: 'previous'
				} );
				if ( e.isDefaultPrevented() ) {
					return;
				} // don't increment ...what? Why?

				this.currentStep -= 1;
				this.setState();

				// only set focus if focus is still on the $nextBtn (avoid stomping on a focus set programmatically in actionclicked callback)
				if ( this.$prevBtn.is( ':focus' ) ) {
					var firstFormField = this.$element.find( '.active' ).find( 'input, select, textarea' )[ 0 ];

					if ( typeof firstFormField !== 'undefined' ) {
						// allow user to start typing immediately instead of having to click on the form field.
						$( firstFormField ).focus();
					} else if ( this.$element.find( '.active input:first' ).length === 0 && this.$prevBtn.is( ':disabled' ) ) {
						//only set focus on a button as the last resort if no form fields exist and the just clicked button is now disabled
						this.$nextBtn.focus();
					}

				}
			},

			next: function() {
				if ( this.currentStep < this.numSteps ) {
					var e = $.Event( 'actionclicked.fu.wizard' );
					this.$element.trigger( e, {
						step: this.currentStep,
						direction: 'next'
					} );
					if ( e.isDefaultPrevented() ) {
						return;
					} // respect preventDefault in case dev has attached validation to step and wants to stop propagation based on it.

					this.currentStep += 1;
					this.setState();
				} else { //is last step
					this.$element.trigger( 'finished.fu.wizard' );
				}

				// only set focus if focus is still on the $nextBtn (avoid stomping on a focus set programmatically in actionclicked callback)
				if ( this.$nextBtn.is( ':focus' ) ) {
					var firstFormField = this.$element.find( '.active' ).find( 'input, select, textarea' )[ 0 ];

					if ( typeof firstFormField !== 'undefined' ) {
						// allow user to start typing immediately instead of having to click on the form field.
						$( firstFormField ).focus();
					} else if ( this.$element.find( '.active input:first' ).length === 0 && this.$nextBtn.is( ':disabled' ) ) {
						//only set focus on a button as the last resort if no form fields exist and the just clicked button is now disabled
						this.$prevBtn.focus();
					}

				}
			},

			selectedItem: function( selectedItem ) {
				var retVal, step;

				if ( selectedItem ) {
					step = selectedItem.step || -1;
					//allow selection of step by data-name
					step = isNaN( step ) && this.$element.find( '.steps li[data-name="' + step + '"]' ).first().attr( 'data-step' ) || step;

					if ( 1 <= step && step <= this.numSteps ) {
						this.currentStep = step;
						this.setState();
					} else {
						step = this.$element.find( '.steps li.active:first' ).attr( 'data-step' );
						if ( !isNaN( step ) ) {
							this.currentStep = parseInt( step, 10 );
							this.setState();
						}

					}

					retVal = this;
				} else {
					retVal = {
						step: this.currentStep
					};
					if ( this.$element.find( '.steps li.active:first[data-name]' ).length ) {
						retVal.stepname = this.$element.find( '.steps li.active:first' ).attr( 'data-name' );
					}

				}

				return retVal;
			}
		};


		// WIZARD PLUGIN DEFINITION

		$.fn.wizard = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.wizard' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.wizard', ( data = new Wizard( this, options ) ) );
				}

				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.wizard.defaults = {
			disablePreviousStep: false,
			selectedItem: {
				step: -1
			} //-1 means it will attempt to look for "active" class in order to set the step
		};

		$.fn.wizard.Constructor = Wizard;

		$.fn.wizard.noConflict = function() {
			$.fn.wizard = old;
			return this;
		};


		// DATA-API

		$( document ).on( 'mouseover.fu.wizard.data-api', '[data-initialize=wizard]', function( e ) {
			var $control = $( e.target ).closest( '.wizard' );
			if ( !$control.data( 'fu.wizard' ) ) {
				$control.wizard( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=wizard]' ).each( function() {
				var $this = $( this );
				if ( $this.data( 'fu.wizard' ) ) return;
				$this.wizard( $this.data() );
			} );
		} );



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Infinite Scroll
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.infinitescroll;

		// INFINITE SCROLL CONSTRUCTOR AND PROTOTYPE

		var InfiniteScroll = function( element, options ) {
			this.$element = $( element );
			this.$element.addClass( 'infinitescroll' );
			this.options = $.extend( {}, $.fn.infinitescroll.defaults, options );

			this.curScrollTop = this.$element.scrollTop();
			this.curPercentage = this.getPercentage();
			this.fetchingData = false;

			this.$element.on( 'scroll.fu.infinitescroll', $.proxy( this.onScroll, this ) );
			this.onScroll();
		};

		InfiniteScroll.prototype = {

			constructor: InfiniteScroll,

			destroy: function() {
				this.$element.remove();
				// any external bindings
				// [none]

				// empty elements to return to original markup
				this.$element.empty();

				return this.$element[ 0 ].outerHTML;
			},

			disable: function() {
				this.$element.off( 'scroll.fu.infinitescroll' );
			},

			enable: function() {
				this.$element.on( 'scroll.fu.infinitescroll', $.proxy( this.onScroll, this ) );
			},

			end: function( content ) {
				var end = $( '<div class="infinitescroll-end"></div>' );
				if ( content ) {
					end.append( content );
				} else {
					end.append( '---------' );
				}

				this.$element.append( end );
				this.disable();
			},

			getPercentage: function() {
				var height = ( this.$element.css( 'box-sizing' ) === 'border-box' ) ? this.$element.outerHeight() : this.$element.height();
				var scrollHeight = this.$element.get( 0 ).scrollHeight;
				return ( scrollHeight > height ) ? ( ( height / ( scrollHeight - this.curScrollTop ) ) * 100 ) : 0;
			},

			fetchData: function( force ) {
				var load = $( '<div class="infinitescroll-load"></div>' );
				var self = this;
				var moreBtn;

				var fetch = function() {
					var helpers = {
						percentage: self.curPercentage,
						scrollTop: self.curScrollTop
					};
					var $loader = $( '<div class="loader"></div>' );
					load.append( $loader );
					$loader.loader();
					if ( self.options.dataSource ) {
						self.options.dataSource( helpers, function( resp ) {
							var end;
							load.remove();
							if ( resp.content ) {
								self.$element.append( resp.content );
							}

							if ( resp.end ) {
								end = ( resp.end !== true ) ? resp.end : undefined;
								self.end( end );
							}

							self.fetchingData = false;
						} );
					}
				};

				this.fetchingData = true;
				this.$element.append( load );
				if ( this.options.hybrid && force !== true ) {
					moreBtn = $( '<button type="button" class="btn btn-primary"></button>' );
					if ( typeof this.options.hybrid === 'object' ) {
						moreBtn.append( this.options.hybrid.label );
					} else {
						moreBtn.append( '<span class="glyphicon glyphicon-repeat"></span>' );
					}

					moreBtn.on( 'click.fu.infinitescroll', function() {
						moreBtn.remove();
						fetch();
					} );
					load.append( moreBtn );
				} else {
					fetch();
				}
			},

			onScroll: function( e ) {
				this.curScrollTop = this.$element.scrollTop();
				this.curPercentage = this.getPercentage();
				if ( !this.fetchingData && this.curPercentage >= this.options.percentage ) {
					this.fetchData();
				}
			}
		};

		// INFINITE SCROLL PLUGIN DEFINITION

		$.fn.infinitescroll = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.infinitescroll' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.infinitescroll', ( data = new InfiniteScroll( this, options ) ) );
				}

				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.infinitescroll.defaults = {
			dataSource: null,
			hybrid: false, //can be true or an object with structure: { 'label': (markup or jQuery obj) }
			percentage: 95 //percentage scrolled to the bottom before more is loaded
		};

		$.fn.infinitescroll.Constructor = InfiniteScroll;

		$.fn.infinitescroll.noConflict = function() {
			$.fn.infinitescroll = old;
			return this;
		};

		// NO DATA-API DUE TO NEED OF DATA-SOURCE



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Pillbox
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.pillbox;

		// PILLBOX CONSTRUCTOR AND PROTOTYPE

		var Pillbox = function( element, options ) {
			this.$element = $( element );
			this.$moreCount = this.$element.find( '.pillbox-more-count' );
			this.$pillGroup = this.$element.find( '.pill-group' );
			this.$addItem = this.$element.find( '.pillbox-add-item' );
			this.$addItemWrap = this.$addItem.parent();
			this.$suggest = this.$element.find( '.suggest' );
			this.$pillHTML = '<li class="btn btn-default pill">' +
				'	<span></span>' +
				'	<span class="glyphicon glyphicon-close">' +
				'		<span class="sr-only">Remove</span>' +
				'	</span>' +
				'</li>';

			this.options = $.extend( {}, $.fn.pillbox.defaults, options );

			if ( this.options.readonly === -1 ) {
				if ( this.$element.attr( 'data-readonly' ) !== undefined ) {
					this.readonly( true );
				}

			} else if ( this.options.readonly ) {
				this.readonly( true );
			}

			// EVENTS
			this.acceptKeyCodes = this._generateObject( this.options.acceptKeyCodes );
			// Creatie an object out of the key code array, so we dont have to loop through it on every key stroke

			this.$element.on( 'click.fu.pillbox', '.pill-group > .pill', $.proxy( this.itemClicked, this ) );
			this.$element.on( 'click.fu.pillbox', $.proxy( this.inputFocus, this ) );
			this.$element.on( 'keydown.fu.pillbox', '.pillbox-add-item', $.proxy( this.inputEvent, this ) );
			if ( this.options.onKeyDown ) {
				this.$element.on( 'mousedown.fu.pillbox', '.suggest > li', $.proxy( this.suggestionClick, this ) );
			}

			if ( this.options.edit ) {
				this.$element.addClass( 'pills-editable' );
				this.$element.on( 'blur.fu.pillbox', '.pillbox-add-item', $.proxy( this.cancelEdit, this ) );
			}
		};

		Pillbox.prototype = {
			constructor: Pillbox,

			destroy: function() {
				this.$element.remove();
				// any external bindings
				// [none]
				// empty elements to return to original markup
				// [none]
				// returns string of markup
				return this.$element[ 0 ].outerHTML;
			},

			items: function() {
				var self = this;

				return this.$pillGroup.children( '.pill' ).map( function() {
					return self.getItemData( $( this ) );
				} ).get();
			},

			itemClicked: function( e ) {
				var self = this;
				var $target = $( e.target );
				var $item;

				e.preventDefault();
				e.stopPropagation();
				this._closeSuggestions();

				if ( !$target.hasClass( 'pill' ) ) {
					$item = $target.parent();
					if ( this.$element.attr( 'data-readonly' ) === undefined ) {
						if ( $target.hasClass( 'glyphicon-close' ) ) {
							if ( this.options.onRemove ) {
								this.options.onRemove( this.getItemData( $item, {
									el: $item
								} ), $.proxy( this._removeElement, this ) );
							} else {
								this._removeElement( this.getItemData( $item, {
									el: $item
								} ) );
							}

							return false;
						} else if ( this.options.edit ) {
							if ( $item.find( '.pillbox-list-edit' ).length ) {
								return false;
							}

							this.openEdit( $item );
						}

					}

				} else {
					$item = $target;
				}

				this.$element.trigger( 'clicked.fu.pillbox', this.getItemData( $item ) );
			},

			readonly: function( enable ) {
				if ( enable ) {
					this.$element.attr( 'data-readonly', 'readonly' );
				} else {
					this.$element.removeAttr( 'data-readonly' );
				}

				if ( this.options.truncate ) {
					this.truncate( enable );
				}
			},

			suggestionClick: function( e ) {
				var $item = $( e.currentTarget );
				var item = {
					text: $item.html(),
					value: $item.data( 'value' )
				};

				e.preventDefault();
				this.$addItem.val( '' );

				if ( $item.data( 'attr' ) ) {
					item.attr = JSON.parse( $item.data( 'attr' ) );
				}

				item.data = $item.data( 'data' );

				this.addItems( item, true );

				// needs to be after addItems for IE
				this._closeSuggestions();
			},

			itemCount: function() {
				return this.$pillGroup.children( '.pill' ).length;
			},

			// First parameter is 1 based index (optional, if index is not passed all new items will be appended)
			// Second parameter can be array of objects [{ ... }, { ... }] or you can pass n additional objects as args
			// object structure is as follows (attr and value are optional): { text: '', value: '', attr: {}, data: {} }
			addItems: function() {
				var self = this;
				var items, index, isInternal;

				if ( isFinite( String( arguments[ 0 ] ) ) && !( arguments[ 0 ] instanceof Array ) ) {
					items = [].slice.call( arguments ).slice( 1 );
					index = arguments[ 0 ];
				} else {
					items = [].slice.call( arguments ).slice( 0 );
					isInternal = items[ 1 ] && !items[ 1 ].text;
				}

				//If first argument is an array, use that, otherwise they probably passed each thing through as a separate arg, so use items as-is
				if ( items[ 0 ] instanceof Array ) {
					items = items[ 0 ];
				}

				if ( items.length ) {
					$.each( items, function( i, value ) {
						var data = {
							text: value.text,
							value: ( value.value ? value.value : value.text ),
							el: self.$pillHTML
						};

						if ( value.attr ) {
							data.attr = value.attr;
						}

						if ( value.data ) {
							data.data = value.data;
						}

						items[ i ] = data;
					} );

					if ( this.options.edit && this.currentEdit ) {
						items[ 0 ].el = this.currentEdit.wrap( '<div></div>' ).parent().html();
					}

					if ( isInternal ) {
						items.pop( 1 );
					}

					if ( self.options.onAdd && isInternal ) {
						if ( this.options.edit && this.currentEdit ) {
							self.options.onAdd( items[ 0 ], $.proxy( self.saveEdit, this ) );
						} else {
							self.options.onAdd( items[ 0 ], $.proxy( self.placeItems, this ) );
						}

					} else {
						if ( this.options.edit && this.currentEdit ) {
							self.saveEdit( items );
						} else {
							if ( index ) {
								self.placeItems( index, items );
							} else {
								self.placeItems( items, isInternal );
							}

						}

					}

				}
			},

			//First parameter is the index (1 based) to start removing items
			//Second parameter is the number of items to be removed
			removeItems: function( index, howMany ) {
				var self = this;
				var count;
				var $currentItem;

				if ( !index ) {
					this.$pillGroup.find( '.pill' ).remove();
					this._removePillTrigger( {
						method: 'removeAll'
					} );
				} else {
					howMany = howMany ? howMany : 1;

					for ( count = 0; count < howMany; count++ ) {
						$currentItem = self.$pillGroup.find( '> .pill:nth-child(' + index + ')' );

						if ( $currentItem ) {
							$currentItem.remove();
						} else {
							break;
						}

					}
				}
			},

			//First parameter is index (optional)
			//Second parameter is new arguments
			placeItems: function() {
				var $newHtml = [];
				var items;
				var index;
				var $neighbor;
				var isInternal;

				if ( isFinite( String( arguments[ 0 ] ) ) && !( arguments[ 0 ] instanceof Array ) ) {
					items = [].slice.call( arguments ).slice( 1 );
					index = arguments[ 0 ];
				} else {
					items = [].slice.call( arguments ).slice( 0 );
					isInternal = items[ 1 ] && !items[ 1 ].text;
				}

				if ( items[ 0 ] instanceof Array ) {
					items = items[ 0 ];
				}

				if ( items.length ) {
					$.each( items, function( i, item ) {
						var $item = $( item.el );
						var $neighbor;

						$item.attr( 'data-value', item.value );
						$item.find( 'span:first' ).html( item.text );

						// DOM attributes
						if ( item.attr ) {
							$.each( item.attr, function( key, value ) {
								if ( key === 'cssClass' || key === 'class' ) {
									$item.addClass( value );
								} else {
									$item.attr( key, value );
								}
							} );

						}

						if ( item.data ) {
							$item.data( 'data', item.data );
						}

						$newHtml.push( $item );
					} );

					if ( this.$pillGroup.children( '.pill' ).length > 0 ) {
						if ( index ) {
							$neighbor = this.$pillGroup.find( '.pill:nth-child(' + index + ')' );

							if ( $neighbor.length ) {
								$neighbor.before( $newHtml );
							} else {
								this.$pillGroup.children( '.pill:last' ).after( $newHtml );
							}

						} else {
							this.$pillGroup.children( '.pill:last' ).after( $newHtml );
						}

					} else {
						this.$pillGroup.prepend( $newHtml );
					}

					if ( isInternal ) {
						this.$element.trigger( 'added.fu.pillbox', {
							text: items[ 0 ].text,
							value: items[ 0 ].value
						} );
					}

				}
			},

			inputEvent: function( e ) {
				var self = this;
				var text = this.$addItem.val();
				var value;
				var attr;
				var $lastItem;
				var $selection;

				if ( this.acceptKeyCodes[ e.keyCode ] ) {
					if ( this.options.onKeyDown && this._isSuggestionsOpen() ) {
						$selection = this.$suggest.find( '.pillbox-suggest-sel' );

						if ( $selection.length ) {
							text = $selection.html();
							value = $selection.data( 'value' );
							attr = $selection.data( 'attr' );
						}

					}

					//ignore comma and make sure text that has been entered (protects against " ,". https://github.com/ExactTarget/fuelux/issues/593), unless allowEmptyPills is true.
					if ( text.replace( /[ ]*\,[ ]*/, '' ).match( /\S/ ) || ( this.options.allowEmptyPills && text.length ) ) {
						this._closeSuggestions();
						this.$addItem.hide();

						if ( attr ) {
							this.addItems( {
								text: text,
								value: value,
								attr: JSON.parse( attr )
							}, true );
						} else {
							this.addItems( {
								text: text,
								value: value
							}, true );
						}

						setTimeout( function() {
							self.$addItem.show().val( '' ).attr( {
								size: 10
							} );
						}, 0 );
					}

					e.preventDefault();
					return true;
				} else if ( e.keyCode === 8 || e.keyCode === 46 ) {
					// backspace: 8
					// delete: 46

					if ( !text.length ) {
						e.preventDefault();

						if ( this.options.edit && this.currentEdit ) {
							this.cancelEdit();
							return true;
						}

						this._closeSuggestions();
						$lastItem = this.$pillGroup.children( '.pill:last' );

						if ( $lastItem.hasClass( 'pillbox-highlight' ) ) {
							this._removeElement( this.getItemData( $lastItem, {
								el: $lastItem
							} ) );
						} else {
							$lastItem.addClass( 'pillbox-highlight' );
						}

						return true;
					}

				} else if ( text.length > 10 ) {
					if ( this.$addItem.width() < ( this.$pillGroup.width() - 6 ) ) {
						this.$addItem.attr( {
							size: text.length + 3
						} );
					}

				}

				this.$pillGroup.find( '.pill' ).removeClass( 'pillbox-highlight' );

				if ( this.options.onKeyDown ) {
					if ( e.keyCode === 9 || e.keyCode === 38 || e.keyCode === 40 ) {
						// tab: 9
						// up arrow: 38
						// down arrow: 40

						if ( this._isSuggestionsOpen() ) {
							this._keySuggestions( e );
						}

						return true;
					}

					//only allowing most recent event callback to register
					this.callbackId = e.timeStamp;
					this.options.onKeyDown( {
						event: e,
						value: text
					}, function( data ) {
						self._openSuggestions( e, data );
					} );
				}
			},

			openEdit: function( el ) {
				var index = el.index() + 1;
				var $addItemWrap = this.$addItemWrap.detach().hide();

				this.$pillGroup.find( '.pill:nth-child(' + index + ')' ).before( $addItemWrap );
				this.currentEdit = el.detach();

				$addItemWrap.addClass( 'editing' );
				this.$addItem.val( el.find( 'span:first' ).html() );
				$addItemWrap.show();
				this.$addItem.focus().select();
			},

			cancelEdit: function( e ) {
				var $addItemWrap;
				if ( !this.currentEdit ) {
					return false;
				}

				this._closeSuggestions();
				if ( e ) {
					this.$addItemWrap.before( this.currentEdit );
				}

				this.currentEdit = false;

				$addItemWrap = this.$addItemWrap.detach();
				$addItemWrap.removeClass( 'editing' );
				this.$addItem.val( '' );
				this.$pillGroup.append( $addItemWrap );
			},

			//Must match syntax of placeItem so addItem callback is called when an item is edited
			//expecting to receive an array back from the callback containing edited items
			saveEdit: function() {
				var item = arguments[ 0 ][ 0 ] ? arguments[ 0 ][ 0 ] : arguments[ 0 ];

				this.currentEdit = $( item.el );
				this.currentEdit.data( 'value', item.value );
				this.currentEdit.find( 'span:first' ).html( item.text );

				this.$addItemWrap.hide();
				this.$addItemWrap.before( this.currentEdit );
				this.currentEdit = false;

				this.$addItem.val( '' );
				this.$addItemWrap.removeClass( 'editing' );
				this.$pillGroup.append( this.$addItemWrap.detach().show() );
				this.$element.trigger( 'edited.fu.pillbox', {
					value: item.value,
					text: item.text
				} );
			},

			removeBySelector: function() {
				var selectors = [].slice.call( arguments ).slice( 0 );
				var self = this;

				$.each( selectors, function( i, sel ) {
					self.$pillGroup.find( sel ).remove();
				} );

				this._removePillTrigger( {
					method: 'removeBySelector',
					removedSelectors: selectors
				} );
			},

			removeByValue: function() {
				var values = [].slice.call( arguments ).slice( 0 );
				var self = this;

				$.each( values, function( i, val ) {
					self.$pillGroup.find( '> .pill[data-value="' + val + '"]' ).remove();
				} );

				this._removePillTrigger( {
					method: 'removeByValue',
					removedValues: values
				} );
			},

			removeByText: function() {
				var text = [].slice.call( arguments ).slice( 0 );
				var self = this;

				$.each( text, function( i, text ) {
					self.$pillGroup.find( '> .pill:contains("' + text + '")' ).remove();
				} );

				this._removePillTrigger( {
					method: 'removeByText',
					removedText: text
				} );
			},

			truncate: function( enable ) {
				var self = this;
				var available, full, i, pills, used;

				this.$element.removeClass( 'truncate' );
				this.$addItemWrap.removeClass( 'truncated' );
				this.$pillGroup.find( '.pill' ).removeClass( 'truncated' );

				if ( enable ) {
					this.$element.addClass( 'truncate' );

					available = this.$element.width();
					full = false;
					i = 0;
					pills = this.$pillGroup.find( '.pill' ).length;
					used = 0;

					this.$pillGroup.find( '.pill' ).each( function() {
						var pill = $( this );
						if ( !full ) {
							i++;
							self.$moreCount.text( pills - i );
							if ( ( used + pill.outerWidth( true ) + self.$addItemWrap.outerWidth( true ) ) <= available ) {
								used += pill.outerWidth( true );
							} else {
								self.$moreCount.text( ( pills - i ) + 1 );
								pill.addClass( 'truncated' );
								full = true;
							}

						} else {
							pill.addClass( 'truncated' );
						}
					} );
					if ( i === pills ) {
						this.$addItemWrap.addClass( 'truncated' );
					}

				}
			},

			inputFocus: function( e ) {
				this.$element.find( '.pillbox-add-item' ).focus();
			},

			getItemData: function( el, data ) {
				return $.extend( {
					text: el.find( 'span:first' ).html()
				}, el.data(), data );
			},

			_removeElement: function( data ) {
				data.el.remove();
				delete data.el;
				this.$element.trigger( 'removed.fu.pillbox', data );
			},

			_removePillTrigger: function( removedBy ) {
				this.$element.trigger( 'removed.fu.pillbox', removedBy );
			},

			_generateObject: function( data ) {
				var obj = {};

				$.each( data, function( index, value ) {
					obj[ value ] = true;
				} );

				return obj;
			},

			_openSuggestions: function( e, data ) {
				var markup = '';
				var $suggestionList = $( '<ul>' );

				if ( this.callbackId !== e.timeStamp ) {
					return false;
				}

				if ( data.data && data.data.length ) {
					$.each( data.data, function( index, value ) {
						var val = value.value ? value.value : value.text;

						// markup concatentation is 10x faster, but does not allow data store
						var $suggestion = $( '<li data-value="' + val + '">' + value.text + '</li>' );

						if ( value.attr ) {
							$suggestion.data( 'attr', JSON.stringify( value.attr ) );
						}

						if ( value.data ) {
							$suggestion.data( 'data', value.data );
						}

						$suggestionList.append( $suggestion );
					} );

					// suggestion dropdown
					this.$suggest.html( '' ).append( $suggestionList.children() );
					$( document.body ).trigger( 'suggested.fu.pillbox', this.$suggest );
				}
			},

			_closeSuggestions: function() {
				this.$suggest.html( '' ).parent().removeClass( 'open' );
			},

			_isSuggestionsOpen: function() {
				return this.$suggest.parent().hasClass( 'open' );
			},

			_keySuggestions: function( e ) {
				var $first = this.$suggest.find( 'li.pillbox-suggest-sel' );
				var dir = e.keyCode === 38; // up arrow
				var $next, val;

				e.preventDefault();

				if ( !$first.length ) {
					$first = this.$suggest.find( 'li:first' );
					$first.addClass( 'pillbox-suggest-sel' );
				} else {
					$next = dir ? $first.prev() : $first.next();

					if ( !$next.length ) {
						$next = dir ? this.$suggest.find( 'li:last' ) : this.$suggest.find( 'li:first' );
					}

					if ( $next ) {
						$next.addClass( 'pillbox-suggest-sel' );
						$first.removeClass( 'pillbox-suggest-sel' );
					}

				}
			}
		};

		// PILLBOX PLUGIN DEFINITION

		$.fn.pillbox = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.pillbox' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.pillbox', ( data = new Pillbox( this, options ) ) );
				}

				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.pillbox.defaults = {
			onAdd: undefined,
			onRemove: undefined,
			onKeyDown: undefined,
			edit: false,
			readonly: -1, //can be true or false. -1 means it will check for data-readonly="readonly"
			truncate: false,
			acceptKeyCodes: [
				13, //Enter
				188 //Comma
			],
			allowEmptyPills: false

			//example on remove
			/*onRemove: function(data,callback){
				console.log('onRemove');
				callback(data);
			}*/

			//example on key down
			/*onKeyDown: function(event, data, callback ){
				callback({data:[
					{text: Math.random(),value:'sdfsdfsdf'},
					{text: Math.random(),value:'sdfsdfsdf'}
				]});
			}
			*/
			//example onAdd
			/*onAdd: function( data, callback ){
				console.log(data, callback);
				callback(data);
			}*/
		};

		$.fn.pillbox.Constructor = Pillbox;

		$.fn.pillbox.noConflict = function() {
			$.fn.pillbox = old;
			return this;
		};


		// DATA-API

		$( document ).on( 'mousedown.fu.pillbox.data-api', '[data-initialize=pillbox]', function( e ) {
			var $control = $( e.target ).closest( '.pillbox' );
			if ( !$control.data( 'fu.pillbox' ) ) {
				$control.pillbox( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=pillbox]' ).each( function() {
				var $this = $( this );
				if ( $this.data( 'fu.pillbox' ) ) return;
				$this.pillbox( $this.data() );
			} );
		} );



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Repeater
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.repeater;

		// REPEATER CONSTRUCTOR AND PROTOTYPE

		var Repeater = function( element, options ) {
			var self = this;
			var $btn, currentView;

			this.$element = $( element );

			this.$canvas = this.$element.find( '.repeater-canvas' );
			this.$count = this.$element.find( '.repeater-count' );
			this.$end = this.$element.find( '.repeater-end' );
			this.$filters = this.$element.find( '.repeater-filters' );
			this.$loader = this.$element.find( '.repeater-loader' );
			this.$pageSize = this.$element.find( '.repeater-itemization .selectlist' );
			this.$nextBtn = this.$element.find( '.repeater-next' );
			this.$pages = this.$element.find( '.repeater-pages' );
			this.$prevBtn = this.$element.find( '.repeater-prev' );
			this.$primaryPaging = this.$element.find( '.repeater-primaryPaging' );
			this.$search = this.$element.find( '.repeater-search' ).find( '.search' );
			this.$secondaryPaging = this.$element.find( '.repeater-secondaryPaging' );
			this.$start = this.$element.find( '.repeater-start' );
			this.$viewport = this.$element.find( '.repeater-viewport' );
			this.$views = this.$element.find( '.repeater-views' );

			this.currentPage = 0;
			this.currentView = null;
			this.infiniteScrollingCallback = function() {};
			this.infiniteScrollingCont = null;
			this.infiniteScrollingEnabled = false;
			this.infiniteScrollingEnd = null;
			this.infiniteScrollingOptions = {};
			this.lastPageInput = 0;
			this.options = $.extend( {}, $.fn.repeater.defaults, options );
			this.pageIncrement = 0; // store direction navigated
			this.resizeTimeout = {};
			this.stamp = new Date().getTime() + ( Math.floor( Math.random() * 100 ) + 1 );
			this.storedDataSourceOpts = null;
			this.viewOptions = {};
			this.viewType = null;

			this.$filters.selectlist();
			this.$pageSize.selectlist();
			this.$primaryPaging.find( '.combobox' ).combobox();
			this.$search.search();

			this.$filters.on( 'changed.fu.selectlist', function( e, value ) {
				self.$element.trigger( 'filtered.fu.repeater', value );
				self.render( {
					clearInfinite: true,
					pageIncrement: null
				} );
			} );
			this.$nextBtn.on( 'click.fu.repeater', $.proxy( this.next, this ) );
			this.$pageSize.on( 'changed.fu.selectlist', function( e, value ) {
				self.$element.trigger( 'pageSizeChanged.fu.repeater', value );
				self.render( {
					pageIncrement: null
				} );
			} );
			this.$prevBtn.on( 'click.fu.repeater', $.proxy( this.previous, this ) );
			this.$primaryPaging.find( '.combobox' ).on( 'changed.fu.combobox', function( evt, data ) {
				self.$element.trigger( 'pageChanged.fu.repeater', [ data.text, data ] );
				self.pageInputChange( data.text );
			} );
			this.$search.on( 'searched.fu.search cleared.fu.search', function( e, value ) {
				self.$element.trigger( 'searchChanged.fu.repeater', value );
				self.render( {
					clearInfinite: true,
					pageIncrement: null
				} );
			} );
			this.$secondaryPaging.on( 'blur.fu.repeater', function( e ) {
				self.pageInputChange( self.$secondaryPaging.val() );
			} );
			this.$secondaryPaging.on( 'keyup', function( e ) {
				if ( e.keyCode === 13 ) {
					self.pageInputChange( self.$secondaryPaging.val() );
				}
			} );
			this.$views.find( 'input' ).on( 'change.fu.repeater', $.proxy( this.viewChanged, this ) );

			// ID needed since event is bound to instance
			$( window ).on( 'resize.fu.repeater.' + this.stamp, function( event ) {
				clearTimeout( self.resizeTimeout );
				self.resizeTimeout = setTimeout( function() {
					self.resize();
					self.$element.trigger( 'resized.fu.repeater' );
				}, 75 );
			} );

			this.$loader.loader();
			this.$loader.loader( 'pause' );
			if ( this.options.defaultView !== -1 ) {
				currentView = this.options.defaultView;
			} else {
				$btn = this.$views.find( 'label.active input' );
				currentView = ( $btn.length > 0 ) ? $btn.val() : 'list';
			}

			this.setViewOptions( currentView );

			this.initViewTypes( function() {
				self.resize();
				self.$element.trigger( 'resized.fu.repeater' );
				self.render( {
					changeView: currentView
				} );
			} );
		};

		Repeater.prototype = {
			constructor: Repeater,

			clear: function( options ) {
				var viewChanged, viewTypeObj;

				function scan( cont ) {
					var keep = [];
					cont.children().each( function() {
						var item = $( this );
						var pres = item.attr( 'data-preserve' );
						if ( pres === 'deep' ) {
							item.detach();
							keep.push( item );
						} else if ( pres === 'shallow' ) {
							scan( item );
							item.detach();
							keep.push( item );
						}
					} );
					cont.empty();
					cont.append( keep );
				}

				options = options || {};

				if ( !options.preserve ) {
					//Just trash everything because preserve is false
					this.$canvas.empty();
				} else if ( !this.infiniteScrollingEnabled || options.clearInfinite ) {
					//Preserve clear only if infiniteScrolling is disabled or if specifically told to do so
					scan( this.$canvas );
				} //Otherwise don't clear because infiniteScrolling is enabled

				//If viewChanged and current viewTypeObj has a cleared function, call it
				viewChanged = ( options.viewChanged !== undefined ) ? options.viewChanged : false;
				viewTypeObj = $.fn.repeater.viewTypes[ this.viewType ] || {};
				if ( !viewChanged && viewTypeObj.cleared ) {
					viewTypeObj.cleared.call( this, {
						options: options
					} );
				}
			},

			clearPreservedDataSourceOptions: function() {
				this.storedDataSourceOpts = null;
			},

			destroy: function() {
				var markup;
				// set input value attrbute in markup
				this.$element.find( 'input' ).each( function() {
					$( this ).attr( 'value', $( this ).val() );
				} );

				// empty elements to return to original markup
				this.$canvas.empty();
				markup = this.$element[ 0 ].outerHTML;

				// destroy components and remove leftover
				this.$element.find( '.combobox' ).combobox( 'destroy' );
				this.$element.find( '.selectlist' ).selectlist( 'destroy' );
				this.$element.find( '.search' ).search( 'destroy' );
				if ( this.infiniteScrollingEnabled ) {
					$( this.infiniteScrollingCont ).infinitescroll( 'destroy' );
				}

				this.$element.remove();

				// any external events
				$( window ).off( 'resize.fu.repeater.' + this.stamp );

				return markup;
			},

			getDataOptions: function( options ) {
				var dataSourceOptions = {};
				var opts = {};
				var val, viewDataOpts;

				options = options || {};

				opts.filter = ( this.$filters.length > 0 ) ? this.$filters.selectlist( 'selectedItem' ) : {
					text: 'All',
					value: 'all'
				};
				opts.view = this.currentView;

				if ( !this.infiniteScrollingEnabled ) {
					opts.pageSize = ( this.$pageSize.length > 0 ) ? parseInt( this.$pageSize.selectlist( 'selectedItem' ).value, 10 ) : 25;
				}

				if ( options.pageIncrement !== undefined ) {
					if ( options.pageIncrement === null ) {
						this.currentPage = 0;
					} else {
						this.currentPage += options.pageIncrement;
					}

				}

				opts.pageIndex = this.currentPage;

				val = ( this.$search.length > 0 ) ? this.$search.find( 'input' ).val() : '';
				if ( val !== '' ) {
					opts.search = val;
				}

				if ( options.dataSourceOptions ) {
					dataSourceOptions = options.dataSourceOptions;
					if ( options.preserveDataSourceOptions ) {
						this.storedDataSourceOpts = ( this.storedDataSourceOpts ) ? $.extend( this.storedDataSourceOpts, dataSourceOptions ) : dataSourceOptions;
					}
				}

				if ( this.storedDataSourceOpts ) {
					dataSourceOptions = $.extend( this.storedDataSourceOpts, dataSourceOptions );
				}

				viewDataOpts = $.fn.repeater.viewTypes[ this.viewType ] || {};
				viewDataOpts = viewDataOpts.dataOptions;
				if ( viewDataOpts ) {
					viewDataOpts = viewDataOpts.call( this, opts );
					opts = $.extend( viewDataOpts, dataSourceOptions );
				} else {
					opts = $.extend( opts, dataSourceOptions );
				}

				return opts;
			},

			infiniteScrolling: function( enable, options ) {
				var itemization = this.$element.find( '.repeater-itemization' );
				var pagination = this.$element.find( '.repeater-pagination' );
				var cont, data;

				options = options || {};

				if ( enable ) {
					this.infiniteScrollingEnabled = true;
					this.infiniteScrollingEnd = options.end;
					delete options.dataSource;
					delete options.end;
					this.infiniteScrollingOptions = options;
					itemization.hide();
					pagination.hide();
				} else {
					cont = this.infiniteScrollingCont;
					data = cont.data();
					delete data.infinitescroll;
					cont.off( 'scroll' );
					cont.removeClass( 'infinitescroll' );

					this.infiniteScrollingCont = null;
					this.infiniteScrollingEnabled = false;
					this.infiniteScrollingEnd = null;
					this.infiniteScrollingOptions = {};
					itemization.show();
					pagination.show();
				}
			},

			infiniteScrollPaging: function( data, options ) {
				var end = ( this.infiniteScrollingEnd !== true ) ? this.infiniteScrollingEnd : undefined;
				var page = data.page;
				var pages = data.pages;

				this.currentPage = ( page !== undefined ) ? page : NaN;

				if ( ( this.currentPage + 1 ) >= pages ) {
					this.infiniteScrollingCont.infinitescroll( 'end', end );
				}
			},

			initInfiniteScrolling: function() {
				var cont = this.$canvas.find( '[data-infinite="true"]:first' );
				var opts, self;

				cont = ( cont.length < 1 ) ? this.$canvas : cont;
				if ( cont.data( 'fu.infinitescroll' ) ) {
					cont.infinitescroll( 'enable' );
				} else {
					self = this;
					opts = $.extend( {}, this.infiniteScrollingOptions );
					opts.dataSource = function( helpers, callback ) {
						self.infiniteScrollingCallback = callback;
						self.render( {
							pageIncrement: 1
						} );
					};
					cont.infinitescroll( opts );
					this.infiniteScrollingCont = cont;
				}
			},

			initViewTypes: function( callback ) {
				var self = this;
				var viewTypes = [];
				var i, viewTypesLength;

				function init( index ) {
					function next() {
						index++;
						if ( index < viewTypesLength ) {
							init( index );
						} else {
							callback();
						}
					}

					if ( viewTypes[ index ].initialize ) {
						viewTypes[ index ].initialize.call( self, {}, function() {
							next();
						} );
					} else {
						next();
					}
				}

				for ( i in $.fn.repeater.viewTypes ) {
					viewTypes.push( $.fn.repeater.viewTypes[ i ] );
				}
				viewTypesLength = viewTypes.length;
				if ( viewTypesLength > 0 ) {
					init( 0 );
				} else {
					callback();
				}
			},

			itemization: function( data ) {
				this.$count.html( ( data.count !== undefined ) ? data.count : '?' );
				this.$end.html( ( data.end !== undefined ) ? data.end : '?' );
				this.$start.html( ( data.start !== undefined ) ? data.start : '?' );
			},

			next: function( e ) {
				var d = 'disabled';
				this.$nextBtn.attr( d, d );
				this.$prevBtn.attr( d, d );
				this.pageIncrement = 1;
				this.$element.trigger( 'nextClicked.fu.repeater' );
				this.render( {
					pageIncrement: this.pageIncrement
				} );
			},

			pageInputChange: function( val ) {
				var pageInc;
				if ( val !== this.lastPageInput ) {
					this.lastPageInput = val;
					val = parseInt( val, 10 ) - 1;
					pageInc = val - this.currentPage;
					this.$element.trigger( 'pageChanged.fu.repeater', val );
					this.render( {
						pageIncrement: pageInc
					} );
				}
			},

			pagination: function( data ) {
				var act = 'active';
				var dsbl = 'disabled';
				var page = data.page;
				var pages = data.pages;
				var dropMenu, i, l;

				this.currentPage = ( page !== undefined ) ? page : NaN;

				this.$primaryPaging.removeClass( act );
				this.$secondaryPaging.removeClass( act );

				if ( pages <= this.viewOptions.dropPagingCap ) {
					this.$primaryPaging.addClass( act );
					dropMenu = this.$primaryPaging.find( '.dropdown-menu' );
					dropMenu.empty();
					for ( i = 0; i < pages; i++ ) {
						l = i + 1;
						dropMenu.append( '<li data-value="' + l + '"><a href="#">' + l + '</a></li>' );
					}
					this.$primaryPaging.find( 'input.form-control' ).val( this.currentPage + 1 );
				} else {
					this.$secondaryPaging.addClass( act );
					this.$secondaryPaging.val( this.currentPage + 1 );
				}

				this.lastPageInput = this.currentPage + 1 + '';

				this.$pages.html( pages );

				// this is not the last page
				if ( ( this.currentPage + 1 ) < pages ) {
					this.$nextBtn.removeAttr( dsbl );
				} else {
					this.$nextBtn.attr( dsbl, dsbl );
				}

				// this is not the first page
				if ( ( this.currentPage - 1 ) >= 0 ) {
					this.$prevBtn.removeAttr( dsbl );
				} else {
					this.$prevBtn.attr( dsbl, dsbl );
				}

				// return focus to next/previous buttons after navigating
				if ( this.pageIncrement !== 0 ) {
					if ( this.pageIncrement > 0 ) {
						if ( this.$nextBtn.is( ':disabled' ) ) {
							// if you can't focus, go the other way
							this.$prevBtn.focus();
						} else {
							this.$nextBtn.focus();
						}

					} else {
						if ( this.$prevBtn.is( ':disabled' ) ) {
							// if you can't focus, go the other way
							this.$nextBtn.focus();
						} else {
							this.$prevBtn.focus();
						}

					}

				}
			},

			previous: function() {
				var d = 'disabled';
				this.$nextBtn.attr( d, d );
				this.$prevBtn.attr( d, d );
				this.pageIncrement = -1;
				this.$element.trigger( 'previousClicked.fu.repeater' );
				this.render( {
					pageIncrement: this.pageIncrement
				} );
			},

			render: function( options ) {
				var self = this;
				var viewChanged = false;
				var viewTypeObj = $.fn.repeater.viewTypes[ this.viewType ] || {};
				var dataOptions, prevView;

				options = options || {};

				if ( options.changeView && ( this.currentView !== options.changeView ) ) {
					prevView = this.currentView;
					this.currentView = options.changeView;
					this.viewType = this.currentView.split( '.' )[ 0 ];
					this.setViewOptions( this.currentView );
					this.$element.attr( 'data-currentview', this.currentView );
					this.$element.attr( 'data-viewtype', this.viewType );
					viewChanged = true;
					options.viewChanged = viewChanged;

					this.$element.trigger( 'viewChanged.fu.repeater', this.currentView );

					if ( this.infiniteScrollingEnabled ) {
						self.infiniteScrolling( false );
					}

					viewTypeObj = $.fn.repeater.viewTypes[ this.viewType ] || {};
					if ( viewTypeObj.selected ) {
						viewTypeObj.selected.call( this, {
							prevView: prevView
						} );
					}
				}

				options.preserve = ( options.preserve !== undefined ) ? options.preserve : !viewChanged;
				this.clear( options );

				if ( !this.infiniteScrollingEnabled || ( this.infiniteScrollingEnabled && viewChanged ) ) {
					this.$loader.show().loader( 'play' );
				}

				dataOptions = this.getDataOptions( options );

				this.viewOptions.dataSource( dataOptions, function( data ) {
					data = data || {};

					if ( self.infiniteScrollingEnabled ) {
						self.infiniteScrollingCallback( {} );
					} else {
						self.itemization( data );
						self.pagination( data );
					}

					self.runRenderer( viewTypeObj, data, function() {
						if ( self.infiniteScrollingEnabled ) {
							if ( viewChanged || options.clearInfinite ) {
								self.initInfiniteScrolling();
							}

							self.infiniteScrollPaging( data, options );
						}

						self.$loader.hide().loader( 'pause' );
						self.$element.trigger( 'rendered.fu.repeater', {
							data: data,
							options: dataOptions,
							renderOptions: options
						} );

						//for maintaining support of 'loaded' event
						self.$element.trigger( 'loaded.fu.repeater', dataOptions );
					} );
				} );
			},

			resize: function() {
				var staticHeight = ( this.viewOptions.staticHeight === -1 ) ? this.$element.attr( 'data-staticheight' ) : this.viewOptions.staticHeight;
				var viewTypeObj = {};
				var height, viewportMargins;

				if ( this.viewType ) {
					viewTypeObj = $.fn.repeater.viewTypes[ this.viewType ] || {};
				}

				if ( staticHeight !== undefined && staticHeight !== false && staticHeight !== 'false' ) {
					this.$canvas.addClass( 'scrolling' );
					viewportMargins = {
						bottom: this.$viewport.css( 'margin-bottom' ),
						top: this.$viewport.css( 'margin-top' )
					};
					height = ( ( staticHeight === 'true' || staticHeight === true ) ? this.$element.height() : parseInt( staticHeight, 10 ) ) -
						this.$element.find( '.repeater-header' ).outerHeight() -
						this.$element.find( '.repeater-footer' ).outerHeight() -
						( ( viewportMargins.bottom === 'auto' ) ? 0 : parseInt( viewportMargins.bottom, 10 ) ) -
						( ( viewportMargins.top === 'auto' ) ? 0 : parseInt( viewportMargins.top, 10 ) );
					this.$viewport.outerHeight( height );
				} else {
					this.$canvas.removeClass( 'scrolling' );
				}

				if ( viewTypeObj.resize ) {
					viewTypeObj.resize.call( this, {
						height: this.$element.outerHeight(),
						width: this.$element.outerWidth()
					} );
				}
			},

			runRenderer: function( viewTypeObj, data, callback ) {
				var $container, i, l, response, repeat, subset;

				function addItem( $parent, resp ) {
					var action;
					if ( resp ) {
						action = ( resp.action ) ? resp.action : 'append';
						if ( action !== 'none' && resp.item !== undefined ) {
							$parent = ( resp.container !== undefined ) ? $( resp.container ) : $parent;
							$parent[ action ]( resp.item );
						}
					}
				}

				if ( !viewTypeObj.render ) {
					if ( viewTypeObj.before ) {
						response = viewTypeObj.before.call( this, {
							container: this.$canvas,
							data: data
						} );
						addItem( this.$canvas, response );
					}

					$container = this.$canvas.find( '[data-container="true"]:last' );
					$container = ( $container.length > 0 ) ? $container : this.$canvas;

					if ( viewTypeObj.renderItem ) {
						repeat = viewTypeObj.repeat || 'data.items';
						repeat = repeat.split( '.' );
						if ( repeat[ 0 ] === 'data' || repeat[ 0 ] === 'this' ) {
							subset = ( repeat[ 0 ] === 'this' ) ? this : data;
							repeat.shift();
						} else {
							repeat = [];
							subset = [];
							if ( window.console && window.console.warn ) {
								window.console.warn( 'WARNING: Repeater plugin "repeat" value must start with either "data" or "this"' );
							}
						}

						for ( i = 0, l = repeat.length; i < l; i++ ) {
							if ( subset[ repeat[ i ] ] !== undefined ) {
								subset = subset[ repeat[ i ] ];
							} else {
								subset = [];
								if ( window.console && window.console.warn ) {
									window.console.warn( 'WARNING: Repeater unable to find property to iterate renderItem on.' );
								}
								break;
							}
						}

						for ( i = 0, l = subset.length; i < l; i++ ) {
							response = viewTypeObj.renderItem.call( this, {
								container: $container,
								data: data,
								index: i,
								subset: subset
							} );
							addItem( $container, response );
						}
					}

					if ( viewTypeObj.after ) {
						response = viewTypeObj.after.call( this, {
							container: this.$canvas,
							data: data
						} );
						addItem( this.$canvas, response );
					}

					callback();
				} else {
					viewTypeObj.render.call( this, {
						container: this.$canvas,
						data: data
					}, function() {
						callback();
					} );
				}

			},

			setViewOptions: function( curView ) {
				var opts = {};
				var viewName = curView.split( '.' )[ 1 ];

				if ( viewName && this.options.views ) {
					opts = this.options.views[ viewName ] || this.options.views[ curView ] || {};
				} else {
					opts = {};
				}

				this.viewOptions = $.extend( {}, this.options, opts );
			},

			viewChanged: function( e ) {
				var $selected = $( e.target );
				var val = $selected.val();
				this.render( {
					changeView: val,
					pageIncrement: null
				} );
			}
		};

		// REPEATER PLUGIN DEFINITION

		$.fn.repeater = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.repeater' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.repeater', ( data = new Repeater( this, options ) ) );
				}

				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.repeater.defaults = {
			dataSource: function( options, callback ) {
				callback( {
					count: 0,
					end: 0,
					items: [],
					page: 0,
					pages: 1,
					start: 0
				} );
			},
			defaultView: -1, //should be a string value. -1 means it will grab the active view from the view controls
			dropPagingCap: 10,
			staticHeight: -1, //normally true or false. -1 means it will look for data-staticheight on the element
			views: null //can be set to an object to configure multiple views of the same type
		};

		$.fn.repeater.viewTypes = {};

		$.fn.repeater.Constructor = Repeater;

		$.fn.repeater.noConflict = function() {
			$.fn.repeater = old;
			return this;
		};



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Repeater - List View Plugin
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		if ( $.fn.repeater ) {
			//ADDITIONAL METHODS
			$.fn.repeater.Constructor.prototype.list_clearSelectedItems = function() {
				this.$canvas.find( '.repeater-list-check' ).remove();
				this.$canvas.find( '.repeater-list table tbody tr.selected' ).removeClass( 'selected' );
			};

			$.fn.repeater.Constructor.prototype.list_highlightColumn = function( index, force ) {
				var tbody = this.$canvas.find( '.repeater-list tbody' );
				if ( this.viewOptions.list_highlightSortedColumn || force ) {
					tbody.find( 'td.sorted' ).removeClass( 'sorted' );
					tbody.find( 'tr' ).each( function() {
						var col = $( this ).find( 'td:nth-child(' + ( index + 1 ) + ')' );
						col.addClass( 'sorted' );
					} );
				}
			};

			$.fn.repeater.Constructor.prototype.list_getSelectedItems = function() {
				var selected = [];
				this.$canvas.find( '.repeater-list table tbody tr.selected' ).each( function() {
					var $item = $( this );
					selected.push( {
						data: $item.data( 'item_data' ),
						element: $item
					} );
				} );
				return selected;
			};

			$.fn.repeater.Constructor.prototype.list_positionHeadings = function() {
				var $wrapper = this.$element.find( '.repeater-list-wrapper' );
				var offsetLeft = $wrapper.offset().left;
				var scrollLeft = $wrapper.scrollLeft();
				if ( scrollLeft > 0 ) {
					$wrapper.find( '.repeater-list-heading' ).each( function() {
						var $heading = $( this );
						var left = ( $heading.parents( 'th:first' ).offset().left - offsetLeft ) + 'px';
						$heading.addClass( 'shifted' ).css( 'left', left );
					} );
				} else {
					$wrapper.find( '.repeater-list-heading' ).each( function() {
						$( this ).removeClass( 'shifted' ).css( 'left', '' );
					} );
				}
			};

			$.fn.repeater.Constructor.prototype.list_setSelectedItems = function( items, force ) {
				var selectable = this.viewOptions.list_selectable;
				var self = this;
				var data, i, $item, l;

				//this function is necessary because lint yells when a function is in a loop
				function checkIfItemMatchesValue() {
					$item = $( this );
					data = $item.data( 'item_data' ) || {};
					if ( data[ items[ i ].property ] === items[ i ].value ) {
						selectItem( $item, items[ i ].selected );
					}
				}

				function selectItem( $itm, select ) {
					select = ( select !== undefined ) ? select : true;
					if ( select ) {
						if ( !force && selectable !== 'multi' ) {
							self.list_clearSelectedItems();
						}

						if ( !$itm.hasClass( 'selected' ) ) {
							$itm.addClass( 'selected' );
							$itm.find( 'td:first' ).prepend( '<div class="repeater-list-check"><span class="glyphicon glyphicon-ok"></span></div>' );
						}

					} else {
						$itm.find( '.repeater-list-check' ).remove();
						$itm.removeClass( 'selected' );
					}
				}

				if ( !$.isArray( items ) ) {
					items = [ items ];
				}

				if ( force === true || selectable === 'multi' ) {
					l = items.length;
				} else if ( selectable ) {
					l = ( items.length > 0 ) ? 1 : 0;
				} else {
					l = 0;
				}

				for ( i = 0; i < l; i++ ) {
					if ( items[ i ].index !== undefined ) {
						$item = this.$canvas.find( '.repeater-list table tbody tr:nth-child(' + ( items[ i ].index + 1 ) + ')' );
						if ( $item.length > 0 ) {
							selectItem( $item, items[ i ].selected );
						}

					} else if ( items[ i ].property !== undefined && items[ i ].value !== undefined ) {
						this.$canvas.find( '.repeater-list table tbody tr' ).each( checkIfItemMatchesValue );
					}

				}
			};

			$.fn.repeater.Constructor.prototype.list_sizeHeadings = function() {
				var $table = this.$element.find( '.repeater-list table' );
				$table.find( 'thead th' ).each( function() {
					var $hr = $( this );
					var $heading = $hr.find( '.repeater-list-heading' );
					$heading.outerHeight( $hr.outerHeight() );
					$heading.outerWidth( $hr.outerWidth() );
				} );
			};

			//ADDITIONAL DEFAULT OPTIONS
			$.fn.repeater.defaults = $.extend( {}, $.fn.repeater.defaults, {
				list_columnRendered: null,
				list_columnSizing: true,
				list_columnSyncing: true,
				list_highlightSortedColumn: true,
				list_infiniteScroll: false,
				list_noItemsHTML: 'no items found',
				list_selectable: false,
				list_sortClearing: false,
				list_rowRendered: null
			} );

			//EXTENSION DEFINITION
			$.fn.repeater.viewTypes.list = {
				cleared: function() {
					if ( this.viewOptions.list_columnSyncing ) {
						this.list_sizeHeadings();
					}
				},
				dataOptions: function( options ) {
					if ( this.list_sortDirection ) {
						options.sortDirection = this.list_sortDirection;
					}
					if ( this.list_sortProperty ) {
						options.sortProperty = this.list_sortProperty;
					}
					return options;
				},
				initialize: function( helpers, callback ) {
					this.list_sortDirection = null;
					this.list_sortProperty = null;
					callback();
				},
				resize: function() {
					if ( this.viewOptions.list_columnSyncing ) {
						this.list_sizeHeadings();
					}
				},
				selected: function() {
					var infScroll = this.viewOptions.list_infiniteScroll;
					var opts;

					this.list_firstRender = true;
					this.$loader.addClass( 'noHeader' );

					if ( infScroll ) {
						opts = ( typeof infScroll === 'object' ) ? infScroll : {};
						this.infiniteScrolling( true, opts );
					}
				},
				before: function( helpers ) {
					var $listContainer = helpers.container.find( '.repeater-list' );
					var self = this;
					var $table;

					if ( $listContainer.length < 1 ) {
						$listContainer = $( '<div class="repeater-list" data-preserve="shallow"><div class="repeater-list-wrapper" data-infinite="true" data-preserve="shallow"><table aria-readonly="true" class="table" data-preserve="shallow" role="grid"></table></div></div>' );
						$listContainer.find( '.repeater-list-wrapper' ).on( 'scroll.fu.repeaterList', function() {
							if ( self.viewOptions.list_columnSyncing ) {
								self.list_positionHeadings();
							}
						} );
						helpers.container.append( $listContainer );
					}

					$table = $listContainer.find( 'table' );
					renderThead.call( this, $table, helpers.data );
					renderTbody.call( this, $table, helpers.data );

					return false;
				},
				renderItem: function( helpers ) {
					renderRow.call( this, helpers.container, helpers.subset, helpers.index );
					return false;
				},
				after: function() {
					var $sorted;

					if ( this.viewOptions.list_columnSyncing ) {
						this.list_sizeHeadings();
						this.list_positionHeadings();
					}

					$sorted = this.$canvas.find( '.repeater-list-heading.sorted' );
					if ( $sorted.length > 0 ) {
						this.list_highlightColumn( $sorted.data( 'fu_item_index' ) );
					}

					return false;
				}
			};
		}

		//ADDITIONAL METHODS
		function renderColumn( $row, rows, rowIndex, columns, columnIndex ) {
			var className = columns[ columnIndex ].className;
			var content = rows[ rowIndex ][ columns[ columnIndex ].property ];
			var $col = $( '<td></td>' );
			var width = columns[ columnIndex ]._auto_width;

			$col.addClass( ( ( className !== undefined ) ? className : '' ) ).append( content );
			if ( width !== undefined ) {
				$col.outerWidth( width );
			}
			$row.append( $col );

			if ( this.viewOptions.list_columnRendered ) {
				this.viewOptions.list_columnRendered( {
					container: $row,
					columnAttr: columns[ columnIndex ].property,
					item: $col,
					rowData: rows[ rowIndex ]
				}, function() {} );
			}
		}

		function renderHeader( $tr, columns, index ) {
			var chevDown = 'glyphicon-chevron-down';
			var chevron = '.glyphicon.rlc:first';
			var chevUp = 'glyphicon-chevron-up';
			var $div = $( '<div class="repeater-list-heading"><span class="glyphicon rlc"></span></div>' );
			var $header = $( '<th></th>' );
			var self = this;
			var $both, className, sortable, $span, $spans;

			$div.data( 'fu_item_index', index );
			$div.prepend( columns[ index ].label );
			$header.html( $div.html() ).find( '[id]' ).removeAttr( 'id' );
			$header.append( $div );

			$both = $header.add( $div );
			$span = $div.find( chevron );
			$spans = $span.add( $header.find( chevron ) );

			className = columns[ index ].className;
			if ( className !== undefined ) {
				$both.addClass( className );
			}

			sortable = columns[ index ].sortable;
			if ( sortable ) {
				$both.addClass( 'sortable' );
				$div.on( 'click.fu.repeaterList', function() {
					self.list_sortProperty = ( typeof sortable === 'string' ) ? sortable : columns[ index ].property;
					if ( $div.hasClass( 'sorted' ) ) {
						if ( $span.hasClass( chevUp ) ) {
							$spans.removeClass( chevUp ).addClass( chevDown );
							self.list_sortDirection = 'desc';
						} else {
							if ( !self.viewOptions.list_sortClearing ) {
								$spans.removeClass( chevDown ).addClass( chevUp );
								self.list_sortDirection = 'asc';
							} else {
								$both.removeClass( 'sorted' );
								$spans.removeClass( chevDown );
								self.list_sortDirection = null;
								self.list_sortProperty = null;
							}
						}

					} else {
						$tr.find( 'th, .repeater-list-heading' ).removeClass( 'sorted' );
						$spans.removeClass( chevDown ).addClass( chevUp );
						self.list_sortDirection = 'asc';
						$both.addClass( 'sorted' );
					}

					self.render( {
						clearInfinite: true,
						pageIncrement: null
					} );
				} );
			}

			if ( columns[ index ].sortDirection === 'asc' || columns[ index ].sortDirection === 'desc' ) {
				$tr.find( 'th, .repeater-list-heading' ).removeClass( 'sorted' );
				$both.addClass( 'sortable sorted' );
				if ( columns[ index ].sortDirection === 'asc' ) {
					$spans.addClass( chevUp );
					this.list_sortDirection = 'asc';
				} else {
					$spans.addClass( chevDown );
					this.list_sortDirection = 'desc';
				}

				this.list_sortProperty = ( typeof sortable === 'string' ) ? sortable : columns[ index ].property;
			}

			$tr.append( $header );
		}

		function renderRow( $tbody, rows, index ) {
			var $row = $( '<tr></tr>' );
			var self = this;
			var i, l;

			if ( this.viewOptions.list_selectable ) {
				$row.addClass( 'selectable' );
				$row.attr( 'tabindex', 0 ); // allow items to be tabbed to / focused on
				$row.data( 'item_data', rows[ index ] );
				$row.on( 'click.fu.repeaterList', function() {
					var $item = $( this );
					if ( $item.hasClass( 'selected' ) ) {
						$item.removeClass( 'selected' );
						$item.find( '.repeater-list-check' ).remove();
						self.$element.trigger( 'deselected.fu.repeaterList', $item );
					} else {
						if ( self.viewOptions.list_selectable !== 'multi' ) {
							self.$canvas.find( '.repeater-list-check' ).remove();
							self.$canvas.find( '.repeater-list tbody tr.selected' ).each( function() {
								$( this ).removeClass( 'selected' );
								self.$element.trigger( 'deselected.fu.repeaterList', $( this ) );
							} );
						}

						$item.addClass( 'selected' );
						$item.find( 'td:first' ).prepend( '<div class="repeater-list-check"><span class="glyphicon glyphicon-ok"></span></div>' );
						self.$element.trigger( 'selected.fu.repeaterList', $item );
					}
				} );
				// allow selection via enter key
				$row.keyup( function( e ) {
					if ( e.keyCode === 13 ) {
						// triggering a standard click event to be caught by the row click handler above
						$row.trigger( 'click.fu.repeaterList' );
					}
				} );
			}

			$tbody.append( $row );

			for ( i = 0, l = this.list_columns.length; i < l; i++ ) {
				renderColumn.call( this, $row, rows, index, this.list_columns, i );
			}

			if ( this.viewOptions.list_rowRendered ) {
				this.viewOptions.list_rowRendered( {
					container: $tbody,
					item: $row,
					rowData: rows[ index ]
				}, function() {} );
			}
		}

		function renderTbody( $table, data ) {
			var $tbody = $table.find( 'tbody' );
			var $empty;

			if ( $tbody.length < 1 ) {
				$tbody = $( '<tbody data-container="true"></tbody>' );
				$table.append( $tbody );
			}

			if ( data.items && data.items.length < 1 ) {
				$empty = $( '<tr class="empty"><td colspan="' + this.list_columns.length + '"></td></tr>' );
				$empty.find( 'td' ).append( this.viewOptions.list_noItemsHTML );
				$tbody.append( $empty );
			}
		}

		function renderThead( $table, data ) {
			var columns = data.columns || [];
			var i, j, l, $thead, $tr;

			function differentColumns( oldCols, newCols ) {
				if ( !newCols ) {
					return false;
				}
				if ( !oldCols || ( newCols.length !== oldCols.length ) ) {
					return true;
				}
				for ( i = 0, l = newCols.length; i < l; i++ ) {
					if ( !oldCols[ i ] ) {
						return true;
					} else {
						for ( j in newCols[ i ] ) {
							if ( oldCols[ i ][ j ] !== newCols[ i ][ j ] ) {
								return true;
							}

						}
					}

				}
				return false;
			}

			if ( this.list_firstRender || differentColumns( this.list_columns, columns ) ) {
				$table.find( 'thead' ).remove();

				this.list_columns = columns;
				this.list_firstRender = false;
				this.$loader.removeClass( 'noHeader' );

				$thead = $( '<thead data-preserve="deep"><tr></tr></thead>' );
				$tr = $thead.find( 'tr' );
				for ( i = 0, l = columns.length; i < l; i++ ) {
					renderHeader.call( this, $tr, columns, i );
				}
				$table.prepend( $thead );

				sizeColumns.call( this, $tr );
			}
		}

		function sizeColumns( $tr ) {
			var auto = [];
			var self = this;
			var i, l, newWidth, taken;

			if ( this.viewOptions.list_columnSizing ) {
				i = 0;
				taken = 0;
				$tr.find( 'th' ).each( function() {
					var $th = $( this );
					var isLast = ( $th.next( 'th' ).length === 0 );
					var width;
					if ( self.list_columns[ i ].width !== undefined ) {
						width = self.list_columns[ i ].width;
						$th.outerWidth( width );
						taken += $th.outerWidth();
						if ( !isLast ) {
							self.list_columns[ i ]._auto_width = width;
						} else {
							$th.outerWidth( '' );
						}

					} else {
						auto.push( {
							col: $th,
							index: i,
							last: isLast
						} );
					}

					i++;
				} );

				l = auto.length;
				if ( l > 0 ) {
					newWidth = Math.floor( ( this.$canvas.width() - taken ) / l );
					for ( i = 0; i < l; i++ ) {
						if ( !auto[ i ].last ) {
							auto[ i ].col.outerWidth( newWidth );
							this.list_columns[ auto[ i ].index ]._auto_width = newWidth;
						}

					}
				}
			}
		}



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Repeater - Thumbnail View Plugin
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		if ( $.fn.repeater ) {
			//ADDITIONAL METHODS
			$.fn.repeater.Constructor.prototype.thumbnail_clearSelectedItems = function() {
				this.$canvas.find( '.repeater-thumbnail-cont .selectable.selected' ).removeClass( 'selected' );
			};

			$.fn.repeater.Constructor.prototype.thumbnail_getSelectedItems = function() {
				var selected = [];
				this.$canvas.find( '.repeater-thumbnail-cont .selectable.selected' ).each( function() {
					selected.push( $( this ) );
				} );
				return selected;
			};

			$.fn.repeater.Constructor.prototype.thumbnail_setSelectedItems = function( items, force ) {
				var selectable = this.viewOptions.thumbnail_selectable;
				var self = this;
				var i, $item, l, n;

				//this function is necessary because lint yells when a function is in a loop
				function compareItemIndex() {
					if ( n === items[ i ].index ) {
						$item = $( this );
						return false;
					} else {
						n++;
					}
				}

				//this function is necessary because lint yells when a function is in a loop
				function compareItemSelector() {
					$item = $( this );
					if ( $item.is( items[ i ].selector ) ) {
						selectItem( $item, items[ i ].selected );
					}
				}

				function selectItem( $itm, select ) {
					select = ( select !== undefined ) ? select : true;
					if ( select ) {
						if ( !force && selectable !== 'multi' ) {
							self.thumbnail_clearSelectedItems();
						}

						$itm.addClass( 'selected' );
					} else {
						$itm.removeClass( 'selected' );
					}
				}

				if ( !$.isArray( items ) ) {
					items = [ items ];
				}

				if ( force === true || selectable === 'multi' ) {
					l = items.length;
				} else if ( selectable ) {
					l = ( items.length > 0 ) ? 1 : 0;
				} else {
					l = 0;
				}

				for ( i = 0; i < l; i++ ) {
					if ( items[ i ].index !== undefined ) {
						$item = $();
						n = 0;
						this.$canvas.find( '.repeater-thumbnail-cont .selectable' ).each( compareItemIndex );
						if ( $item.length > 0 ) {
							selectItem( $item, items[ i ].selected );
						}

					} else if ( items[ i ].selector ) {
						this.$canvas.find( '.repeater-thumbnail-cont .selectable' ).each( compareItemSelector );
					}
				}
			};

			//ADDITIONAL DEFAULT OPTIONS
			$.fn.repeater.defaults = $.extend( {}, $.fn.repeater.defaults, {
				thumbnail_alignment: 'left',
				thumbnail_infiniteScroll: false,
				thumbnail_itemRendered: null,
				thumbnail_noItemsHTML: 'no items found',
				thumbnail_selectable: false,
				thumbnail_template: '<div class="thumbnail repeater-thumbnail"><img height="75" src="{{src}}" width="65"><span>{{name}}</span></div>'
			} );

			//EXTENSION DEFINITION
			$.fn.repeater.viewTypes.thumbnail = {
				selected: function() {
					var infScroll = this.viewOptions.thumbnail_infiniteScroll;
					var opts;
					if ( infScroll ) {
						opts = ( typeof infScroll === 'object' ) ? infScroll : {};
						this.infiniteScrolling( true, opts );
					}
				},
				before: function( helpers ) {
					var alignment = this.viewOptions.thumbnail_alignment;
					var $cont = this.$canvas.find( '.repeater-thumbnail-cont' );
					var data = helpers.data;
					var response = {};
					var $empty, validAlignments;

					if ( $cont.length < 1 ) {
						$cont = $( '<div class="clearfix repeater-thumbnail-cont" data-container="true" data-infinite="true" data-preserve="shallow"></div>' );
						if ( alignment && alignment !== 'none' ) {
							validAlignments = {
								'center': 1,
								'justify': 1,
								'left': 1,
								'right': 1
							};
							alignment = ( validAlignments[ alignment ] ) ? alignment : 'justify';
							$cont.addClass( 'align-' + alignment );
							this.thumbnail_injectSpacers = true;
						} else {
							this.thumbnail_injectSpacers = false;
						}
						response.item = $cont;
					} else {
						response.action = 'none';
					}

					if ( data.items && data.items.length < 1 ) {
						$empty = $( '<div class="empty"></div>' );
						$empty.append( this.viewOptions.thumbnail_noItemsHTML );
						$cont.append( $empty );
					} else {
						$cont.find( '.empty:first' ).remove();
					}

					return response;
				},
				renderItem: function( helpers ) {
					var selectable = this.viewOptions.thumbnail_selectable;
					var selected = 'selected';
					var self = this;
					var $thumbnail = $( fillTemplate( helpers.subset[ helpers.index ], this.viewOptions.thumbnail_template ) );

					if ( selectable ) {
						$thumbnail.addClass( 'selectable' );
						$thumbnail.on( 'click', function() {
							if ( !$thumbnail.hasClass( selected ) ) {
								if ( selectable !== 'multi' ) {
									self.$canvas.find( '.repeater-thumbnail-cont .selectable.selected' ).each( function() {
										var $itm = $( this );
										$itm.removeClass( selected );
										self.$element.trigger( 'deselected.fu.repeaterThumbnail', $itm );
									} );
								}

								$thumbnail.addClass( selected );
								self.$element.trigger( 'selected.fu.repeaterThumbnail', $thumbnail );
							} else {
								$thumbnail.removeClass( selected );
								self.$element.trigger( 'deselected.fu.repeaterThumbnail', $thumbnail );
							}
						} );
					}

					helpers.container.append( $thumbnail );
					if ( this.thumbnail_injectSpacers ) {
						$thumbnail.after( '<span class="spacer">&nbsp;</span>' );
					}

					if ( this.viewOptions.thumbnail_itemRendered ) {
						this.viewOptions.thumbnail_itemRendered( {
							container: helpers.container,
							item: $thumbnail,
							itemData: helpers.subset[ helpers.index ]
						}, function() {} );
					}

					return false;
				}
			};
		}

		//ADDITIONAL METHODS
		function fillTemplate( itemData, template ) {
			var invalid = false;

			function replace() {
				var end, start, val;

				start = template.indexOf( '{{' );
				end = template.indexOf( '}}', start + 2 );

				if ( start > -1 && end > -1 ) {
					val = $.trim( template.substring( start + 2, end ) );
					val = ( itemData[ val ] !== undefined ) ? itemData[ val ] : '';
					template = template.substring( 0, start ) + val + template.substring( end + 2 );
				} else {
					invalid = true;
				}
			}

			while ( !invalid && template.search( '{{' ) >= 0 ) {
				replace( template );
			}

			return template;
		}



	} )( jQuery );


	( function( $ ) {

		/*
		 * Fuel UX Scheduler
		 * https://github.com/ExactTarget/fuelux
		 *
		 * Copyright (c) 2014 ExactTarget
		 * Licensed under the BSD New license.
		 */



		// -- BEGIN MODULE CODE HERE --

		var old = $.fn.scheduler;

		// SCHEDULER CONSTRUCTOR AND PROTOTYPE

		var Scheduler = function( element, options ) {
			var self = this;

			this.$element = $( element );
			this.options = $.extend( {}, $.fn.scheduler.defaults, options );

			// cache elements
			this.$startDate = this.$element.find( '.start-datetime .start-date' );
			this.$startTime = this.$element.find( '.start-datetime .start-time' );

			this.$timeZone = this.$element.find( '.timezone-container .timezone' );

			this.$repeatIntervalPanel = this.$element.find( '.repeat-every-panel' );
			this.$repeatIntervalSelect = this.$element.find( '.repeat-options' );

			this.$repeatIntervalSpinbox = this.$element.find( '.repeat-every' );
			this.$repeatIntervalTxt = this.$element.find( '.repeat-every-text' );

			this.$end = this.$element.find( '.repeat-end' );
			this.$endSelect = this.$end.find( '.end-options' );
			this.$endAfter = this.$end.find( '.end-after' );
			this.$endDate = this.$end.find( '.end-on-date' );

			// panels
			this.$recurrencePanels = this.$element.find( '.repeat-panel' );


			this.$repeatIntervalSelect.selectlist();

			//initialize sub-controls
			this.$element.find( '.selectlist' ).selectlist();
			this.$startDate.datepicker( this.options.startDateOptions );
			this.$startTime.combobox();
			// init start time
			if ( this.$startTime.find( 'input' ).val() === '' ) {
				this.$startTime.combobox( 'selectByIndex', 0 );
			}

			// every 0 days/hours doesn't make sense, change if not set
			if ( this.$repeatIntervalSpinbox.find( 'input' ).val() === '0' ) {
				this.$repeatIntervalSpinbox.spinbox( {
					'value': 1,
					'min': 1
				} );
			} else {
				this.$repeatIntervalSpinbox.spinbox( {
					'min': 1
				} );
			}

			this.$endAfter.spinbox( {
				'value': 1,
				'min': 1
			} );
			this.$endDate.datepicker( this.options.endDateOptions );
			this.$element.find( '.radio-custom' ).radio();

			// bind events: 'change' is a Bootstrap JS fired event
			this.$repeatIntervalSelect.on( 'changed.fu.selectlist', $.proxy( this.repeatIntervalSelectChanged, this ) );
			this.$endSelect.on( 'changed.fu.selectlist', $.proxy( this.endSelectChanged, this ) );
			this.$element.find( '.repeat-days-of-the-week .btn-group .btn' ).on( 'change.fu.scheduler', function( e, data ) {
				self.changed( e, data, true );
			} );
			this.$element.find( '.combobox' ).on( 'changed.fu.combobox', $.proxy( this.changed, this ) );
			this.$element.find( '.datepicker' ).on( 'changed.fu.datepicker', $.proxy( this.changed, this ) );
			this.$element.find( '.selectlist' ).on( 'changed.fu.selectlist', $.proxy( this.changed, this ) );
			this.$element.find( '.spinbox' ).on( 'changed.fu.spinbox', $.proxy( this.changed, this ) );
			this.$element.find( '.repeat-monthly .radio, .repeat-yearly .radio' ).on( 'change.fu.scheduler', $.proxy( this.changed, this ) );
		};

		Scheduler.prototype = {
			constructor: Scheduler,

			destroy: function() {
				var markup;
				// set input value attribute
				this.$element.find( 'input' ).each( function() {
					$( this ).attr( 'value', $( this ).val() );
				} );

				// empty elements to return to original markup and store
				this.$element.find( '.datepicker .calendar' ).empty();

				markup = this.$element[ 0 ].outerHTML;

				// destroy components
				this.$element.find( '.combobox' ).combobox( 'destroy' );
				this.$element.find( '.datepicker' ).datepicker( 'destroy' );
				this.$element.find( '.selectlist' ).selectlist( 'destroy' );
				this.$element.find( '.spinbox' ).spinbox( 'destroy' );
				this.$element.find( '[type=radio]' ).radio( 'destroy' );
				this.$element.remove();

				// any external bindings
				// [none]

				return markup;
			},

			changed: function( e, data, propagate ) {
				if ( !propagate ) {
					e.stopPropagation();
				}

				this.$element.trigger( 'changed.fu.scheduler', {
					data: ( data !== undefined ) ? data : $( e.currentTarget ).data(),
					originalEvent: e,
					value: this.getValue()
				} );
			},

			disable: function() {
				this.toggleState( 'disable' );
			},

			enable: function() {
				this.toggleState( 'enable' );
			},

			setUtcTime: function( d, t, offset ) {
				var date = d.split( '-' );
				var time = t.split( ':' );

				function z( n ) {
					return ( n < 10 ? '0' : '' ) + n;
				}

				var utcDate = new Date( Date.UTC( date[ 0 ], ( date[ 1 ] - 1 ), date[ 2 ], time[ 0 ], time[ 1 ], ( time[ 2 ] ? time[ 2 ] : 0 ) ) );

				if ( offset === 'Z' ) {
					utcDate.setUTCHours( utcDate.getUTCHours() + 0 );
				} else {
					var re1 = '(.)'; // Any Single Character 1
					var re2 = '.*?'; // Non-greedy match on filler
					var re3 = '\\d'; // Uninteresting: d
					var re4 = '.*?'; // Non-greedy match on filler
					var re5 = '(\\d)'; // Any Single Digit 1

					var p = new RegExp( re1 + re2 + re3 + re4 + re5, [ "i" ] );
					var m = p.exec( offset );
					if ( m !== null ) {
						var c1 = m[ 1 ];
						var d1 = m[ 2 ];

						var modifier = ( c1 === '+' ) ? 1 : -1;

						utcDate.setUTCHours( utcDate.getUTCHours() + ( modifier * parseInt( d1, 10 ) ) );
					}

				}

				var localDifference = utcDate.getTimezoneOffset();
				utcDate.setMinutes( localDifference );
				return utcDate;
			},

			// called when the end range changes
			// (Never, After, On date)
			endSelectChanged: function( e, data ) {
				var selectedItem, val;

				if ( !data ) {
					selectedItem = this.$endSelect.selectlist( 'selectedItem' );
					val = selectedItem.value;
				} else {
					val = data.value;
				}

				// hide all panels
				this.$endAfter.parent().addClass( 'hidden' );
				this.$endAfter.parent().attr( 'aria-hidden', 'true' );

				this.$endDate.parent().addClass( 'hidden' );
				this.$endDate.parent().attr( 'aria-hidden', 'true' );

				if ( val === 'after' ) {
					this.$endAfter.parent().removeClass( 'hide hidden' ); // hide is deprecated
					this.$endAfter.parent().attr( 'aria-hidden', 'false' );
				} else if ( val === 'date' ) {
					this.$endDate.parent().removeClass( 'hide hidden' ); // hide is deprecated
					this.$endDate.parent().attr( 'aria-hidden', 'false' );
				}
			},

			getValue: function() {
				// FREQ = frequency (hourly, daily, monthly...)
				// BYDAY = when picking days (MO,TU,WE,etc)
				// BYMONTH = when picking months (Jan,Feb,March) - note the values should be 1,2,3...
				// BYMONTHDAY = when picking days of the month (1,2,3...)
				// BYSETPOS = when picking First,Second,Third,Fourth,Last (1,2,3,4,-1)

				var interval = this.$repeatIntervalSpinbox.spinbox( 'value' );
				var pattern = '';
				var repeat = this.$repeatIntervalSelect.selectlist( 'selectedItem' ).value;
				var startTime;

				if ( this.$startTime.combobox( 'selectedItem' ).value ) {
					startTime = this.$startTime.combobox( 'selectedItem' ).value;
					startTime = startTime.toLowerCase();

				} else {
					startTime = this.$startTime.combobox( 'selectedItem' ).text.toLowerCase();
				}

				var timeZone = this.$timeZone.selectlist( 'selectedItem' );
				var getFormattedDate;

				getFormattedDate = function( dateObj, dash ) {
					var fdate = '';
					var item;

					fdate += dateObj.getFullYear();
					fdate += dash;
					item = dateObj.getMonth() + 1; //because 0 indexing makes sense when dealing with months /sarcasm
					fdate += ( item < 10 ) ? '0' + item : item;
					fdate += dash;
					item = dateObj.getDate();
					fdate += ( item < 10 ) ? '0' + item : item;

					return fdate;
				};

				var day, days, hasAm, hasPm, month, pos, startDateTime, type;

				startDateTime = '' + getFormattedDate( this.$startDate.datepicker( 'getDate' ), '-' );

				startDateTime += 'T';
				hasAm = ( startTime.search( 'am' ) >= 0 );
				hasPm = ( startTime.search( 'pm' ) >= 0 );
				startTime = $.trim( startTime.replace( /am/g, '' ).replace( /pm/g, '' ) ).split( ':' );
				startTime[ 0 ] = parseInt( startTime[ 0 ], 10 );
				startTime[ 1 ] = parseInt( startTime[ 1 ], 10 );
				if ( hasAm && startTime[ 0 ] > 11 ) {
					startTime[ 0 ] = 0;
				} else if ( hasPm && startTime[ 0 ] < 12 ) {
					startTime[ 0 ] += 12;
				}

				startDateTime += ( startTime[ 0 ] < 10 ) ? '0' + startTime[ 0 ] : startTime[ 0 ];
				startDateTime += ':';
				startDateTime += ( startTime[ 1 ] < 10 ) ? '0' + startTime[ 1 ] : startTime[ 1 ];

				startDateTime += ( timeZone.offset === '+00:00' ) ? 'Z' : timeZone.offset;

				if ( repeat === 'none' ) {
					pattern = 'FREQ=DAILY;INTERVAL=1;COUNT=1;';
				} else if ( repeat === 'hourly' ) {
					pattern = 'FREQ=HOURLY;';
					pattern += 'INTERVAL=' + interval + ';';
				} else if ( repeat === 'daily' ) {
					pattern += 'FREQ=DAILY;';
					pattern += 'INTERVAL=' + interval + ';';
				} else if ( repeat === 'weekdays' ) {
					pattern += 'FREQ=DAILY;';
					pattern += 'BYDAY=MO,TU,WE,TH,FR;';
					pattern += 'INTERVAL=1;';
				} else if ( repeat === 'weekly' ) {
					days = [];
					this.$element.find( '.repeat-days-of-the-week .btn-group input:checked' ).each( function() {
						days.push( $( this ).data().value );
					} );

					pattern += 'FREQ=WEEKLY;';
					pattern += 'BYDAY=' + days.join( ',' ) + ';';
					pattern += 'INTERVAL=' + interval + ';';
				} else if ( repeat === 'monthly' ) {
					pattern += 'FREQ=MONTHLY;';
					pattern += 'INTERVAL=' + interval + ';';
					type = this.$element.find( 'input[name=repeat-monthly]:checked' ).val();

					if ( type === 'bymonthday' ) {
						day = parseInt( this.$element.find( '.repeat-monthly-date .selectlist' ).selectlist( 'selectedItem' ).text, 10 );
						pattern += 'BYMONTHDAY=' + day + ';';
					} else if ( type === 'bysetpos' ) {
						days = this.$element.find( '.month-days' ).selectlist( 'selectedItem' ).value;
						pos = this.$element.find( '.month-day-pos' ).selectlist( 'selectedItem' ).value;
						pattern += 'BYDAY=' + days + ';';
						pattern += 'BYSETPOS=' + pos + ';';
					}

				} else if ( repeat === 'yearly' ) {
					pattern += 'FREQ=YEARLY;';
					type = this.$element.find( 'input[name=repeat-yearly]:checked' ).val();

					if ( type === 'bymonthday' ) {
						month = this.$element.find( '.repeat-yearly-date .year-month' ).selectlist( 'selectedItem' ).value;
						day = this.$element.find( '.year-month-day' ).selectlist( 'selectedItem' ).text;
						pattern += 'BYMONTH=' + month + ';';
						pattern += 'BYMONTHDAY=' + day + ';';
					} else if ( type === 'bysetpos' ) {
						days = this.$element.find( '.year-month-days' ).selectlist( 'selectedItem' ).value;
						pos = this.$element.find( '.year-month-day-pos' ).selectlist( 'selectedItem' ).value;
						month = this.$element.find( '.repeat-yearly-day .year-month' ).selectlist( 'selectedItem' ).value;

						pattern += 'BYDAY=' + days + ';';
						pattern += 'BYSETPOS=' + pos + ';';
						pattern += 'BYMONTH=' + month + ';';
					}

				}

				var end = this.$endSelect.selectlist( 'selectedItem' ).value;
				var duration = '';

				// if both UNTIL and COUNT are not specified, the recurrence will repeat forever
				// http://tools.ietf.org/html/rfc2445#section-4.3.10
				if ( repeat !== 'none' ) {
					if ( end === 'after' ) {
						duration = 'COUNT=' + this.$endAfter.spinbox( 'value' ) + ';';
					} else if ( end === 'date' ) {
						duration = 'UNTIL=' + getFormattedDate( this.$endDate.datepicker( 'getDate' ), '' ) + ';';
					}

				}

				pattern += duration;

				var data = {
					startDateTime: startDateTime,
					timeZone: {
						name: timeZone.name,
						offset: timeZone.offset
					},
					recurrencePattern: pattern
				};

				return data;
			},

			// called when the repeat interval changes
			// (None, Hourly, Daily, Weekdays, Weekly, Monthly, Yearly
			repeatIntervalSelectChanged: function( e, data ) {
				var selectedItem, val, txt;

				if ( !data ) {
					selectedItem = this.$repeatIntervalSelect.selectlist( 'selectedItem' );
					val = selectedItem.value;
					txt = selectedItem.text;
				} else {
					val = data.value;
					txt = data.text;
				}

				// set the text
				this.$repeatIntervalTxt.text( txt );

				switch ( val.toLowerCase() ) {
					case 'hourly':
					case 'daily':
					case 'weekly':
					case 'monthly':
						this.$repeatIntervalPanel.removeClass( 'hide hidden' ); // hide is deprecated
						this.$repeatIntervalPanel.attr( 'aria-hidden', 'false' );
						break;
					default:
						this.$repeatIntervalPanel.addClass( 'hidden' ); // hide is deprecated
						this.$repeatIntervalPanel.attr( 'aria-hidden', 'true' );
						break;
				}

				// hide all panels
				this.$recurrencePanels.addClass( 'hidden' );
				this.$recurrencePanels.attr( 'aria-hidden', 'true' );

				// show panel for current selection
				this.$element.find( '.repeat-' + val ).removeClass( 'hide hidden' ); // hide is deprecated
				this.$element.find( '.repeat-' + val ).attr( 'aria-hidden', 'false' );

				// the end selection should only be shown when
				// the repeat interval is not "None (run once)"
				if ( val === 'none' ) {
					this.$end.addClass( 'hidden' );
					this.$end.attr( 'aria-hidden', 'true' );
				} else {
					this.$end.removeClass( 'hide hidden' ); // hide is deprecated
					this.$end.attr( 'aria-hidden', 'false' );
				}
			},

			setValue: function( options ) {
				var hours, i, item, l, minutes, period, recur, temp, startDate, startTime, timeOffset;

				if ( options.startDateTime ) {
					temp = options.startDateTime.split( 'T' );
					startDate = temp[ 0 ];

					if ( temp[ 1 ] ) {
						temp[ 1 ] = temp[ 1 ].split( ':' );
						hours = parseInt( temp[ 1 ][ 0 ], 10 );
						minutes = ( temp[ 1 ][ 1 ] ) ? parseInt( temp[ 1 ][ 1 ].split( '+' )[ 0 ].split( '-' )[ 0 ].split( 'Z' )[ 0 ], 10 ) : 0;
						period = ( hours < 12 ) ? 'AM' : 'PM';

						if ( hours === 0 ) {
							hours = 12;
						} else if ( hours > 12 ) {
							hours -= 12;
						}

						minutes = ( minutes < 10 ) ? '0' + minutes : minutes;
						startTime = hours + ':' + minutes;
						temp = hours + ':' + minutes + ' ' + period;
						this.$startTime.find( 'input' ).val( temp );
						this.$startTime.combobox( 'selectByText', temp );
					} else {
						startTime = '00:00';
					}
				} else {
					startTime = '00:00';
					var currentDate = this.$startDate.datepicker( 'getDate' );
					startDate = currentDate.getFullYear() + '-' + currentDate.getMonth() + '-' + currentDate.getDate();
				}

				item = 'li[data';
				if ( options.timeZone ) {
					if ( typeof( options.timeZone ) === 'string' ) {
						item += '-name="' + options.timeZone;
					} else {
						if ( options.timeZone.name ) {
							item += '-name="' + options.timeZone.name;
						} else {
							item += '-offset="' + options.timeZone.offset;
						}
					}

					item += '"]';
					timeOffset = options.timeZone.offset;
					this.$timeZone.selectlist( 'selectBySelector', item );
				} else if ( options.startDateTime ) {
					temp = options.startDateTime.split( 'T' )[ 1 ];
					if ( temp ) {
						if ( temp.search( /\+/ ) > -1 ) {
							temp = '+' + $.trim( temp.split( '+' )[ 1 ] );
						} else if ( temp.search( /\-/ ) > -1 ) {
							temp = '-' + $.trim( temp.split( '-' )[ 1 ] );
						} else {
							temp = '+00:00';
						}
					} else {
						temp = '+00:00';
					}

					timeOffset = ( temp === '+00:00' ) ? 'Z' : temp;

					item += '-offset="' + temp + '"]';
					this.$timeZone.selectlist( 'selectBySelector', item );
				} else {
					timeOffset = 'Z';
				}

				if ( options.recurrencePattern ) {
					recur = {};
					temp = options.recurrencePattern.toUpperCase().split( ';' );
					for ( i = 0, l = temp.length; i < l; i++ ) {
						if ( temp[ i ] !== '' ) {
							item = temp[ i ].split( '=' );
							recur[ item[ 0 ] ] = item[ 1 ];
						}
					}

					if ( recur.FREQ === 'DAILY' ) {
						if ( recur.BYDAY === 'MO,TU,WE,TH,FR' ) {
							item = 'weekdays';
						} else {
							if ( recur.INTERVAL === '1' && recur.COUNT === '1' ) {
								item = 'none';
							} else {
								item = 'daily';
							}
						}
					} else if ( recur.FREQ === 'HOURLY' ) {
						item = 'hourly';
					} else if ( recur.FREQ === 'WEEKLY' ) {
						if ( recur.BYDAY ) {
							item = this.$element.find( '.repeat-days-of-the-week .btn-group' );
							item.find( 'label' ).removeClass( 'active' );
							temp = recur.BYDAY.split( ',' );
							for ( i = 0, l = temp.length; i < l; i++ ) {
								item.find( 'input[data-value="' + temp[ i ] + '"]' ).prop( 'checked', true ).parent().addClass( 'active' );
							}
						}

						item = 'weekly';
					} else if ( recur.FREQ === 'MONTHLY' ) {
						this.$element.find( '.repeat-monthly input' ).removeAttr( 'checked' ).removeClass( 'checked' );
						this.$element.find( '.repeat-monthly label.radio-custom' ).removeClass( 'checked' );
						if ( recur.BYMONTHDAY ) {
							temp = this.$element.find( '.repeat-monthly-date' );
							temp.find( 'input' ).addClass( 'checked' ).prop( 'checked', true );
							temp.find( 'label.radio-custom' ).addClass( 'checked' );
							temp.find( '.selectlist' ).selectlist( 'selectByValue', recur.BYMONTHDAY );
						} else if ( recur.BYDAY ) {
							temp = this.$element.find( '.repeat-monthly-day' );
							temp.find( 'input' ).addClass( 'checked' ).prop( 'checked', true );
							temp.find( 'label.radio-custom' ).addClass( 'checked' );
							if ( recur.BYSETPOS ) {
								temp.find( '.month-day-pos' ).selectlist( 'selectByValue', recur.BYSETPOS );
							}

							temp.find( '.month-days' ).selectlist( 'selectByValue', recur.BYDAY );
						}

						item = 'monthly';
					} else if ( recur.FREQ === 'YEARLY' ) {
						this.$element.find( '.repeat-yearly input' ).removeAttr( 'checked' ).removeClass( 'checked' );
						this.$element.find( '.repeat-yearly label.radio-custom' ).removeClass( 'checked' );
						if ( recur.BYMONTHDAY ) {
							temp = this.$element.find( '.repeat-yearly-date' );
							temp.find( 'input' ).addClass( 'checked' ).prop( 'checked', true );
							temp.find( 'label.radio-custom' ).addClass( 'checked' );
							if ( recur.BYMONTH ) {
								temp.find( '.year-month' ).selectlist( 'selectByValue', recur.BYMONTH );
							}

							temp.find( '.year-month-day' ).selectlist( 'selectByValue', recur.BYMONTHDAY );
						} else if ( recur.BYSETPOS ) {
							temp = this.$element.find( '.repeat-yearly-day' );
							temp.find( 'input' ).addClass( 'checked' ).prop( 'checked', true );
							temp.find( 'label.radio-custom' ).addClass( 'checked' );
							temp.find( '.year-month-day-pos' ).selectlist( 'selectByValue', recur.BYSETPOS );
							if ( recur.BYDAY ) {
								temp.find( '.year-month-days' ).selectlist( 'selectByValue', recur.BYDAY );
							}

							if ( recur.BYMONTH ) {
								temp.find( '.year-month' ).selectlist( 'selectByValue', recur.BYMONTH );
							}

						}

						item = 'yearly';
					} else {
						item = 'none';
					}

					if ( recur.COUNT ) {
						this.$endAfter.spinbox( 'value', parseInt( recur.COUNT, 10 ) );
						this.$endSelect.selectlist( 'selectByValue', 'after' );
					} else if ( recur.UNTIL ) {
						temp = recur.UNTIL;
						if ( temp.length === 8 ) {
							temp = temp.split( '' );
							temp.splice( 4, 0, '-' );
							temp.splice( 7, 0, '-' );
							temp = temp.join( '' );
						}

						var timeZone = this.$timeZone.selectlist( 'selectedItem' );
						var timezoneOffset = ( timeZone.offset === '+00:00' ) ? 'Z' : timeZone.offset;

						startDate = temp;
						var utcEndHours = this.setUtcTime( startDate, startTime, timezoneOffset );
						this.$endDate.datepicker( 'setDate', utcEndHours );

						this.$endSelect.selectlist( 'selectByValue', 'date' );
					} else {
						this.$endSelect.selectlist( 'selectByValue', 'never' );
					}

					this.endSelectChanged();

					if ( recur.INTERVAL ) {
						this.$repeatIntervalSpinbox.spinbox( 'value', parseInt( recur.INTERVAL, 10 ) );
					}

					this.$repeatIntervalSelect.selectlist( 'selectByValue', item );
					this.repeatIntervalSelectChanged();
				}

				var utcStartHours = this.setUtcTime( startDate, startTime, timeOffset );

				this.$startDate.datepicker( 'setDate', utcStartHours );
			},

			toggleState: function( action ) {
				this.$element.find( '.combobox' ).combobox( action );
				this.$element.find( '.datepicker' ).datepicker( action );
				this.$element.find( '.selectlist' ).selectlist( action );
				this.$element.find( '.spinbox' ).spinbox( action );
				this.$element.find( '[type=radio]' ).radio( action );

				if ( action === 'disable' ) {
					action = 'addClass';
				} else {
					action = 'removeClass';
				}

				this.$element.find( '.repeat-days-of-the-week .btn-group' )[ action ]( 'disabled' );
			},

			value: function( options ) {
				if ( options ) {
					return this.setValue( options );
				} else {
					return this.getValue();
				}
			}
		};


		// SCHEDULER PLUGIN DEFINITION

		$.fn.scheduler = function( option ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			var methodReturn;

			var $set = this.each( function() {
				var $this = $( this );
				var data = $this.data( 'fu.scheduler' );
				var options = typeof option === 'object' && option;

				if ( !data ) {
					$this.data( 'fu.scheduler', ( data = new Scheduler( this, options ) ) );
				}

				if ( typeof option === 'string' ) {
					methodReturn = data[ option ].apply( data, args );
				}
			} );

			return ( methodReturn === undefined ) ? $set : methodReturn;
		};

		$.fn.scheduler.defaults = {};

		$.fn.scheduler.Constructor = Scheduler;

		$.fn.scheduler.noConflict = function() {
			$.fn.scheduler = old;
			return this;
		};


		// DATA-API

		$( document ).on( 'mousedown.fu.scheduler.data-api', '[data-initialize=scheduler]', function( e ) {
			var $control = $( e.target ).closest( '.scheduler' );
			if ( !$control.data( 'fu.scheduler' ) ) {
				$control.scheduler( $control.data() );
			}
		} );

		// Must be domReady for AMD compatibility
		$( function() {
			$( '[data-initialize=scheduler]' ).each( function() {
				var $this = $( this );
				if ( $this.data( 'scheduler' ) ) return;
				$this.scheduler( $this.data() );
			} );
		} );



	} )( jQuery );


} ) );

/*!
 * typeahead.js 0.10.5
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

(function($) {
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            getUniqueId: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            }(),
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            noop: function() {}
        };
    }();
    var VERSION = "0.10.5";
    var tokenizers = function() {
        "use strict";
        return {
            nonword: nonword,
            whitespace: whitespace,
            obj: {
                nonword: getObjTokenizer(nonword),
                whitespace: getObjTokenizer(whitespace)
            }
        };
        function whitespace(str) {
            str = _.toStr(str);
            return str ? str.split(/\s+/) : [];
        }
        function nonword(str) {
            str = _.toStr(str);
            return str ? str.split(/\W+/) : [];
        }
        function getObjTokenizer(tokenizer) {
            return function setKey() {
                var args = [].slice.call(arguments, 0);
                return function tokenize(o) {
                    var tokens = [];
                    _.each(args, function(k) {
                        tokens = tokens.concat(tokenizer(_.toStr(o[k])));
                    });
                    return tokens;
                };
            };
        }
    }();
    var LruCache = function() {
        "use strict";
        function LruCache(maxSize) {
            this.maxSize = _.isNumber(maxSize) ? maxSize : 100;
            this.reset();
            if (this.maxSize <= 0) {
                this.set = this.get = $.noop;
            }
        }
        _.mixin(LruCache.prototype, {
            set: function set(key, val) {
                var tailItem = this.list.tail, node;
                if (this.size >= this.maxSize) {
                    this.list.remove(tailItem);
                    delete this.hash[tailItem.key];
                }
                if (node = this.hash[key]) {
                    node.val = val;
                    this.list.moveToFront(node);
                } else {
                    node = new Node(key, val);
                    this.list.add(node);
                    this.hash[key] = node;
                    this.size++;
                }
            },
            get: function get(key) {
                var node = this.hash[key];
                if (node) {
                    this.list.moveToFront(node);
                    return node.val;
                }
            },
            reset: function reset() {
                this.size = 0;
                this.hash = {};
                this.list = new List();
            }
        });
        function List() {
            this.head = this.tail = null;
        }
        _.mixin(List.prototype, {
            add: function add(node) {
                if (this.head) {
                    node.next = this.head;
                    this.head.prev = node;
                }
                this.head = node;
                this.tail = this.tail || node;
            },
            remove: function remove(node) {
                node.prev ? node.prev.next = node.next : this.head = node.next;
                node.next ? node.next.prev = node.prev : this.tail = node.prev;
            },
            moveToFront: function(node) {
                this.remove(node);
                this.add(node);
            }
        });
        function Node(key, val) {
            this.key = key;
            this.val = val;
            this.prev = this.next = null;
        }
        return LruCache;
    }();
    var PersistentStorage = function() {
        "use strict";
        var ls, methods;
        try {
            ls = window.localStorage;
            ls.setItem("~~~", "!");
            ls.removeItem("~~~");
        } catch (err) {
            ls = null;
        }
        function PersistentStorage(namespace) {
            this.prefix = [ "__", namespace, "__" ].join("");
            this.ttlKey = "__ttl__";
            this.keyMatcher = new RegExp("^" + _.escapeRegExChars(this.prefix));
        }
        if (ls && window.JSON) {
            methods = {
                _prefix: function(key) {
                    return this.prefix + key;
                },
                _ttlKey: function(key) {
                    return this._prefix(key) + this.ttlKey;
                },
                get: function(key) {
                    if (this.isExpired(key)) {
                        this.remove(key);
                    }
                    return decode(ls.getItem(this._prefix(key)));
                },
                set: function(key, val, ttl) {
                    if (_.isNumber(ttl)) {
                        ls.setItem(this._ttlKey(key), encode(now() + ttl));
                    } else {
                        ls.removeItem(this._ttlKey(key));
                    }
                    return ls.setItem(this._prefix(key), encode(val));
                },
                remove: function(key) {
                    ls.removeItem(this._ttlKey(key));
                    ls.removeItem(this._prefix(key));
                    return this;
                },
                clear: function() {
                    var i, key, keys = [], len = ls.length;
                    for (i = 0; i < len; i++) {
                        if ((key = ls.key(i)).match(this.keyMatcher)) {
                            keys.push(key.replace(this.keyMatcher, ""));
                        }
                    }
                    for (i = keys.length; i--; ) {
                        this.remove(keys[i]);
                    }
                    return this;
                },
                isExpired: function(key) {
                    var ttl = decode(ls.getItem(this._ttlKey(key)));
                    return _.isNumber(ttl) && now() > ttl ? true : false;
                }
            };
        } else {
            methods = {
                get: _.noop,
                set: _.noop,
                remove: _.noop,
                clear: _.noop,
                isExpired: _.noop
            };
        }
        _.mixin(PersistentStorage.prototype, methods);
        return PersistentStorage;
        function now() {
            return new Date().getTime();
        }
        function encode(val) {
            return JSON.stringify(_.isUndefined(val) ? null : val);
        }
        function decode(val) {
            return JSON.parse(val);
        }
    }();
    var Transport = function() {
        "use strict";
        var pendingRequestsCount = 0, pendingRequests = {}, maxPendingRequests = 6, sharedCache = new LruCache(10);
        function Transport(o) {
            o = o || {};
            this.cancelled = false;
            this.lastUrl = null;
            this._send = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            this._get = o.rateLimiter ? o.rateLimiter(this._get) : this._get;
            this._cache = o.cache === false ? new LruCache(0) : sharedCache;
        }
        Transport.setMaxPendingRequests = function setMaxPendingRequests(num) {
            maxPendingRequests = num;
        };
        Transport.resetCache = function resetCache() {
            sharedCache.reset();
        };
        _.mixin(Transport.prototype, {
            _get: function(url, o, cb) {
                var that = this, jqXhr;
                if (this.cancelled || url !== this.lastUrl) {
                    return;
                }
                if (jqXhr = pendingRequests[url]) {
                    jqXhr.done(done).fail(fail);
                } else if (pendingRequestsCount < maxPendingRequests) {
                    pendingRequestsCount++;
                    pendingRequests[url] = this._send(url, o).done(done).fail(fail).always(always);
                } else {
                    this.onDeckRequestArgs = [].slice.call(arguments, 0);
                }
                function done(resp) {
                    cb && cb(null, resp);
                    that._cache.set(url, resp);
                }
                function fail() {
                    cb && cb(true);
                }
                function always() {
                    pendingRequestsCount--;
                    delete pendingRequests[url];
                    if (that.onDeckRequestArgs) {
                        that._get.apply(that, that.onDeckRequestArgs);
                        that.onDeckRequestArgs = null;
                    }
                }
            },
            get: function(url, o, cb) {
                var resp;
                if (_.isFunction(o)) {
                    cb = o;
                    o = {};
                }
                this.cancelled = false;
                this.lastUrl = url;
                if (resp = this._cache.get(url)) {
                    _.defer(function() {
                        cb && cb(null, resp);
                    });
                } else {
                    this._get(url, o, cb);
                }
                return !!resp;
            },
            cancel: function() {
                this.cancelled = true;
            }
        });
        return Transport;
        function callbackToDeferred(fn) {
            return function customSendWrapper(url, o) {
                var deferred = $.Deferred();
                fn(url, o, onSuccess, onError);
                return deferred;
                function onSuccess(resp) {
                    _.defer(function() {
                        deferred.resolve(resp);
                    });
                }
                function onError(err) {
                    _.defer(function() {
                        deferred.reject(err);
                    });
                }
            };
        }
    }();
    var SearchIndex = function() {
        "use strict";
        function SearchIndex(o) {
            o = o || {};
            if (!o.datumTokenizer || !o.queryTokenizer) {
                $.error("datumTokenizer and queryTokenizer are both required");
            }
            this.datumTokenizer = o.datumTokenizer;
            this.queryTokenizer = o.queryTokenizer;
            this.reset();
        }
        _.mixin(SearchIndex.prototype, {
            bootstrap: function bootstrap(o) {
                this.datums = o.datums;
                this.trie = o.trie;
            },
            add: function(data) {
                var that = this;
                data = _.isArray(data) ? data : [ data ];
                _.each(data, function(datum) {
                    var id, tokens;
                    id = that.datums.push(datum) - 1;
                    tokens = normalizeTokens(that.datumTokenizer(datum));
                    _.each(tokens, function(token) {
                        var node, chars, ch;
                        node = that.trie;
                        chars = token.split("");
                        while (ch = chars.shift()) {
                            node = node.children[ch] || (node.children[ch] = newNode());
                            node.ids.push(id);
                        }
                    });
                });
            },
            get: function get(query) {
                var that = this, tokens, matches;
                tokens = normalizeTokens(this.queryTokenizer(query));
                _.each(tokens, function(token) {
                    var node, chars, ch, ids;
                    if (matches && matches.length === 0) {
                        return false;
                    }
                    node = that.trie;
                    chars = token.split("");
                    while (node && (ch = chars.shift())) {
                        node = node.children[ch];
                    }
                    if (node && chars.length === 0) {
                        ids = node.ids.slice(0);
                        matches = matches ? getIntersection(matches, ids) : ids;
                    } else {
                        matches = [];
                        return false;
                    }
                });
                return matches ? _.map(unique(matches), function(id) {
                    return that.datums[id];
                }) : [];
            },
            reset: function reset() {
                this.datums = [];
                this.trie = newNode();
            },
            serialize: function serialize() {
                return {
                    datums: this.datums,
                    trie: this.trie
                };
            }
        });
        return SearchIndex;
        function normalizeTokens(tokens) {
            tokens = _.filter(tokens, function(token) {
                return !!token;
            });
            tokens = _.map(tokens, function(token) {
                return token.toLowerCase();
            });
            return tokens;
        }
        function newNode() {
            return {
                ids: [],
                children: {}
            };
        }
        function unique(array) {
            var seen = {}, uniques = [];
            for (var i = 0, len = array.length; i < len; i++) {
                if (!seen[array[i]]) {
                    seen[array[i]] = true;
                    uniques.push(array[i]);
                }
            }
            return uniques;
        }
        function getIntersection(arrayA, arrayB) {
            var ai = 0, bi = 0, intersection = [];
            arrayA = arrayA.sort(compare);
            arrayB = arrayB.sort(compare);
            var lenArrayA = arrayA.length, lenArrayB = arrayB.length;
            while (ai < lenArrayA && bi < lenArrayB) {
                if (arrayA[ai] < arrayB[bi]) {
                    ai++;
                } else if (arrayA[ai] > arrayB[bi]) {
                    bi++;
                } else {
                    intersection.push(arrayA[ai]);
                    ai++;
                    bi++;
                }
            }
            return intersection;
            function compare(a, b) {
                return a - b;
            }
        }
    }();
    var oParser = function() {
        "use strict";
        return {
            local: getLocal,
            prefetch: getPrefetch,
            remote: getRemote
        };
        function getLocal(o) {
            return o.local || null;
        }
        function getPrefetch(o) {
            var prefetch, defaults;
            defaults = {
                url: null,
                thumbprint: "",
                ttl: 24 * 60 * 60 * 1e3,
                filter: null,
                ajax: {}
            };
            if (prefetch = o.prefetch || null) {
                prefetch = _.isString(prefetch) ? {
                    url: prefetch
                } : prefetch;
                prefetch = _.mixin(defaults, prefetch);
                prefetch.thumbprint = VERSION + prefetch.thumbprint;
                prefetch.ajax.type = prefetch.ajax.type || "GET";
                prefetch.ajax.dataType = prefetch.ajax.dataType || "json";
                !prefetch.url && $.error("prefetch requires url to be set");
            }
            return prefetch;
        }
        function getRemote(o) {
            var remote, defaults;
            defaults = {
                url: null,
                cache: true,
                wildcard: "%QUERY",
                replace: null,
                rateLimitBy: "debounce",
                rateLimitWait: 300,
                send: null,
                filter: null,
                ajax: {}
            };
            if (remote = o.remote || null) {
                remote = _.isString(remote) ? {
                    url: remote
                } : remote;
                remote = _.mixin(defaults, remote);
                remote.rateLimiter = /^throttle$/i.test(remote.rateLimitBy) ? byThrottle(remote.rateLimitWait) : byDebounce(remote.rateLimitWait);
                remote.ajax.type = remote.ajax.type || "GET";
                remote.ajax.dataType = remote.ajax.dataType || "json";
                delete remote.rateLimitBy;
                delete remote.rateLimitWait;
                !remote.url && $.error("remote requires url to be set");
            }
            return remote;
            function byDebounce(wait) {
                return function(fn) {
                    return _.debounce(fn, wait);
                };
            }
            function byThrottle(wait) {
                return function(fn) {
                    return _.throttle(fn, wait);
                };
            }
        }
    }();
    (function(root) {
        "use strict";
        var old, keys;
        old = root.Bloodhound;
        keys = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        };
        root.Bloodhound = Bloodhound;
        function Bloodhound(o) {
            if (!o || !o.local && !o.prefetch && !o.remote) {
                $.error("one of local, prefetch, or remote is required");
            }
            this.limit = o.limit || 5;
            this.sorter = getSorter(o.sorter);
            this.dupDetector = o.dupDetector || ignoreDuplicates;
            this.local = oParser.local(o);
            this.prefetch = oParser.prefetch(o);
            this.remote = oParser.remote(o);
            this.cacheKey = this.prefetch ? this.prefetch.cacheKey || this.prefetch.url : null;
            this.index = new SearchIndex({
                datumTokenizer: o.datumTokenizer,
                queryTokenizer: o.queryTokenizer
            });
            this.storage = this.cacheKey ? new PersistentStorage(this.cacheKey) : null;
        }
        Bloodhound.noConflict = function noConflict() {
            root.Bloodhound = old;
            return Bloodhound;
        };
        Bloodhound.tokenizers = tokenizers;
        _.mixin(Bloodhound.prototype, {
            _loadPrefetch: function loadPrefetch(o) {
                var that = this, serialized, deferred;
                if (serialized = this._readFromStorage(o.thumbprint)) {
                    this.index.bootstrap(serialized);
                    deferred = $.Deferred().resolve();
                } else {
                    deferred = $.ajax(o.url, o.ajax).done(handlePrefetchResponse);
                }
                return deferred;
                function handlePrefetchResponse(resp) {
                    that.clear();
                    that.add(o.filter ? o.filter(resp) : resp);
                    that._saveToStorage(that.index.serialize(), o.thumbprint, o.ttl);
                }
            },
            _getFromRemote: function getFromRemote(query, cb) {
                var that = this, url, uriEncodedQuery;
                if (!this.transport) {
                    return;
                }
                query = query || "";
                uriEncodedQuery = encodeURIComponent(query);
                url = this.remote.replace ? this.remote.replace(this.remote.url, query) : this.remote.url.replace(this.remote.wildcard, uriEncodedQuery);
                return this.transport.get(url, this.remote.ajax, handleRemoteResponse);
                function handleRemoteResponse(err, resp) {
                    err ? cb([]) : cb(that.remote.filter ? that.remote.filter(resp) : resp);
                }
            },
            _cancelLastRemoteRequest: function cancelLastRemoteRequest() {
                this.transport && this.transport.cancel();
            },
            _saveToStorage: function saveToStorage(data, thumbprint, ttl) {
                if (this.storage) {
                    this.storage.set(keys.data, data, ttl);
                    this.storage.set(keys.protocol, location.protocol, ttl);
                    this.storage.set(keys.thumbprint, thumbprint, ttl);
                }
            },
            _readFromStorage: function readFromStorage(thumbprint) {
                var stored = {}, isExpired;
                if (this.storage) {
                    stored.data = this.storage.get(keys.data);
                    stored.protocol = this.storage.get(keys.protocol);
                    stored.thumbprint = this.storage.get(keys.thumbprint);
                }
                isExpired = stored.thumbprint !== thumbprint || stored.protocol !== location.protocol;
                return stored.data && !isExpired ? stored.data : null;
            },
            _initialize: function initialize() {
                var that = this, local = this.local, deferred;
                deferred = this.prefetch ? this._loadPrefetch(this.prefetch) : $.Deferred().resolve();
                local && deferred.done(addLocalToIndex);
                this.transport = this.remote ? new Transport(this.remote) : null;
                return this.initPromise = deferred.promise();
                function addLocalToIndex() {
                    that.add(_.isFunction(local) ? local() : local);
                }
            },
            initialize: function initialize(force) {
                return !this.initPromise || force ? this._initialize() : this.initPromise;
            },
            add: function add(data) {
                this.index.add(data);
            },
            get: function get(query, cb) {
                var that = this, matches = [], cacheHit = false;
                matches = this.index.get(query);
                matches = this.sorter(matches).slice(0, this.limit);
                matches.length < this.limit ? cacheHit = this._getFromRemote(query, returnRemoteMatches) : this._cancelLastRemoteRequest();
                if (!cacheHit) {
                    (matches.length > 0 || !this.transport) && cb && cb(matches);
                }
                function returnRemoteMatches(remoteMatches) {
                    var matchesWithBackfill = matches.slice(0);
                    _.each(remoteMatches, function(remoteMatch) {
                        var isDuplicate;
                        isDuplicate = _.some(matchesWithBackfill, function(match) {
                            return that.dupDetector(remoteMatch, match);
                        });
                        !isDuplicate && matchesWithBackfill.push(remoteMatch);
                        return matchesWithBackfill.length < that.limit;
                    });
                    cb && cb(that.sorter(matchesWithBackfill));
                }
            },
            clear: function clear() {
                this.index.reset();
            },
            clearPrefetchCache: function clearPrefetchCache() {
                this.storage && this.storage.clear();
            },
            clearRemoteCache: function clearRemoteCache() {
                this.transport && Transport.resetCache();
            },
            ttAdapter: function ttAdapter() {
                return _.bind(this.get, this);
            }
        });
        return Bloodhound;
        function getSorter(sortFn) {
            return _.isFunction(sortFn) ? sort : noSort;
            function sort(array) {
                return array.sort(sortFn);
            }
            function noSort(array) {
                return array;
            }
        }
        function ignoreDuplicates() {
            return false;
        }
    })(this);
})(window.jQuery);
/*!
 * typeahead.js 0.10.5
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

(function($) {
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            getUniqueId: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            }(),
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            noop: function() {}
        };
    }();
    var VERSION = "0.10.5";
    var tokenizers = function() {
        "use strict";
        return {
            nonword: nonword,
            whitespace: whitespace,
            obj: {
                nonword: getObjTokenizer(nonword),
                whitespace: getObjTokenizer(whitespace)
            }
        };
        function whitespace(str) {
            str = _.toStr(str);
            return str ? str.split(/\s+/) : [];
        }
        function nonword(str) {
            str = _.toStr(str);
            return str ? str.split(/\W+/) : [];
        }
        function getObjTokenizer(tokenizer) {
            return function setKey() {
                var args = [].slice.call(arguments, 0);
                return function tokenize(o) {
                    var tokens = [];
                    _.each(args, function(k) {
                        tokens = tokens.concat(tokenizer(_.toStr(o[k])));
                    });
                    return tokens;
                };
            };
        }
    }();
    var LruCache = function() {
        "use strict";
        function LruCache(maxSize) {
            this.maxSize = _.isNumber(maxSize) ? maxSize : 100;
            this.reset();
            if (this.maxSize <= 0) {
                this.set = this.get = $.noop;
            }
        }
        _.mixin(LruCache.prototype, {
            set: function set(key, val) {
                var tailItem = this.list.tail, node;
                if (this.size >= this.maxSize) {
                    this.list.remove(tailItem);
                    delete this.hash[tailItem.key];
                }
                if (node = this.hash[key]) {
                    node.val = val;
                    this.list.moveToFront(node);
                } else {
                    node = new Node(key, val);
                    this.list.add(node);
                    this.hash[key] = node;
                    this.size++;
                }
            },
            get: function get(key) {
                var node = this.hash[key];
                if (node) {
                    this.list.moveToFront(node);
                    return node.val;
                }
            },
            reset: function reset() {
                this.size = 0;
                this.hash = {};
                this.list = new List();
            }
        });
        function List() {
            this.head = this.tail = null;
        }
        _.mixin(List.prototype, {
            add: function add(node) {
                if (this.head) {
                    node.next = this.head;
                    this.head.prev = node;
                }
                this.head = node;
                this.tail = this.tail || node;
            },
            remove: function remove(node) {
                node.prev ? node.prev.next = node.next : this.head = node.next;
                node.next ? node.next.prev = node.prev : this.tail = node.prev;
            },
            moveToFront: function(node) {
                this.remove(node);
                this.add(node);
            }
        });
        function Node(key, val) {
            this.key = key;
            this.val = val;
            this.prev = this.next = null;
        }
        return LruCache;
    }();
    var PersistentStorage = function() {
        "use strict";
        var ls, methods;
        try {
            ls = window.localStorage;
            ls.setItem("~~~", "!");
            ls.removeItem("~~~");
        } catch (err) {
            ls = null;
        }
        function PersistentStorage(namespace) {
            this.prefix = [ "__", namespace, "__" ].join("");
            this.ttlKey = "__ttl__";
            this.keyMatcher = new RegExp("^" + _.escapeRegExChars(this.prefix));
        }
        if (ls && window.JSON) {
            methods = {
                _prefix: function(key) {
                    return this.prefix + key;
                },
                _ttlKey: function(key) {
                    return this._prefix(key) + this.ttlKey;
                },
                get: function(key) {
                    if (this.isExpired(key)) {
                        this.remove(key);
                    }
                    return decode(ls.getItem(this._prefix(key)));
                },
                set: function(key, val, ttl) {
                    if (_.isNumber(ttl)) {
                        ls.setItem(this._ttlKey(key), encode(now() + ttl));
                    } else {
                        ls.removeItem(this._ttlKey(key));
                    }
                    return ls.setItem(this._prefix(key), encode(val));
                },
                remove: function(key) {
                    ls.removeItem(this._ttlKey(key));
                    ls.removeItem(this._prefix(key));
                    return this;
                },
                clear: function() {
                    var i, key, keys = [], len = ls.length;
                    for (i = 0; i < len; i++) {
                        if ((key = ls.key(i)).match(this.keyMatcher)) {
                            keys.push(key.replace(this.keyMatcher, ""));
                        }
                    }
                    for (i = keys.length; i--; ) {
                        this.remove(keys[i]);
                    }
                    return this;
                },
                isExpired: function(key) {
                    var ttl = decode(ls.getItem(this._ttlKey(key)));
                    return _.isNumber(ttl) && now() > ttl ? true : false;
                }
            };
        } else {
            methods = {
                get: _.noop,
                set: _.noop,
                remove: _.noop,
                clear: _.noop,
                isExpired: _.noop
            };
        }
        _.mixin(PersistentStorage.prototype, methods);
        return PersistentStorage;
        function now() {
            return new Date().getTime();
        }
        function encode(val) {
            return JSON.stringify(_.isUndefined(val) ? null : val);
        }
        function decode(val) {
            return JSON.parse(val);
        }
    }();
    var Transport = function() {
        "use strict";
        var pendingRequestsCount = 0, pendingRequests = {}, maxPendingRequests = 6, sharedCache = new LruCache(10);
        function Transport(o) {
            o = o || {};
            this.cancelled = false;
            this.lastUrl = null;
            this._send = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            this._get = o.rateLimiter ? o.rateLimiter(this._get) : this._get;
            this._cache = o.cache === false ? new LruCache(0) : sharedCache;
        }
        Transport.setMaxPendingRequests = function setMaxPendingRequests(num) {
            maxPendingRequests = num;
        };
        Transport.resetCache = function resetCache() {
            sharedCache.reset();
        };
        _.mixin(Transport.prototype, {
            _get: function(url, o, cb) {
                var that = this, jqXhr;
                if (this.cancelled || url !== this.lastUrl) {
                    return;
                }
                if (jqXhr = pendingRequests[url]) {
                    jqXhr.done(done).fail(fail);
                } else if (pendingRequestsCount < maxPendingRequests) {
                    pendingRequestsCount++;
                    pendingRequests[url] = this._send(url, o).done(done).fail(fail).always(always);
                } else {
                    this.onDeckRequestArgs = [].slice.call(arguments, 0);
                }
                function done(resp) {
                    cb && cb(null, resp);
                    that._cache.set(url, resp);
                }
                function fail() {
                    cb && cb(true);
                }
                function always() {
                    pendingRequestsCount--;
                    delete pendingRequests[url];
                    if (that.onDeckRequestArgs) {
                        that._get.apply(that, that.onDeckRequestArgs);
                        that.onDeckRequestArgs = null;
                    }
                }
            },
            get: function(url, o, cb) {
                var resp;
                if (_.isFunction(o)) {
                    cb = o;
                    o = {};
                }
                this.cancelled = false;
                this.lastUrl = url;
                if (resp = this._cache.get(url)) {
                    _.defer(function() {
                        cb && cb(null, resp);
                    });
                } else {
                    this._get(url, o, cb);
                }
                return !!resp;
            },
            cancel: function() {
                this.cancelled = true;
            }
        });
        return Transport;
        function callbackToDeferred(fn) {
            return function customSendWrapper(url, o) {
                var deferred = $.Deferred();
                fn(url, o, onSuccess, onError);
                return deferred;
                function onSuccess(resp) {
                    _.defer(function() {
                        deferred.resolve(resp);
                    });
                }
                function onError(err) {
                    _.defer(function() {
                        deferred.reject(err);
                    });
                }
            };
        }
    }();
    var SearchIndex = function() {
        "use strict";
        function SearchIndex(o) {
            o = o || {};
            if (!o.datumTokenizer || !o.queryTokenizer) {
                $.error("datumTokenizer and queryTokenizer are both required");
            }
            this.datumTokenizer = o.datumTokenizer;
            this.queryTokenizer = o.queryTokenizer;
            this.reset();
        }
        _.mixin(SearchIndex.prototype, {
            bootstrap: function bootstrap(o) {
                this.datums = o.datums;
                this.trie = o.trie;
            },
            add: function(data) {
                var that = this;
                data = _.isArray(data) ? data : [ data ];
                _.each(data, function(datum) {
                    var id, tokens;
                    id = that.datums.push(datum) - 1;
                    tokens = normalizeTokens(that.datumTokenizer(datum));
                    _.each(tokens, function(token) {
                        var node, chars, ch;
                        node = that.trie;
                        chars = token.split("");
                        while (ch = chars.shift()) {
                            node = node.children[ch] || (node.children[ch] = newNode());
                            node.ids.push(id);
                        }
                    });
                });
            },
            get: function get(query) {
                var that = this, tokens, matches;
                tokens = normalizeTokens(this.queryTokenizer(query));
                _.each(tokens, function(token) {
                    var node, chars, ch, ids;
                    if (matches && matches.length === 0) {
                        return false;
                    }
                    node = that.trie;
                    chars = token.split("");
                    while (node && (ch = chars.shift())) {
                        node = node.children[ch];
                    }
                    if (node && chars.length === 0) {
                        ids = node.ids.slice(0);
                        matches = matches ? getIntersection(matches, ids) : ids;
                    } else {
                        matches = [];
                        return false;
                    }
                });
                return matches ? _.map(unique(matches), function(id) {
                    return that.datums[id];
                }) : [];
            },
            reset: function reset() {
                this.datums = [];
                this.trie = newNode();
            },
            serialize: function serialize() {
                return {
                    datums: this.datums,
                    trie: this.trie
                };
            }
        });
        return SearchIndex;
        function normalizeTokens(tokens) {
            tokens = _.filter(tokens, function(token) {
                return !!token;
            });
            tokens = _.map(tokens, function(token) {
                return token.toLowerCase();
            });
            return tokens;
        }
        function newNode() {
            return {
                ids: [],
                children: {}
            };
        }
        function unique(array) {
            var seen = {}, uniques = [];
            for (var i = 0, len = array.length; i < len; i++) {
                if (!seen[array[i]]) {
                    seen[array[i]] = true;
                    uniques.push(array[i]);
                }
            }
            return uniques;
        }
        function getIntersection(arrayA, arrayB) {
            var ai = 0, bi = 0, intersection = [];
            arrayA = arrayA.sort(compare);
            arrayB = arrayB.sort(compare);
            var lenArrayA = arrayA.length, lenArrayB = arrayB.length;
            while (ai < lenArrayA && bi < lenArrayB) {
                if (arrayA[ai] < arrayB[bi]) {
                    ai++;
                } else if (arrayA[ai] > arrayB[bi]) {
                    bi++;
                } else {
                    intersection.push(arrayA[ai]);
                    ai++;
                    bi++;
                }
            }
            return intersection;
            function compare(a, b) {
                return a - b;
            }
        }
    }();
    var oParser = function() {
        "use strict";
        return {
            local: getLocal,
            prefetch: getPrefetch,
            remote: getRemote
        };
        function getLocal(o) {
            return o.local || null;
        }
        function getPrefetch(o) {
            var prefetch, defaults;
            defaults = {
                url: null,
                thumbprint: "",
                ttl: 24 * 60 * 60 * 1e3,
                filter: null,
                ajax: {}
            };
            if (prefetch = o.prefetch || null) {
                prefetch = _.isString(prefetch) ? {
                    url: prefetch
                } : prefetch;
                prefetch = _.mixin(defaults, prefetch);
                prefetch.thumbprint = VERSION + prefetch.thumbprint;
                prefetch.ajax.type = prefetch.ajax.type || "GET";
                prefetch.ajax.dataType = prefetch.ajax.dataType || "json";
                !prefetch.url && $.error("prefetch requires url to be set");
            }
            return prefetch;
        }
        function getRemote(o) {
            var remote, defaults;
            defaults = {
                url: null,
                cache: true,
                wildcard: "%QUERY",
                replace: null,
                rateLimitBy: "debounce",
                rateLimitWait: 300,
                send: null,
                filter: null,
                ajax: {}
            };
            if (remote = o.remote || null) {
                remote = _.isString(remote) ? {
                    url: remote
                } : remote;
                remote = _.mixin(defaults, remote);
                remote.rateLimiter = /^throttle$/i.test(remote.rateLimitBy) ? byThrottle(remote.rateLimitWait) : byDebounce(remote.rateLimitWait);
                remote.ajax.type = remote.ajax.type || "GET";
                remote.ajax.dataType = remote.ajax.dataType || "json";
                delete remote.rateLimitBy;
                delete remote.rateLimitWait;
                !remote.url && $.error("remote requires url to be set");
            }
            return remote;
            function byDebounce(wait) {
                return function(fn) {
                    return _.debounce(fn, wait);
                };
            }
            function byThrottle(wait) {
                return function(fn) {
                    return _.throttle(fn, wait);
                };
            }
        }
    }();
    (function(root) {
        "use strict";
        var old, keys;
        old = root.Bloodhound;
        keys = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        };
        root.Bloodhound = Bloodhound;
        function Bloodhound(o) {
            if (!o || !o.local && !o.prefetch && !o.remote) {
                $.error("one of local, prefetch, or remote is required");
            }
            this.limit = o.limit || 5;
            this.sorter = getSorter(o.sorter);
            this.dupDetector = o.dupDetector || ignoreDuplicates;
            this.local = oParser.local(o);
            this.prefetch = oParser.prefetch(o);
            this.remote = oParser.remote(o);
            this.cacheKey = this.prefetch ? this.prefetch.cacheKey || this.prefetch.url : null;
            this.index = new SearchIndex({
                datumTokenizer: o.datumTokenizer,
                queryTokenizer: o.queryTokenizer
            });
            this.storage = this.cacheKey ? new PersistentStorage(this.cacheKey) : null;
        }
        Bloodhound.noConflict = function noConflict() {
            root.Bloodhound = old;
            return Bloodhound;
        };
        Bloodhound.tokenizers = tokenizers;
        _.mixin(Bloodhound.prototype, {
            _loadPrefetch: function loadPrefetch(o) {
                var that = this, serialized, deferred;
                if (serialized = this._readFromStorage(o.thumbprint)) {
                    this.index.bootstrap(serialized);
                    deferred = $.Deferred().resolve();
                } else {
                    deferred = $.ajax(o.url, o.ajax).done(handlePrefetchResponse);
                }
                return deferred;
                function handlePrefetchResponse(resp) {
                    that.clear();
                    that.add(o.filter ? o.filter(resp) : resp);
                    that._saveToStorage(that.index.serialize(), o.thumbprint, o.ttl);
                }
            },
            _getFromRemote: function getFromRemote(query, cb) {
                var that = this, url, uriEncodedQuery;
                if (!this.transport) {
                    return;
                }
                query = query || "";
                uriEncodedQuery = encodeURIComponent(query);
                url = this.remote.replace ? this.remote.replace(this.remote.url, query) : this.remote.url.replace(this.remote.wildcard, uriEncodedQuery);
                return this.transport.get(url, this.remote.ajax, handleRemoteResponse);
                function handleRemoteResponse(err, resp) {
                    err ? cb([]) : cb(that.remote.filter ? that.remote.filter(resp) : resp);
                }
            },
            _cancelLastRemoteRequest: function cancelLastRemoteRequest() {
                this.transport && this.transport.cancel();
            },
            _saveToStorage: function saveToStorage(data, thumbprint, ttl) {
                if (this.storage) {
                    this.storage.set(keys.data, data, ttl);
                    this.storage.set(keys.protocol, location.protocol, ttl);
                    this.storage.set(keys.thumbprint, thumbprint, ttl);
                }
            },
            _readFromStorage: function readFromStorage(thumbprint) {
                var stored = {}, isExpired;
                if (this.storage) {
                    stored.data = this.storage.get(keys.data);
                    stored.protocol = this.storage.get(keys.protocol);
                    stored.thumbprint = this.storage.get(keys.thumbprint);
                }
                isExpired = stored.thumbprint !== thumbprint || stored.protocol !== location.protocol;
                return stored.data && !isExpired ? stored.data : null;
            },
            _initialize: function initialize() {
                var that = this, local = this.local, deferred;
                deferred = this.prefetch ? this._loadPrefetch(this.prefetch) : $.Deferred().resolve();
                local && deferred.done(addLocalToIndex);
                this.transport = this.remote ? new Transport(this.remote) : null;
                return this.initPromise = deferred.promise();
                function addLocalToIndex() {
                    that.add(_.isFunction(local) ? local() : local);
                }
            },
            initialize: function initialize(force) {
                return !this.initPromise || force ? this._initialize() : this.initPromise;
            },
            add: function add(data) {
                this.index.add(data);
            },
            get: function get(query, cb) {
                var that = this, matches = [], cacheHit = false;
                matches = this.index.get(query);
                matches = this.sorter(matches).slice(0, this.limit);
                matches.length < this.limit ? cacheHit = this._getFromRemote(query, returnRemoteMatches) : this._cancelLastRemoteRequest();
                if (!cacheHit) {
                    (matches.length > 0 || !this.transport) && cb && cb(matches);
                }
                function returnRemoteMatches(remoteMatches) {
                    var matchesWithBackfill = matches.slice(0);
                    _.each(remoteMatches, function(remoteMatch) {
                        var isDuplicate;
                        isDuplicate = _.some(matchesWithBackfill, function(match) {
                            return that.dupDetector(remoteMatch, match);
                        });
                        !isDuplicate && matchesWithBackfill.push(remoteMatch);
                        return matchesWithBackfill.length < that.limit;
                    });
                    cb && cb(that.sorter(matchesWithBackfill));
                }
            },
            clear: function clear() {
                this.index.reset();
            },
            clearPrefetchCache: function clearPrefetchCache() {
                this.storage && this.storage.clear();
            },
            clearRemoteCache: function clearRemoteCache() {
                this.transport && Transport.resetCache();
            },
            ttAdapter: function ttAdapter() {
                return _.bind(this.get, this);
            }
        });
        return Bloodhound;
        function getSorter(sortFn) {
            return _.isFunction(sortFn) ? sort : noSort;
            function sort(array) {
                return array.sort(sortFn);
            }
            function noSort(array) {
                return array;
            }
        }
        function ignoreDuplicates() {
            return false;
        }
    })(this);
    var html = function() {
        return {
            wrapper: '<span class="twitter-typeahead"></span>',
            dropdown: '<span class="tt-dropdown-menu"></span>',
            dataset: '<div class="tt-dataset-%CLASS%"></div>',
            suggestions: '<span class="tt-suggestions"></span>',
            suggestion: '<div class="tt-suggestion"></div>'
        };
    }();
    var css = function() {
        "use strict";
        var css = {
            wrapper: {
                position: "relative",
                display: "inline-block"
            },
            hint: {
                position: "absolute",
                top: "0",
                left: "0",
                borderColor: "transparent",
                boxShadow: "none",
                opacity: "1"
            },
            input: {
                position: "relative",
                verticalAlign: "top",
                backgroundColor: "transparent"
            },
            inputWithNoHint: {
                position: "relative",
                verticalAlign: "top"
            },
            dropdown: {
                position: "absolute",
                top: "100%",
                left: "0",
                zIndex: "100",
                display: "none"
            },
            suggestions: {
                display: "block"
            },
            suggestion: {
                whiteSpace: "nowrap",
                cursor: "pointer"
            },
            suggestionChild: {
                whiteSpace: "normal"
            },
            ltr: {
                left: "0",
                right: "auto"
            },
            rtl: {
                left: "auto",
                right: " 0"
            }
        };
        if (_.isMsie()) {
            _.mixin(css.input, {
                backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
            });
        }
        if (_.isMsie() && _.isMsie() <= 7) {
            _.mixin(css.input, {
                marginTop: "-1px"
            });
        }
        return css;
    }();
    var EventBus = function() {
        "use strict";
        var namespace = "typeahead:";
        function EventBus(o) {
            if (!o || !o.el) {
                $.error("EventBus initialized without el");
            }
            this.$el = $(o.el);
        }
        _.mixin(EventBus.prototype, {
            trigger: function(type) {
                var args = [].slice.call(arguments, 1);
                this.$el.trigger(namespace + type, args);
            }
        });
        return EventBus;
    }();
    var EventEmitter = function() {
        "use strict";
        var splitter = /\s+/, nextTick = getNextTick();
        return {
            onSync: onSync,
            onAsync: onAsync,
            off: off,
            trigger: trigger
        };
        function on(method, types, cb, context) {
            var type;
            if (!cb) {
                return this;
            }
            types = types.split(splitter);
            cb = context ? bindContext(cb, context) : cb;
            this._callbacks = this._callbacks || {};
            while (type = types.shift()) {
                this._callbacks[type] = this._callbacks[type] || {
                    sync: [],
                    async: []
                };
                this._callbacks[type][method].push(cb);
            }
            return this;
        }
        function onAsync(types, cb, context) {
            return on.call(this, "async", types, cb, context);
        }
        function onSync(types, cb, context) {
            return on.call(this, "sync", types, cb, context);
        }
        function off(types) {
            var type;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            while (type = types.shift()) {
                delete this._callbacks[type];
            }
            return this;
        }
        function trigger(types) {
            var type, callbacks, args, syncFlush, asyncFlush;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            args = [].slice.call(arguments, 1);
            while ((type = types.shift()) && (callbacks = this._callbacks[type])) {
                syncFlush = getFlush(callbacks.sync, this, [ type ].concat(args));
                asyncFlush = getFlush(callbacks.async, this, [ type ].concat(args));
                syncFlush() && nextTick(asyncFlush);
            }
            return this;
        }
        function getFlush(callbacks, context, args) {
            return flush;
            function flush() {
                var cancelled;
                for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
                    cancelled = callbacks[i].apply(context, args) === false;
                }
                return !cancelled;
            }
        }
        function getNextTick() {
            var nextTickFn;
            if (window.setImmediate) {
                nextTickFn = function nextTickSetImmediate(fn) {
                    setImmediate(function() {
                        fn();
                    });
                };
            } else {
                nextTickFn = function nextTickSetTimeout(fn) {
                    setTimeout(function() {
                        fn();
                    }, 0);
                };
            }
            return nextTickFn;
        }
        function bindContext(fn, context) {
            return fn.bind ? fn.bind(context) : function() {
                fn.apply(context, [].slice.call(arguments, 0));
            };
        }
    }();
    var highlight = function(doc) {
        "use strict";
        var defaults = {
            node: null,
            pattern: null,
            tagName: "strong",
            className: null,
            wordsOnly: false,
            caseSensitive: false
        };
        return function hightlight(o) {
            var regex;
            o = _.mixin({}, defaults, o);
            if (!o.node || !o.pattern) {
                return;
            }
            o.pattern = _.isArray(o.pattern) ? o.pattern : [ o.pattern ];
            regex = getRegex(o.pattern, o.caseSensitive, o.wordsOnly);
            traverse(o.node, hightlightTextNode);
            function hightlightTextNode(textNode) {
                var match, patternNode, wrapperNode;
                if (match = regex.exec(textNode.data)) {
                    wrapperNode = doc.createElement(o.tagName);
                    o.className && (wrapperNode.className = o.className);
                    patternNode = textNode.splitText(match.index);
                    patternNode.splitText(match[0].length);
                    wrapperNode.appendChild(patternNode.cloneNode(true));
                    textNode.parentNode.replaceChild(wrapperNode, patternNode);
                }
                return !!match;
            }
            function traverse(el, hightlightTextNode) {
                var childNode, TEXT_NODE_TYPE = 3;
                for (var i = 0; i < el.childNodes.length; i++) {
                    childNode = el.childNodes[i];
                    if (childNode.nodeType === TEXT_NODE_TYPE) {
                        i += hightlightTextNode(childNode) ? 1 : 0;
                    } else {
                        traverse(childNode, hightlightTextNode);
                    }
                }
            }
        };
        function getRegex(patterns, caseSensitive, wordsOnly) {
            var escapedPatterns = [], regexStr;
            for (var i = 0, len = patterns.length; i < len; i++) {
                escapedPatterns.push(_.escapeRegExChars(patterns[i]));
            }
            regexStr = wordsOnly ? "\\b(" + escapedPatterns.join("|") + ")\\b" : "(" + escapedPatterns.join("|") + ")";
            return caseSensitive ? new RegExp(regexStr) : new RegExp(regexStr, "i");
        }
    }(window.document);
    var Input = function() {
        "use strict";
        var specialKeyCodeMap;
        specialKeyCodeMap = {
            9: "tab",
            27: "esc",
            37: "left",
            39: "right",
            13: "enter",
            38: "up",
            40: "down"
        };
        function Input(o) {
            var that = this, onBlur, onFocus, onKeydown, onInput;
            o = o || {};
            if (!o.input) {
                $.error("input is missing");
            }
            onBlur = _.bind(this._onBlur, this);
            onFocus = _.bind(this._onFocus, this);
            onKeydown = _.bind(this._onKeydown, this);
            onInput = _.bind(this._onInput, this);
            this.$hint = $(o.hint);
            this.$input = $(o.input).on("blur.tt", onBlur).on("focus.tt", onFocus).on("keydown.tt", onKeydown);
            if (this.$hint.length === 0) {
                this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
            }
            if (!_.isMsie()) {
                this.$input.on("input.tt", onInput);
            } else {
                this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function($e) {
                    if (specialKeyCodeMap[$e.which || $e.keyCode]) {
                        return;
                    }
                    _.defer(_.bind(that._onInput, that, $e));
                });
            }
            this.query = this.$input.val();
            this.$overflowHelper = buildOverflowHelper(this.$input);
        }
        Input.normalizeQuery = function(str) {
            return (str || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
        };
        _.mixin(Input.prototype, EventEmitter, {
            _onBlur: function onBlur() {
                this.resetInputValue();
                this.trigger("blurred");
            },
            _onFocus: function onFocus() {
                this.trigger("focused");
            },
            _onKeydown: function onKeydown($e) {
                var keyName = specialKeyCodeMap[$e.which || $e.keyCode];
                this._managePreventDefault(keyName, $e);
                if (keyName && this._shouldTrigger(keyName, $e)) {
                    this.trigger(keyName + "Keyed", $e);
                }
            },
            _onInput: function onInput() {
                this._checkInputValue();
            },
            _managePreventDefault: function managePreventDefault(keyName, $e) {
                var preventDefault, hintValue, inputValue;
                switch (keyName) {
                  case "tab":
                    hintValue = this.getHint();
                    inputValue = this.getInputValue();
                    preventDefault = hintValue && hintValue !== inputValue && !withModifier($e);
                    break;

                  case "up":
                  case "down":
                    preventDefault = !withModifier($e);
                    break;

                  default:
                    preventDefault = false;
                }
                preventDefault && $e.preventDefault();
            },
            _shouldTrigger: function shouldTrigger(keyName, $e) {
                var trigger;
                switch (keyName) {
                  case "tab":
                    trigger = !withModifier($e);
                    break;

                  default:
                    trigger = true;
                }
                return trigger;
            },
            _checkInputValue: function checkInputValue() {
                var inputValue, areEquivalent, hasDifferentWhitespace;
                inputValue = this.getInputValue();
                areEquivalent = areQueriesEquivalent(inputValue, this.query);
                hasDifferentWhitespace = areEquivalent ? this.query.length !== inputValue.length : false;
                this.query = inputValue;
                if (!areEquivalent) {
                    this.trigger("queryChanged", this.query);
                } else if (hasDifferentWhitespace) {
                    this.trigger("whitespaceChanged", this.query);
                }
            },
            focus: function focus() {
                this.$input.focus();
            },
            blur: function blur() {
                this.$input.blur();
            },
            getQuery: function getQuery() {
                return this.query;
            },
            setQuery: function setQuery(query) {
                this.query = query;
            },
            getInputValue: function getInputValue() {
                return this.$input.val();
            },
            setInputValue: function setInputValue(value, silent) {
                this.$input.val(value);
                silent ? this.clearHint() : this._checkInputValue();
            },
            resetInputValue: function resetInputValue() {
                this.setInputValue(this.query, true);
            },
            getHint: function getHint() {
                return this.$hint.val();
            },
            setHint: function setHint(value) {
                this.$hint.val(value);
            },
            clearHint: function clearHint() {
                this.setHint("");
            },
            clearHintIfInvalid: function clearHintIfInvalid() {
                var val, hint, valIsPrefixOfHint, isValid;
                val = this.getInputValue();
                hint = this.getHint();
                valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
                isValid = val !== "" && valIsPrefixOfHint && !this.hasOverflow();
                !isValid && this.clearHint();
            },
            getLanguageDirection: function getLanguageDirection() {
                return (this.$input.css("direction") || "ltr").toLowerCase();
            },
            hasOverflow: function hasOverflow() {
                var constraint = this.$input.width() - 2;
                this.$overflowHelper.text(this.getInputValue());
                return this.$overflowHelper.width() >= constraint;
            },
            isCursorAtEnd: function() {
                var valueLength, selectionStart, range;
                valueLength = this.$input.val().length;
                selectionStart = this.$input[0].selectionStart;
                if (_.isNumber(selectionStart)) {
                    return selectionStart === valueLength;
                } else if (document.selection) {
                    range = document.selection.createRange();
                    range.moveStart("character", -valueLength);
                    return valueLength === range.text.length;
                }
                return true;
            },
            destroy: function destroy() {
                this.$hint.off(".tt");
                this.$input.off(".tt");
                this.$hint = this.$input = this.$overflowHelper = null;
            }
        });
        return Input;
        function buildOverflowHelper($input) {
            return $('<pre aria-hidden="true"></pre>').css({
                position: "absolute",
                visibility: "hidden",
                whiteSpace: "pre",
                fontFamily: $input.css("font-family"),
                fontSize: $input.css("font-size"),
                fontStyle: $input.css("font-style"),
                fontVariant: $input.css("font-variant"),
                fontWeight: $input.css("font-weight"),
                wordSpacing: $input.css("word-spacing"),
                letterSpacing: $input.css("letter-spacing"),
                textIndent: $input.css("text-indent"),
                textRendering: $input.css("text-rendering"),
                textTransform: $input.css("text-transform")
            }).insertAfter($input);
        }
        function areQueriesEquivalent(a, b) {
            return Input.normalizeQuery(a) === Input.normalizeQuery(b);
        }
        function withModifier($e) {
            return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
        }
    }();
    var Dataset = function() {
        "use strict";
        var datasetKey = "ttDataset", valueKey = "ttValue", datumKey = "ttDatum";
        function Dataset(o) {
            o = o || {};
            o.templates = o.templates || {};
            if (!o.source) {
                $.error("missing source");
            }
            if (o.name && !isValidName(o.name)) {
                $.error("invalid dataset name: " + o.name);
            }
            this.query = null;
            this.highlight = !!o.highlight;
            this.name = o.name || _.getUniqueId();
            this.source = o.source;
            this.displayFn = getDisplayFn(o.display || o.displayKey);
            this.templates = getTemplates(o.templates, this.displayFn);
            this.$el = $(html.dataset.replace("%CLASS%", this.name));
        }
        Dataset.extractDatasetName = function extractDatasetName(el) {
            return $(el).data(datasetKey);
        };
        Dataset.extractValue = function extractDatum(el) {
            return $(el).data(valueKey);
        };
        Dataset.extractDatum = function extractDatum(el) {
            return $(el).data(datumKey);
        };
        _.mixin(Dataset.prototype, EventEmitter, {
            _render: function render(query, suggestions) {
                if (!this.$el) {
                    return;
                }
                var that = this, hasSuggestions;
                this.$el.empty();
                hasSuggestions = suggestions && suggestions.length;
                if (!hasSuggestions && this.templates.empty) {
                    this.$el.html(getEmptyHtml()).prepend(that.templates.header ? getHeaderHtml() : null).append(that.templates.footer ? getFooterHtml() : null);
                } else if (hasSuggestions) {
                    this.$el.html(getSuggestionsHtml()).prepend(that.templates.header ? getHeaderHtml() : null).append(that.templates.footer ? getFooterHtml() : null);
                }
                this.trigger("rendered");
                function getEmptyHtml() {
                    return that.templates.empty({
                        query: query,
                        isEmpty: true
                    });
                }
                function getSuggestionsHtml() {
                    var $suggestions, nodes;
                    $suggestions = $(html.suggestions).css(css.suggestions);
                    nodes = _.map(suggestions, getSuggestionNode);
                    $suggestions.append.apply($suggestions, nodes);
                    that.highlight && highlight({
                        className: "tt-highlight",
                        node: $suggestions[0],
                        pattern: query
                    });
                    return $suggestions;
                    function getSuggestionNode(suggestion) {
                        var $el;
                        $el = $(html.suggestion).append(that.templates.suggestion(suggestion)).data(datasetKey, that.name).data(valueKey, that.displayFn(suggestion)).data(datumKey, suggestion);
                        $el.children().each(function() {
                            $(this).css(css.suggestionChild);
                        });
                        return $el;
                    }
                }
                function getHeaderHtml() {
                    return that.templates.header({
                        query: query,
                        isEmpty: !hasSuggestions
                    });
                }
                function getFooterHtml() {
                    return that.templates.footer({
                        query: query,
                        isEmpty: !hasSuggestions
                    });
                }
            },
            getRoot: function getRoot() {
                return this.$el;
            },
            update: function update(query) {
                var that = this;
                this.query = query;
                this.canceled = false;
                this.source(query, render);
                function render(suggestions) {
                    if (!that.canceled && query === that.query) {
                        that._render(query, suggestions);
                    }
                }
            },
            cancel: function cancel() {
                this.canceled = true;
            },
            clear: function clear() {
                this.cancel();
                this.$el.empty();
                this.trigger("rendered");
            },
            isEmpty: function isEmpty() {
                return this.$el.is(":empty");
            },
            destroy: function destroy() {
                this.$el = null;
            }
        });
        return Dataset;
        function getDisplayFn(display) {
            display = display || "value";
            return _.isFunction(display) ? display : displayFn;
            function displayFn(obj) {
                return obj[display];
            }
        }
        function getTemplates(templates, displayFn) {
            return {
                empty: templates.empty && _.templatify(templates.empty),
                header: templates.header && _.templatify(templates.header),
                footer: templates.footer && _.templatify(templates.footer),
                suggestion: templates.suggestion || suggestionTemplate
            };
            function suggestionTemplate(context) {
                return "<p>" + displayFn(context) + "</p>";
            }
        }
        function isValidName(str) {
            return /^[_a-zA-Z0-9-]+$/.test(str);
        }
    }();
    var Dropdown = function() {
        "use strict";
        function Dropdown(o) {
            var that = this, onSuggestionClick, onSuggestionMouseEnter, onSuggestionMouseLeave;
            o = o || {};
            if (!o.menu) {
                $.error("menu is required");
            }
            this.isOpen = false;
            this.isEmpty = true;
            this.datasets = _.map(o.datasets, initializeDataset);
            onSuggestionClick = _.bind(this._onSuggestionClick, this);
            onSuggestionMouseEnter = _.bind(this._onSuggestionMouseEnter, this);
            onSuggestionMouseLeave = _.bind(this._onSuggestionMouseLeave, this);
            this.$menu = $(o.menu).on("click.tt", ".tt-suggestion", onSuggestionClick).on("mouseenter.tt", ".tt-suggestion", onSuggestionMouseEnter).on("mouseleave.tt", ".tt-suggestion", onSuggestionMouseLeave);
            _.each(this.datasets, function(dataset) {
                that.$menu.append(dataset.getRoot());
                dataset.onSync("rendered", that._onRendered, that);
            });
        }
        _.mixin(Dropdown.prototype, EventEmitter, {
            _onSuggestionClick: function onSuggestionClick($e) {
                this.trigger("suggestionClicked", $($e.currentTarget));
            },
            _onSuggestionMouseEnter: function onSuggestionMouseEnter($e) {
                this._removeCursor();
                this._setCursor($($e.currentTarget), true);
            },
            _onSuggestionMouseLeave: function onSuggestionMouseLeave() {
                this._removeCursor();
            },
            _onRendered: function onRendered() {
                this.isEmpty = _.every(this.datasets, isDatasetEmpty);
                this.isEmpty ? this._hide() : this.isOpen && this._show();
                this.trigger("datasetRendered");
                function isDatasetEmpty(dataset) {
                    return dataset.isEmpty();
                }
            },
            _hide: function() {
                this.$menu.hide();
            },
            _show: function() {
                this.$menu.css("display", "block");
            },
            _getSuggestions: function getSuggestions() {
                return this.$menu.find(".tt-suggestion");
            },
            _getCursor: function getCursor() {
                return this.$menu.find(".tt-cursor").first();
            },
            _setCursor: function setCursor($el, silent) {
                $el.first().addClass("tt-cursor");
                !silent && this.trigger("cursorMoved");
            },
            _removeCursor: function removeCursor() {
                this._getCursor().removeClass("tt-cursor");
            },
            _moveCursor: function moveCursor(increment) {
                var $suggestions, $oldCursor, newCursorIndex, $newCursor;
                if (!this.isOpen) {
                    return;
                }
                $oldCursor = this._getCursor();
                $suggestions = this._getSuggestions();
                this._removeCursor();
                newCursorIndex = $suggestions.index($oldCursor) + increment;
                newCursorIndex = (newCursorIndex + 1) % ($suggestions.length + 1) - 1;
                if (newCursorIndex === -1) {
                    this.trigger("cursorRemoved");
                    return;
                } else if (newCursorIndex < -1) {
                    newCursorIndex = $suggestions.length - 1;
                }
                this._setCursor($newCursor = $suggestions.eq(newCursorIndex));
                this._ensureVisible($newCursor);
            },
            _ensureVisible: function ensureVisible($el) {
                var elTop, elBottom, menuScrollTop, menuHeight;
                elTop = $el.position().top;
                elBottom = elTop + $el.outerHeight(true);
                menuScrollTop = this.$menu.scrollTop();
                menuHeight = this.$menu.height() + parseInt(this.$menu.css("paddingTop"), 10) + parseInt(this.$menu.css("paddingBottom"), 10);
                if (elTop < 0) {
                    this.$menu.scrollTop(menuScrollTop + elTop);
                } else if (menuHeight < elBottom) {
                    this.$menu.scrollTop(menuScrollTop + (elBottom - menuHeight));
                }
            },
            close: function close() {
                if (this.isOpen) {
                    this.isOpen = false;
                    this._removeCursor();
                    this._hide();
                    this.trigger("closed");
                }
            },
            open: function open() {
                if (!this.isOpen) {
                    this.isOpen = true;
                    !this.isEmpty && this._show();
                    this.trigger("opened");
                }
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$menu.css(dir === "ltr" ? css.ltr : css.rtl);
            },
            moveCursorUp: function moveCursorUp() {
                this._moveCursor(-1);
            },
            moveCursorDown: function moveCursorDown() {
                this._moveCursor(+1);
            },
            getDatumForSuggestion: function getDatumForSuggestion($el) {
                var datum = null;
                if ($el.length) {
                    datum = {
                        raw: Dataset.extractDatum($el),
                        value: Dataset.extractValue($el),
                        datasetName: Dataset.extractDatasetName($el)
                    };
                }
                return datum;
            },
            getDatumForCursor: function getDatumForCursor() {
                return this.getDatumForSuggestion(this._getCursor().first());
            },
            getDatumForTopSuggestion: function getDatumForTopSuggestion() {
                return this.getDatumForSuggestion(this._getSuggestions().first());
            },
            update: function update(query) {
                _.each(this.datasets, updateDataset);
                function updateDataset(dataset) {
                    dataset.update(query);
                }
            },
            empty: function empty() {
                _.each(this.datasets, clearDataset);
                this.isEmpty = true;
                function clearDataset(dataset) {
                    dataset.clear();
                }
            },
            isVisible: function isVisible() {
                return this.isOpen && !this.isEmpty;
            },
            destroy: function destroy() {
                this.$menu.off(".tt");
                this.$menu = null;
                _.each(this.datasets, destroyDataset);
                function destroyDataset(dataset) {
                    dataset.destroy();
                }
            }
        });
        return Dropdown;
        function initializeDataset(oDataset) {
            return new Dataset(oDataset);
        }
    }();
    var Typeahead = function() {
        "use strict";
        var attrsKey = "ttAttrs";
        function Typeahead(o) {
            var $menu, $input, $hint;
            o = o || {};
            if (!o.input) {
                $.error("missing input");
            }
            this.isActivated = false;
            this.autoselect = !!o.autoselect;
            this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
            this.$node = buildDom(o.input, o.withHint);
            $menu = this.$node.find(".tt-dropdown-menu");
            $input = this.$node.find(".tt-input");
            $hint = this.$node.find(".tt-hint");
            $input.on("blur.tt", function($e) {
                var active, isActive, hasActive;
                active = document.activeElement;
                isActive = $menu.is(active);
                hasActive = $menu.has(active).length > 0;
                if (_.isMsie() && (isActive || hasActive)) {
                    $e.preventDefault();
                    $e.stopImmediatePropagation();
                    _.defer(function() {
                        $input.focus();
                    });
                }
            });
            $menu.on("mousedown.tt", function($e) {
                $e.preventDefault();
            });
            this.eventBus = o.eventBus || new EventBus({
                el: $input
            });
            this.dropdown = new Dropdown({
                menu: $menu,
                datasets: o.datasets
            }).onSync("suggestionClicked", this._onSuggestionClicked, this).onSync("cursorMoved", this._onCursorMoved, this).onSync("cursorRemoved", this._onCursorRemoved, this).onSync("opened", this._onOpened, this).onSync("closed", this._onClosed, this).onAsync("datasetRendered", this._onDatasetRendered, this);
            this.input = new Input({
                input: $input,
                hint: $hint
            }).onSync("focused", this._onFocused, this).onSync("blurred", this._onBlurred, this).onSync("enterKeyed", this._onEnterKeyed, this).onSync("tabKeyed", this._onTabKeyed, this).onSync("escKeyed", this._onEscKeyed, this).onSync("upKeyed", this._onUpKeyed, this).onSync("downKeyed", this._onDownKeyed, this).onSync("leftKeyed", this._onLeftKeyed, this).onSync("rightKeyed", this._onRightKeyed, this).onSync("queryChanged", this._onQueryChanged, this).onSync("whitespaceChanged", this._onWhitespaceChanged, this);
            this._setLanguageDirection();
        }
        _.mixin(Typeahead.prototype, {
            _onSuggestionClicked: function onSuggestionClicked(type, $el) {
                var datum;
                if (datum = this.dropdown.getDatumForSuggestion($el)) {
                    this._select(datum);
                }
            },
            _onCursorMoved: function onCursorMoved() {
                var datum = this.dropdown.getDatumForCursor();
                this.input.setInputValue(datum.value, true);
                this.eventBus.trigger("cursorchanged", datum.raw, datum.datasetName);
            },
            _onCursorRemoved: function onCursorRemoved() {
                this.input.resetInputValue();
                this._updateHint();
            },
            _onDatasetRendered: function onDatasetRendered() {
                this._updateHint();
            },
            _onOpened: function onOpened() {
                this._updateHint();
                this.eventBus.trigger("opened");
            },
            _onClosed: function onClosed() {
                this.input.clearHint();
                this.eventBus.trigger("closed");
            },
            _onFocused: function onFocused() {
                this.isActivated = true;
                this.dropdown.open();
            },
            _onBlurred: function onBlurred() {
                this.isActivated = false;
                this.dropdown.empty();
                this.dropdown.close();
            },
            _onEnterKeyed: function onEnterKeyed(type, $e) {
                var cursorDatum, topSuggestionDatum;
                cursorDatum = this.dropdown.getDatumForCursor();
                topSuggestionDatum = this.dropdown.getDatumForTopSuggestion();
                if (cursorDatum) {
                    this._select(cursorDatum);
                    $e.preventDefault();
                } else if (this.autoselect && topSuggestionDatum) {
                    this._select(topSuggestionDatum);
                    $e.preventDefault();
                }
            },
            _onTabKeyed: function onTabKeyed(type, $e) {
                var datum;
                if (datum = this.dropdown.getDatumForCursor()) {
                    this._select(datum);
                    $e.preventDefault();
                } else {
                    this._autocomplete(true);
                }
            },
            _onEscKeyed: function onEscKeyed() {
                this.dropdown.close();
                this.input.resetInputValue();
            },
            _onUpKeyed: function onUpKeyed() {
                var query = this.input.getQuery();
                this.dropdown.isEmpty && query.length >= this.minLength ? this.dropdown.update(query) : this.dropdown.moveCursorUp();
                this.dropdown.open();
            },
            _onDownKeyed: function onDownKeyed() {
                var query = this.input.getQuery();
                this.dropdown.isEmpty && query.length >= this.minLength ? this.dropdown.update(query) : this.dropdown.moveCursorDown();
                this.dropdown.open();
            },
            _onLeftKeyed: function onLeftKeyed() {
                this.dir === "rtl" && this._autocomplete();
            },
            _onRightKeyed: function onRightKeyed() {
                this.dir === "ltr" && this._autocomplete();
            },
            _onQueryChanged: function onQueryChanged(e, query) {
                this.input.clearHintIfInvalid();
                query.length >= this.minLength ? this.dropdown.update(query) : this.dropdown.empty();
                this.dropdown.open();
                this._setLanguageDirection();
            },
            _onWhitespaceChanged: function onWhitespaceChanged() {
                this._updateHint();
                this.dropdown.open();
            },
            _setLanguageDirection: function setLanguageDirection() {
                var dir;
                if (this.dir !== (dir = this.input.getLanguageDirection())) {
                    this.dir = dir;
                    this.$node.css("direction", dir);
                    this.dropdown.setLanguageDirection(dir);
                }
            },
            _updateHint: function updateHint() {
                var datum, val, query, escapedQuery, frontMatchRegEx, match;
                datum = this.dropdown.getDatumForTopSuggestion();
                if (datum && this.dropdown.isVisible() && !this.input.hasOverflow()) {
                    val = this.input.getInputValue();
                    query = Input.normalizeQuery(val);
                    escapedQuery = _.escapeRegExChars(query);
                    frontMatchRegEx = new RegExp("^(?:" + escapedQuery + ")(.+$)", "i");
                    match = frontMatchRegEx.exec(datum.value);
                    match ? this.input.setHint(val + match[1]) : this.input.clearHint();
                } else {
                    this.input.clearHint();
                }
            },
            _autocomplete: function autocomplete(laxCursor) {
                var hint, query, isCursorAtEnd, datum;
                hint = this.input.getHint();
                query = this.input.getQuery();
                isCursorAtEnd = laxCursor || this.input.isCursorAtEnd();
                if (hint && query !== hint && isCursorAtEnd) {
                    datum = this.dropdown.getDatumForTopSuggestion();
                    datum && this.input.setInputValue(datum.value);
                    this.eventBus.trigger("autocompleted", datum.raw, datum.datasetName);
                }
            },
            _select: function select(datum) {
                this.input.setQuery(datum.value);
                this.input.setInputValue(datum.value, true);
                this._setLanguageDirection();
                this.eventBus.trigger("selected", datum.raw, datum.datasetName);
                this.dropdown.close();
                _.defer(_.bind(this.dropdown.empty, this.dropdown));
            },
            open: function open() {
                this.dropdown.open();
            },
            close: function close() {
                this.dropdown.close();
            },
            setVal: function setVal(val) {
                val = _.toStr(val);
                if (this.isActivated) {
                    this.input.setInputValue(val);
                } else {
                    this.input.setQuery(val);
                    this.input.setInputValue(val, true);
                }
                this._setLanguageDirection();
            },
            getVal: function getVal() {
                return this.input.getQuery();
            },
            destroy: function destroy() {
                this.input.destroy();
                this.dropdown.destroy();
                destroyDomStructure(this.$node);
                this.$node = null;
            }
        });
        return Typeahead;
        function buildDom(input, withHint) {
            var $input, $wrapper, $dropdown, $hint;
            $input = $(input);
            $wrapper = $(html.wrapper).css(css.wrapper);
            $dropdown = $(html.dropdown).css(css.dropdown);
            $hint = $input.clone().css(css.hint).css(getBackgroundStyles($input));
            $hint.val("").removeData().addClass("tt-hint").removeAttr("id name placeholder required").prop("readonly", true).attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            });
            $input.data(attrsKey, {
                dir: $input.attr("dir"),
                autocomplete: $input.attr("autocomplete"),
                spellcheck: $input.attr("spellcheck"),
                style: $input.attr("style")
            });
            $input.addClass("tt-input").attr({
                autocomplete: "off",
                spellcheck: false
            }).css(withHint ? css.input : css.inputWithNoHint);
            try {
                !$input.attr("dir") && $input.attr("dir", "auto");
            } catch (e) {}
            return $input.wrap($wrapper).parent().prepend(withHint ? $hint : null).append($dropdown);
        }
        function getBackgroundStyles($el) {
            return {
                backgroundAttachment: $el.css("background-attachment"),
                backgroundClip: $el.css("background-clip"),
                backgroundColor: $el.css("background-color"),
                backgroundImage: $el.css("background-image"),
                backgroundOrigin: $el.css("background-origin"),
                backgroundPosition: $el.css("background-position"),
                backgroundRepeat: $el.css("background-repeat"),
                backgroundSize: $el.css("background-size")
            };
        }
        function destroyDomStructure($node) {
            var $input = $node.find(".tt-input");
            _.each($input.data(attrsKey), function(val, key) {
                _.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val);
            });
            $input.detach().removeData(attrsKey).removeClass("tt-input").insertAfter($node);
            $node.remove();
        }
    }();
    (function() {
        "use strict";
        var old, typeaheadKey, methods;
        old = $.fn.typeahead;
        typeaheadKey = "ttTypeahead";
        methods = {
            initialize: function initialize(o, datasets) {
                datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 1);
                o = o || {};
                return this.each(attach);
                function attach() {
                    var $input = $(this), eventBus, typeahead;
                    _.each(datasets, function(d) {
                        d.highlight = !!o.highlight;
                    });
                    typeahead = new Typeahead({
                        input: $input,
                        eventBus: eventBus = new EventBus({
                            el: $input
                        }),
                        withHint: _.isUndefined(o.hint) ? true : !!o.hint,
                        minLength: o.minLength,
                        autoselect: o.autoselect,
                        datasets: datasets
                    });
                    $input.data(typeaheadKey, typeahead);
                }
            },
            open: function open() {
                return this.each(openTypeahead);
                function openTypeahead() {
                    var $input = $(this), typeahead;
                    if (typeahead = $input.data(typeaheadKey)) {
                        typeahead.open();
                    }
                }
            },
            close: function close() {
                return this.each(closeTypeahead);
                function closeTypeahead() {
                    var $input = $(this), typeahead;
                    if (typeahead = $input.data(typeaheadKey)) {
                        typeahead.close();
                    }
                }
            },
            val: function val(newVal) {
                return !arguments.length ? getVal(this.first()) : this.each(setVal);
                function setVal() {
                    var $input = $(this), typeahead;
                    if (typeahead = $input.data(typeaheadKey)) {
                        typeahead.setVal(newVal);
                    }
                }
                function getVal($input) {
                    var typeahead, query;
                    if (typeahead = $input.data(typeaheadKey)) {
                        query = typeahead.getVal();
                    }
                    return query;
                }
            },
            destroy: function destroy() {
                return this.each(unattach);
                function unattach() {
                    var $input = $(this), typeahead;
                    if (typeahead = $input.data(typeaheadKey)) {
                        typeahead.destroy();
                        $input.removeData(typeaheadKey);
                    }
                }
            }
        };
        $.fn.typeahead = function(method) {
            var tts;
            if (methods[method] && method !== "initialize") {
                tts = this.filter(function() {
                    return !!$(this).data(typeaheadKey);
                });
                return methods[method].apply(tts, [].slice.call(arguments, 1));
            } else {
                return methods.initialize.apply(this, arguments);
            }
        };
        $.fn.typeahead.noConflict = function noConflict() {
            $.fn.typeahead = old;
            return this;
        };
    })();
})(window.jQuery);
/*!
 * typeahead.js 0.10.5
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

(function($) {
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            getUniqueId: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            }(),
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            noop: function() {}
        };
    }();
    var html = function() {
        return {
            wrapper: '<span class="twitter-typeahead"></span>',
            dropdown: '<span class="tt-dropdown-menu"></span>',
            dataset: '<div class="tt-dataset-%CLASS%"></div>',
            suggestions: '<span class="tt-suggestions"></span>',
            suggestion: '<div class="tt-suggestion"></div>'
        };
    }();
    var css = function() {
        "use strict";
        var css = {
            wrapper: {
                position: "relative",
                display: "inline-block"
            },
            hint: {
                position: "absolute",
                top: "0",
                left: "0",
                borderColor: "transparent",
                boxShadow: "none",
                opacity: "1"
            },
            input: {
                position: "relative",
                verticalAlign: "top",
                backgroundColor: "transparent"
            },
            inputWithNoHint: {
                position: "relative",
                verticalAlign: "top"
            },
            dropdown: {
                position: "absolute",
                top: "100%",
                left: "0",
                zIndex: "100",
                display: "none"
            },
            suggestions: {
                display: "block"
            },
            suggestion: {
                whiteSpace: "nowrap",
                cursor: "pointer"
            },
            suggestionChild: {
                whiteSpace: "normal"
            },
            ltr: {
                left: "0",
                right: "auto"
            },
            rtl: {
                left: "auto",
                right: " 0"
            }
        };
        if (_.isMsie()) {
            _.mixin(css.input, {
                backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
            });
        }
        if (_.isMsie() && _.isMsie() <= 7) {
            _.mixin(css.input, {
                marginTop: "-1px"
            });
        }
        return css;
    }();
    var EventBus = function() {
        "use strict";
        var namespace = "typeahead:";
        function EventBus(o) {
            if (!o || !o.el) {
                $.error("EventBus initialized without el");
            }
            this.$el = $(o.el);
        }
        _.mixin(EventBus.prototype, {
            trigger: function(type) {
                var args = [].slice.call(arguments, 1);
                this.$el.trigger(namespace + type, args);
            }
        });
        return EventBus;
    }();
    var EventEmitter = function() {
        "use strict";
        var splitter = /\s+/, nextTick = getNextTick();
        return {
            onSync: onSync,
            onAsync: onAsync,
            off: off,
            trigger: trigger
        };
        function on(method, types, cb, context) {
            var type;
            if (!cb) {
                return this;
            }
            types = types.split(splitter);
            cb = context ? bindContext(cb, context) : cb;
            this._callbacks = this._callbacks || {};
            while (type = types.shift()) {
                this._callbacks[type] = this._callbacks[type] || {
                    sync: [],
                    async: []
                };
                this._callbacks[type][method].push(cb);
            }
            return this;
        }
        function onAsync(types, cb, context) {
            return on.call(this, "async", types, cb, context);
        }
        function onSync(types, cb, context) {
            return on.call(this, "sync", types, cb, context);
        }
        function off(types) {
            var type;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            while (type = types.shift()) {
                delete this._callbacks[type];
            }
            return this;
        }
        function trigger(types) {
            var type, callbacks, args, syncFlush, asyncFlush;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            args = [].slice.call(arguments, 1);
            while ((type = types.shift()) && (callbacks = this._callbacks[type])) {
                syncFlush = getFlush(callbacks.sync, this, [ type ].concat(args));
                asyncFlush = getFlush(callbacks.async, this, [ type ].concat(args));
                syncFlush() && nextTick(asyncFlush);
            }
            return this;
        }
        function getFlush(callbacks, context, args) {
            return flush;
            function flush() {
                var cancelled;
                for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
                    cancelled = callbacks[i].apply(context, args) === false;
                }
                return !cancelled;
            }
        }
        function getNextTick() {
            var nextTickFn;
            if (window.setImmediate) {
                nextTickFn = function nextTickSetImmediate(fn) {
                    setImmediate(function() {
                        fn();
                    });
                };
            } else {
                nextTickFn = function nextTickSetTimeout(fn) {
                    setTimeout(function() {
                        fn();
                    }, 0);
                };
            }
            return nextTickFn;
        }
        function bindContext(fn, context) {
            return fn.bind ? fn.bind(context) : function() {
                fn.apply(context, [].slice.call(arguments, 0));
            };
        }
    }();
    var highlight = function(doc) {
        "use strict";
        var defaults = {
            node: null,
            pattern: null,
            tagName: "strong",
            className: null,
            wordsOnly: false,
            caseSensitive: false
        };
        return function hightlight(o) {
            var regex;
            o = _.mixin({}, defaults, o);
            if (!o.node || !o.pattern) {
                return;
            }
            o.pattern = _.isArray(o.pattern) ? o.pattern : [ o.pattern ];
            regex = getRegex(o.pattern, o.caseSensitive, o.wordsOnly);
            traverse(o.node, hightlightTextNode);
            function hightlightTextNode(textNode) {
                var match, patternNode, wrapperNode;
                if (match = regex.exec(textNode.data)) {
                    wrapperNode = doc.createElement(o.tagName);
                    o.className && (wrapperNode.className = o.className);
                    patternNode = textNode.splitText(match.index);
                    patternNode.splitText(match[0].length);
                    wrapperNode.appendChild(patternNode.cloneNode(true));
                    textNode.parentNode.replaceChild(wrapperNode, patternNode);
                }
                return !!match;
            }
            function traverse(el, hightlightTextNode) {
                var childNode, TEXT_NODE_TYPE = 3;
                for (var i = 0; i < el.childNodes.length; i++) {
                    childNode = el.childNodes[i];
                    if (childNode.nodeType === TEXT_NODE_TYPE) {
                        i += hightlightTextNode(childNode) ? 1 : 0;
                    } else {
                        traverse(childNode, hightlightTextNode);
                    }
                }
            }
        };
        function getRegex(patterns, caseSensitive, wordsOnly) {
            var escapedPatterns = [], regexStr;
            for (var i = 0, len = patterns.length; i < len; i++) {
                escapedPatterns.push(_.escapeRegExChars(patterns[i]));
            }
            regexStr = wordsOnly ? "\\b(" + escapedPatterns.join("|") + ")\\b" : "(" + escapedPatterns.join("|") + ")";
            return caseSensitive ? new RegExp(regexStr) : new RegExp(regexStr, "i");
        }
    }(window.document);
    var Input = function() {
        "use strict";
        var specialKeyCodeMap;
        specialKeyCodeMap = {
            9: "tab",
            27: "esc",
            37: "left",
            39: "right",
            13: "enter",
            38: "up",
            40: "down"
        };
        function Input(o) {
            var that = this, onBlur, onFocus, onKeydown, onInput;
            o = o || {};
            if (!o.input) {
                $.error("input is missing");
            }
            onBlur = _.bind(this._onBlur, this);
            onFocus = _.bind(this._onFocus, this);
            onKeydown = _.bind(this._onKeydown, this);
            onInput = _.bind(this._onInput, this);
            this.$hint = $(o.hint);
            this.$input = $(o.input).on("blur.tt", onBlur).on("focus.tt", onFocus).on("keydown.tt", onKeydown);
            if (this.$hint.length === 0) {
                this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
            }
            if (!_.isMsie()) {
                this.$input.on("input.tt", onInput);
            } else {
                this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function($e) {
                    if (specialKeyCodeMap[$e.which || $e.keyCode]) {
                        return;
                    }
                    _.defer(_.bind(that._onInput, that, $e));
                });
            }
            this.query = this.$input.val();
            this.$overflowHelper = buildOverflowHelper(this.$input);
        }
        Input.normalizeQuery = function(str) {
            return (str || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
        };
        _.mixin(Input.prototype, EventEmitter, {
            _onBlur: function onBlur() {
                this.resetInputValue();
                this.trigger("blurred");
            },
            _onFocus: function onFocus() {
                this.trigger("focused");
            },
            _onKeydown: function onKeydown($e) {
                var keyName = specialKeyCodeMap[$e.which || $e.keyCode];
                this._managePreventDefault(keyName, $e);
                if (keyName && this._shouldTrigger(keyName, $e)) {
                    this.trigger(keyName + "Keyed", $e);
                }
            },
            _onInput: function onInput() {
                this._checkInputValue();
            },
            _managePreventDefault: function managePreventDefault(keyName, $e) {
                var preventDefault, hintValue, inputValue;
                switch (keyName) {
                  case "tab":
                    hintValue = this.getHint();
                    inputValue = this.getInputValue();
                    preventDefault = hintValue && hintValue !== inputValue && !withModifier($e);
                    break;

                  case "up":
                  case "down":
                    preventDefault = !withModifier($e);
                    break;

                  default:
                    preventDefault = false;
                }
                preventDefault && $e.preventDefault();
            },
            _shouldTrigger: function shouldTrigger(keyName, $e) {
                var trigger;
                switch (keyName) {
                  case "tab":
                    trigger = !withModifier($e);
                    break;

                  default:
                    trigger = true;
                }
                return trigger;
            },
            _checkInputValue: function checkInputValue() {
                var inputValue, areEquivalent, hasDifferentWhitespace;
                inputValue = this.getInputValue();
                areEquivalent = areQueriesEquivalent(inputValue, this.query);
                hasDifferentWhitespace = areEquivalent ? this.query.length !== inputValue.length : false;
                this.query = inputValue;
                if (!areEquivalent) {
                    this.trigger("queryChanged", this.query);
                } else if (hasDifferentWhitespace) {
                    this.trigger("whitespaceChanged", this.query);
                }
            },
            focus: function focus() {
                this.$input.focus();
            },
            blur: function blur() {
                this.$input.blur();
            },
            getQuery: function getQuery() {
                return this.query;
            },
            setQuery: function setQuery(query) {
                this.query = query;
            },
            getInputValue: function getInputValue() {
                return this.$input.val();
            },
            setInputValue: function setInputValue(value, silent) {
                this.$input.val(value);
                silent ? this.clearHint() : this._checkInputValue();
            },
            resetInputValue: function resetInputValue() {
                this.setInputValue(this.query, true);
            },
            getHint: function getHint() {
                return this.$hint.val();
            },
            setHint: function setHint(value) {
                this.$hint.val(value);
            },
            clearHint: function clearHint() {
                this.setHint("");
            },
            clearHintIfInvalid: function clearHintIfInvalid() {
                var val, hint, valIsPrefixOfHint, isValid;
                val = this.getInputValue();
                hint = this.getHint();
                valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
                isValid = val !== "" && valIsPrefixOfHint && !this.hasOverflow();
                !isValid && this.clearHint();
            },
            getLanguageDirection: function getLanguageDirection() {
                return (this.$input.css("direction") || "ltr").toLowerCase();
            },
            hasOverflow: function hasOverflow() {
                var constraint = this.$input.width() - 2;
                this.$overflowHelper.text(this.getInputValue());
                return this.$overflowHelper.width() >= constraint;
            },
            isCursorAtEnd: function() {
                var valueLength, selectionStart, range;
                valueLength = this.$input.val().length;
                selectionStart = this.$input[0].selectionStart;
                if (_.isNumber(selectionStart)) {
                    return selectionStart === valueLength;
                } else if (document.selection) {
                    range = document.selection.createRange();
                    range.moveStart("character", -valueLength);
                    return valueLength === range.text.length;
                }
                return true;
            },
            destroy: function destroy() {
                this.$hint.off(".tt");
                this.$input.off(".tt");
                this.$hint = this.$input = this.$overflowHelper = null;
            }
        });
        return Input;
        function buildOverflowHelper($input) {
            return $('<pre aria-hidden="true"></pre>').css({
                position: "absolute",
                visibility: "hidden",
                whiteSpace: "pre",
                fontFamily: $input.css("font-family"),
                fontSize: $input.css("font-size"),
                fontStyle: $input.css("font-style"),
                fontVariant: $input.css("font-variant"),
                fontWeight: $input.css("font-weight"),
                wordSpacing: $input.css("word-spacing"),
                letterSpacing: $input.css("letter-spacing"),
                textIndent: $input.css("text-indent"),
                textRendering: $input.css("text-rendering"),
                textTransform: $input.css("text-transform")
            }).insertAfter($input);
        }
        function areQueriesEquivalent(a, b) {
            return Input.normalizeQuery(a) === Input.normalizeQuery(b);
        }
        function withModifier($e) {
            return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
        }
    }();
    var Dataset = function() {
        "use strict";
        var datasetKey = "ttDataset", valueKey = "ttValue", datumKey = "ttDatum";
        function Dataset(o) {
            o = o || {};
            o.templates = o.templates || {};
            if (!o.source) {
                $.error("missing source");
            }
            if (o.name && !isValidName(o.name)) {
                $.error("invalid dataset name: " + o.name);
            }
            this.query = null;
            this.highlight = !!o.highlight;
            this.name = o.name || _.getUniqueId();
            this.source = o.source;
            this.displayFn = getDisplayFn(o.display || o.displayKey);
            this.templates = getTemplates(o.templates, this.displayFn);
            this.$el = $(html.dataset.replace("%CLASS%", this.name));
        }
        Dataset.extractDatasetName = function extractDatasetName(el) {
            return $(el).data(datasetKey);
        };
        Dataset.extractValue = function extractDatum(el) {
            return $(el).data(valueKey);
        };
        Dataset.extractDatum = function extractDatum(el) {
            return $(el).data(datumKey);
        };
        _.mixin(Dataset.prototype, EventEmitter, {
            _render: function render(query, suggestions) {
                if (!this.$el) {
                    return;
                }
                var that = this, hasSuggestions;
                this.$el.empty();
                hasSuggestions = suggestions && suggestions.length;
                if (!hasSuggestions && this.templates.empty) {
                    this.$el.html(getEmptyHtml()).prepend(that.templates.header ? getHeaderHtml() : null).append(that.templates.footer ? getFooterHtml() : null);
                } else if (hasSuggestions) {
                    this.$el.html(getSuggestionsHtml()).prepend(that.templates.header ? getHeaderHtml() : null).append(that.templates.footer ? getFooterHtml() : null);
                }
                this.trigger("rendered");
                function getEmptyHtml() {
                    return that.templates.empty({
                        query: query,
                        isEmpty: true
                    });
                }
                function getSuggestionsHtml() {
                    var $suggestions, nodes;
                    $suggestions = $(html.suggestions).css(css.suggestions);
                    nodes = _.map(suggestions, getSuggestionNode);
                    $suggestions.append.apply($suggestions, nodes);
                    that.highlight && highlight({
                        className: "tt-highlight",
                        node: $suggestions[0],
                        pattern: query
                    });
                    return $suggestions;
                    function getSuggestionNode(suggestion) {
                        var $el;
                        $el = $(html.suggestion).append(that.templates.suggestion(suggestion)).data(datasetKey, that.name).data(valueKey, that.displayFn(suggestion)).data(datumKey, suggestion);
                        $el.children().each(function() {
                            $(this).css(css.suggestionChild);
                        });
                        return $el;
                    }
                }
                function getHeaderHtml() {
                    return that.templates.header({
                        query: query,
                        isEmpty: !hasSuggestions
                    });
                }
                function getFooterHtml() {
                    return that.templates.footer({
                        query: query,
                        isEmpty: !hasSuggestions
                    });
                }
            },
            getRoot: function getRoot() {
                return this.$el;
            },
            update: function update(query) {
                var that = this;
                this.query = query;
                this.canceled = false;
                this.source(query, render);
                function render(suggestions) {
                    if (!that.canceled && query === that.query) {
                        that._render(query, suggestions);
                    }
                }
            },
            cancel: function cancel() {
                this.canceled = true;
            },
            clear: function clear() {
                this.cancel();
                this.$el.empty();
                this.trigger("rendered");
            },
            isEmpty: function isEmpty() {
                return this.$el.is(":empty");
            },
            destroy: function destroy() {
                this.$el = null;
            }
        });
        return Dataset;
        function getDisplayFn(display) {
            display = display || "value";
            return _.isFunction(display) ? display : displayFn;
            function displayFn(obj) {
                return obj[display];
            }
        }
        function getTemplates(templates, displayFn) {
            return {
                empty: templates.empty && _.templatify(templates.empty),
                header: templates.header && _.templatify(templates.header),
                footer: templates.footer && _.templatify(templates.footer),
                suggestion: templates.suggestion || suggestionTemplate
            };
            function suggestionTemplate(context) {
                return "<p>" + displayFn(context) + "</p>";
            }
        }
        function isValidName(str) {
            return /^[_a-zA-Z0-9-]+$/.test(str);
        }
    }();
    var Dropdown = function() {
        "use strict";
        function Dropdown(o) {
            var that = this, onSuggestionClick, onSuggestionMouseEnter, onSuggestionMouseLeave;
            o = o || {};
            if (!o.menu) {
                $.error("menu is required");
            }
            this.isOpen = false;
            this.isEmpty = true;
            this.datasets = _.map(o.datasets, initializeDataset);
            onSuggestionClick = _.bind(this._onSuggestionClick, this);
            onSuggestionMouseEnter = _.bind(this._onSuggestionMouseEnter, this);
            onSuggestionMouseLeave = _.bind(this._onSuggestionMouseLeave, this);
            this.$menu = $(o.menu).on("click.tt", ".tt-suggestion", onSuggestionClick).on("mouseenter.tt", ".tt-suggestion", onSuggestionMouseEnter).on("mouseleave.tt", ".tt-suggestion", onSuggestionMouseLeave);
            _.each(this.datasets, function(dataset) {
                that.$menu.append(dataset.getRoot());
                dataset.onSync("rendered", that._onRendered, that);
            });
        }
        _.mixin(Dropdown.prototype, EventEmitter, {
            _onSuggestionClick: function onSuggestionClick($e) {
                this.trigger("suggestionClicked", $($e.currentTarget));
            },
            _onSuggestionMouseEnter: function onSuggestionMouseEnter($e) {
                this._removeCursor();
                this._setCursor($($e.currentTarget), true);
            },
            _onSuggestionMouseLeave: function onSuggestionMouseLeave() {
                this._removeCursor();
            },
            _onRendered: function onRendered() {
                this.isEmpty = _.every(this.datasets, isDatasetEmpty);
                this.isEmpty ? this._hide() : this.isOpen && this._show();
                this.trigger("datasetRendered");
                function isDatasetEmpty(dataset) {
                    return dataset.isEmpty();
                }
            },
            _hide: function() {
                this.$menu.hide();
            },
            _show: function() {
                this.$menu.css("display", "block");
            },
            _getSuggestions: function getSuggestions() {
                return this.$menu.find(".tt-suggestion");
            },
            _getCursor: function getCursor() {
                return this.$menu.find(".tt-cursor").first();
            },
            _setCursor: function setCursor($el, silent) {
                $el.first().addClass("tt-cursor");
                !silent && this.trigger("cursorMoved");
            },
            _removeCursor: function removeCursor() {
                this._getCursor().removeClass("tt-cursor");
            },
            _moveCursor: function moveCursor(increment) {
                var $suggestions, $oldCursor, newCursorIndex, $newCursor;
                if (!this.isOpen) {
                    return;
                }
                $oldCursor = this._getCursor();
                $suggestions = this._getSuggestions();
                this._removeCursor();
                newCursorIndex = $suggestions.index($oldCursor) + increment;
                newCursorIndex = (newCursorIndex + 1) % ($suggestions.length + 1) - 1;
                if (newCursorIndex === -1) {
                    this.trigger("cursorRemoved");
                    return;
                } else if (newCursorIndex < -1) {
                    newCursorIndex = $suggestions.length - 1;
                }
                this._setCursor($newCursor = $suggestions.eq(newCursorIndex));
                this._ensureVisible($newCursor);
            },
            _ensureVisible: function ensureVisible($el) {
                var elTop, elBottom, menuScrollTop, menuHeight;
                elTop = $el.position().top;
                elBottom = elTop + $el.outerHeight(true);
                menuScrollTop = this.$menu.scrollTop();
                menuHeight = this.$menu.height() + parseInt(this.$menu.css("paddingTop"), 10) + parseInt(this.$menu.css("paddingBottom"), 10);
                if (elTop < 0) {
                    this.$menu.scrollTop(menuScrollTop + elTop);
                } else if (menuHeight < elBottom) {
                    this.$menu.scrollTop(menuScrollTop + (elBottom - menuHeight));
                }
            },
            close: function close() {
                if (this.isOpen) {
                    this.isOpen = false;
                    this._removeCursor();
                    this._hide();
                    this.trigger("closed");
                }
            },
            open: function open() {
                if (!this.isOpen) {
                    this.isOpen = true;
                    !this.isEmpty && this._show();
                    this.trigger("opened");
                }
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$menu.css(dir === "ltr" ? css.ltr : css.rtl);
            },
            moveCursorUp: function moveCursorUp() {
                this._moveCursor(-1);
            },
            moveCursorDown: function moveCursorDown() {
                this._moveCursor(+1);
            },
            getDatumForSuggestion: function getDatumForSuggestion($el) {
                var datum = null;
                if ($el.length) {
                    datum = {
                        raw: Dataset.extractDatum($el),
                        value: Dataset.extractValue($el),
                        datasetName: Dataset.extractDatasetName($el)
                    };
                }
                return datum;
            },
            getDatumForCursor: function getDatumForCursor() {
                return this.getDatumForSuggestion(this._getCursor().first());
            },
            getDatumForTopSuggestion: function getDatumForTopSuggestion() {
                return this.getDatumForSuggestion(this._getSuggestions().first());
            },
            update: function update(query) {
                _.each(this.datasets, updateDataset);
                function updateDataset(dataset) {
                    dataset.update(query);
                }
            },
            empty: function empty() {
                _.each(this.datasets, clearDataset);
                this.isEmpty = true;
                function clearDataset(dataset) {
                    dataset.clear();
                }
            },
            isVisible: function isVisible() {
                return this.isOpen && !this.isEmpty;
            },
            destroy: function destroy() {
                this.$menu.off(".tt");
                this.$menu = null;
                _.each(this.datasets, destroyDataset);
                function destroyDataset(dataset) {
                    dataset.destroy();
                }
            }
        });
        return Dropdown;
        function initializeDataset(oDataset) {
            return new Dataset(oDataset);
        }
    }();
    var Typeahead = function() {
        "use strict";
        var attrsKey = "ttAttrs";
        function Typeahead(o) {
            var $menu, $input, $hint;
            o = o || {};
            if (!o.input) {
                $.error("missing input");
            }
            this.isActivated = false;
            this.autoselect = !!o.autoselect;
            this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
            this.$node = buildDom(o.input, o.withHint);
            $menu = this.$node.find(".tt-dropdown-menu");
            $input = this.$node.find(".tt-input");
            $hint = this.$node.find(".tt-hint");
            $input.on("blur.tt", function($e) {
                var active, isActive, hasActive;
                active = document.activeElement;
                isActive = $menu.is(active);
                hasActive = $menu.has(active).length > 0;
                if (_.isMsie() && (isActive || hasActive)) {
                    $e.preventDefault();
                    $e.stopImmediatePropagation();
                    _.defer(function() {
                        $input.focus();
                    });
                }
            });
            $menu.on("mousedown.tt", function($e) {
                $e.preventDefault();
            });
            this.eventBus = o.eventBus || new EventBus({
                el: $input
            });
            this.dropdown = new Dropdown({
                menu: $menu,
                datasets: o.datasets
            }).onSync("suggestionClicked", this._onSuggestionClicked, this).onSync("cursorMoved", this._onCursorMoved, this).onSync("cursorRemoved", this._onCursorRemoved, this).onSync("opened", this._onOpened, this).onSync("closed", this._onClosed, this).onAsync("datasetRendered", this._onDatasetRendered, this);
            this.input = new Input({
                input: $input,
                hint: $hint
            }).onSync("focused", this._onFocused, this).onSync("blurred", this._onBlurred, this).onSync("enterKeyed", this._onEnterKeyed, this).onSync("tabKeyed", this._onTabKeyed, this).onSync("escKeyed", this._onEscKeyed, this).onSync("upKeyed", this._onUpKeyed, this).onSync("downKeyed", this._onDownKeyed, this).onSync("leftKeyed", this._onLeftKeyed, this).onSync("rightKeyed", this._onRightKeyed, this).onSync("queryChanged", this._onQueryChanged, this).onSync("whitespaceChanged", this._onWhitespaceChanged, this);
            this._setLanguageDirection();
        }
        _.mixin(Typeahead.prototype, {
            _onSuggestionClicked: function onSuggestionClicked(type, $el) {
                var datum;
                if (datum = this.dropdown.getDatumForSuggestion($el)) {
                    this._select(datum);
                }
            },
            _onCursorMoved: function onCursorMoved() {
                var datum = this.dropdown.getDatumForCursor();
                this.input.setInputValue(datum.value, true);
                this.eventBus.trigger("cursorchanged", datum.raw, datum.datasetName);
            },
            _onCursorRemoved: function onCursorRemoved() {
                this.input.resetInputValue();
                this._updateHint();
            },
            _onDatasetRendered: function onDatasetRendered() {
                this._updateHint();
            },
            _onOpened: function onOpened() {
                this._updateHint();
                this.eventBus.trigger("opened");
            },
            _onClosed: function onClosed() {
                this.input.clearHint();
                this.eventBus.trigger("closed");
            },
            _onFocused: function onFocused() {
                this.isActivated = true;
                this.dropdown.open();
            },
            _onBlurred: function onBlurred() {
                this.isActivated = false;
                this.dropdown.empty();
                this.dropdown.close();
            },
            _onEnterKeyed: function onEnterKeyed(type, $e) {
                var cursorDatum, topSuggestionDatum;
                cursorDatum = this.dropdown.getDatumForCursor();
                topSuggestionDatum = this.dropdown.getDatumForTopSuggestion();
                if (cursorDatum) {
                    this._select(cursorDatum);
                    $e.preventDefault();
                } else if (this.autoselect && topSuggestionDatum) {
                    this._select(topSuggestionDatum);
                    $e.preventDefault();
                }
            },
            _onTabKeyed: function onTabKeyed(type, $e) {
                var datum;
                if (datum = this.dropdown.getDatumForCursor()) {
                    this._select(datum);
                    $e.preventDefault();
                } else {
                    this._autocomplete(true);
                }
            },
            _onEscKeyed: function onEscKeyed() {
                this.dropdown.close();
                this.input.resetInputValue();
            },
            _onUpKeyed: function onUpKeyed() {
                var query = this.input.getQuery();
                this.dropdown.isEmpty && query.length >= this.minLength ? this.dropdown.update(query) : this.dropdown.moveCursorUp();
                this.dropdown.open();
            },
            _onDownKeyed: function onDownKeyed() {
                var query = this.input.getQuery();
                this.dropdown.isEmpty && query.length >= this.minLength ? this.dropdown.update(query) : this.dropdown.moveCursorDown();
                this.dropdown.open();
            },
            _onLeftKeyed: function onLeftKeyed() {
                this.dir === "rtl" && this._autocomplete();
            },
            _onRightKeyed: function onRightKeyed() {
                this.dir === "ltr" && this._autocomplete();
            },
            _onQueryChanged: function onQueryChanged(e, query) {
                this.input.clearHintIfInvalid();
                query.length >= this.minLength ? this.dropdown.update(query) : this.dropdown.empty();
                this.dropdown.open();
                this._setLanguageDirection();
            },
            _onWhitespaceChanged: function onWhitespaceChanged() {
                this._updateHint();
                this.dropdown.open();
            },
            _setLanguageDirection: function setLanguageDirection() {
                var dir;
                if (this.dir !== (dir = this.input.getLanguageDirection())) {
                    this.dir = dir;
                    this.$node.css("direction", dir);
                    this.dropdown.setLanguageDirection(dir);
                }
            },
            _updateHint: function updateHint() {
                var datum, val, query, escapedQuery, frontMatchRegEx, match;
                datum = this.dropdown.getDatumForTopSuggestion();
                if (datum && this.dropdown.isVisible() && !this.input.hasOverflow()) {
                    val = this.input.getInputValue();
                    query = Input.normalizeQuery(val);
                    escapedQuery = _.escapeRegExChars(query);
                    frontMatchRegEx = new RegExp("^(?:" + escapedQuery + ")(.+$)", "i");
                    match = frontMatchRegEx.exec(datum.value);
                    match ? this.input.setHint(val + match[1]) : this.input.clearHint();
                } else {
                    this.input.clearHint();
                }
            },
            _autocomplete: function autocomplete(laxCursor) {
                var hint, query, isCursorAtEnd, datum;
                hint = this.input.getHint();
                query = this.input.getQuery();
                isCursorAtEnd = laxCursor || this.input.isCursorAtEnd();
                if (hint && query !== hint && isCursorAtEnd) {
                    datum = this.dropdown.getDatumForTopSuggestion();
                    datum && this.input.setInputValue(datum.value);
                    this.eventBus.trigger("autocompleted", datum.raw, datum.datasetName);
                }
            },
            _select: function select(datum) {
                this.input.setQuery(datum.value);
                this.input.setInputValue(datum.value, true);
                this._setLanguageDirection();
                this.eventBus.trigger("selected", datum.raw, datum.datasetName);
                this.dropdown.close();
                _.defer(_.bind(this.dropdown.empty, this.dropdown));
            },
            open: function open() {
                this.dropdown.open();
            },
            close: function close() {
                this.dropdown.close();
            },
            setVal: function setVal(val) {
                val = _.toStr(val);
                if (this.isActivated) {
                    this.input.setInputValue(val);
                } else {
                    this.input.setQuery(val);
                    this.input.setInputValue(val, true);
                }
                this._setLanguageDirection();
            },
            getVal: function getVal() {
                return this.input.getQuery();
            },
            destroy: function destroy() {
                this.input.destroy();
                this.dropdown.destroy();
                destroyDomStructure(this.$node);
                this.$node = null;
            }
        });
        return Typeahead;
        function buildDom(input, withHint) {
            var $input, $wrapper, $dropdown, $hint;
            $input = $(input);
            $wrapper = $(html.wrapper).css(css.wrapper);
            $dropdown = $(html.dropdown).css(css.dropdown);
            $hint = $input.clone().css(css.hint).css(getBackgroundStyles($input));
            $hint.val("").removeData().addClass("tt-hint").removeAttr("id name placeholder required").prop("readonly", true).attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            });
            $input.data(attrsKey, {
                dir: $input.attr("dir"),
                autocomplete: $input.attr("autocomplete"),
                spellcheck: $input.attr("spellcheck"),
                style: $input.attr("style")
            });
            $input.addClass("tt-input").attr({
                autocomplete: "off",
                spellcheck: false
            }).css(withHint ? css.input : css.inputWithNoHint);
            try {
                !$input.attr("dir") && $input.attr("dir", "auto");
            } catch (e) {}
            return $input.wrap($wrapper).parent().prepend(withHint ? $hint : null).append($dropdown);
        }
        function getBackgroundStyles($el) {
            return {
                backgroundAttachment: $el.css("background-attachment"),
                backgroundClip: $el.css("background-clip"),
                backgroundColor: $el.css("background-color"),
                backgroundImage: $el.css("background-image"),
                backgroundOrigin: $el.css("background-origin"),
                backgroundPosition: $el.css("background-position"),
                backgroundRepeat: $el.css("background-repeat"),
                backgroundSize: $el.css("background-size")
            };
        }
        function destroyDomStructure($node) {
            var $input = $node.find(".tt-input");
            _.each($input.data(attrsKey), function(val, key) {
                _.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val);
            });
            $input.detach().removeData(attrsKey).removeClass("tt-input").insertAfter($node);
            $node.remove();
        }
    }();
    (function() {
        "use strict";
        var old, typeaheadKey, methods;
        old = $.fn.typeahead;
        typeaheadKey = "ttTypeahead";
        methods = {
            initialize: function initialize(o, datasets) {
                datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 1);
                o = o || {};
                return this.each(attach);
                function attach() {
                    var $input = $(this), eventBus, typeahead;
                    _.each(datasets, function(d) {
                        d.highlight = !!o.highlight;
                    });
                    typeahead = new Typeahead({
                        input: $input,
                        eventBus: eventBus = new EventBus({
                            el: $input
                        }),
                        withHint: _.isUndefined(o.hint) ? true : !!o.hint,
                        minLength: o.minLength,
                        autoselect: o.autoselect,
                        datasets: datasets
                    });
                    $input.data(typeaheadKey, typeahead);
                }
            },
            open: function open() {
                return this.each(openTypeahead);
                function openTypeahead() {
                    var $input = $(this), typeahead;
                    if (typeahead = $input.data(typeaheadKey)) {
                        typeahead.open();
                    }
                }
            },
            close: function close() {
                return this.each(closeTypeahead);
                function closeTypeahead() {
                    var $input = $(this), typeahead;
                    if (typeahead = $input.data(typeaheadKey)) {
                        typeahead.close();
                    }
                }
            },
            val: function val(newVal) {
                return !arguments.length ? getVal(this.first()) : this.each(setVal);
                function setVal() {
                    var $input = $(this), typeahead;
                    if (typeahead = $input.data(typeaheadKey)) {
                        typeahead.setVal(newVal);
                    }
                }
                function getVal($input) {
                    var typeahead, query;
                    if (typeahead = $input.data(typeaheadKey)) {
                        query = typeahead.getVal();
                    }
                    return query;
                }
            },
            destroy: function destroy() {
                return this.each(unattach);
                function unattach() {
                    var $input = $(this), typeahead;
                    if (typeahead = $input.data(typeaheadKey)) {
                        typeahead.destroy();
                        $input.removeData(typeaheadKey);
                    }
                }
            }
        };
        $.fn.typeahead = function(method) {
            var tts;
            if (methods[method] && method !== "initialize") {
                tts = this.filter(function() {
                    return !!$(this).data(typeaheadKey);
                });
                return methods[method].apply(tts, [].slice.call(arguments, 1));
            } else {
                return methods.initialize.apply(this, arguments);
            }
        };
        $.fn.typeahead.noConflict = function noConflict() {
            $.fn.typeahead = old;
            return this;
        };
    })();
})(window.jQuery);
/*
* FlowType.JS v1.1
* Copyright 2013-2014, Simple Focus http://simplefocus.com/
*
* FlowType.JS by Simple Focus (http://simplefocus.com/)
* is licensed under the MIT License. Read a copy of the
* license in the LICENSE.txt file or at
* http://choosealicense.com/licenses/mit
*
* Thanks to Giovanni Difeterici (http://www.gdifeterici.com/)
*/

(function($) {
   $.fn.flowtype = function(options) {

// Establish default settings/variables
// ====================================
      var settings = $.extend({
         maximum   : 9999,
         minimum   : 1,
         maxFont   : 9999,
         minFont   : 1,
         fontRatio : 35
      }, options),

// Do the magic math
// =================
      changes = function(el) {
         var $el = $(el),
            elw = $el.width(),
            width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw,
            fontBase = width / settings.fontRatio,
            fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
         $el.css('font-size', fontSize + 'px');
      };

// Make the magic visible
// ======================
      return this.each(function() {
      // Context for resize callback
         var that = this;
      // Make changes upon resize
         $(window).resize(function(){changes(that);});
      // Set changes on load
         changes(this);
      });
   };
}(jQuery));
/**
 * bootbox.js [v4.4.0]
 *
 * http://bootboxjs.com/license.txt
 */

// @see https://github.com/makeusabrew/bootbox/issues/180
// @see https://github.com/makeusabrew/bootbox/issues/186
(function (root, factory) {

  "use strict";
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    // Browser globals (root is window)
    root.bootbox = factory(root.jQuery);
  }

}(this, function init($, undefined) {

  "use strict";

  // the base DOM structure needed to create a modal
  var templates = {
    dialog:
      "<div class='bootbox modal' tabindex='-1' role='dialog'>" +
        "<div class='modal-dialog'>" +
          "<div class='modal-content'>" +
            "<div class='modal-body'><div class='bootbox-body'></div></div>" +
          "</div>" +
        "</div>" +
      "</div>",
    header:
      "<div class='modal-header'>" +
        "<h4 class='modal-title'></h4>" +
      "</div>",
    footer:
      "<div class='modal-footer'></div>",
    closeButton:
      "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
    form:
      "<form class='bootbox-form'></form>",
    inputs: {
      text:
        "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
      textarea:
        "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
      email:
        "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
      select:
        "<select class='bootbox-input bootbox-input-select form-control'></select>",
      checkbox:
        "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
      date:
        "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
      time:
        "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
      number:
        "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
      password:
        "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
    }
  };

  var defaults = {
    // default language
    locale: "en",
    // show backdrop or not. Default to static so user has to interact with dialog
    backdrop: "static",
    // animate the modal in/out
    animate: true,
    // additional class string applied to the top level dialog
    className: null,
    // whether or not to include a close button
    closeButton: true,
    // show the dialog immediately by default
    show: true,
    // dialog container
    container: "body"
  };

  // our public object; augmented after our private API
  var exports = {};

  /**
   * @private
   */
  function _t(key) {
    var locale = locales[defaults.locale];
    return locale ? locale[key] : locales.en[key];
  }

  function processCallback(e, dialog, callback) {
    e.stopPropagation();
    e.preventDefault();

    // by default we assume a callback will get rid of the dialog,
    // although it is given the opportunity to override this

    // so, if the callback can be invoked and it *explicitly returns false*
    // then we'll set a flag to keep the dialog active...
    var preserveDialog = $.isFunction(callback) && callback.call(dialog, e) === false;

    // ... otherwise we'll bin it
    if (!preserveDialog) {
      dialog.modal("hide");
    }
  }

  function getKeyLength(obj) {
    // @TODO defer to Object.keys(x).length if available?
    var k, t = 0;
    for (k in obj) {
      t ++;
    }
    return t;
  }

  function each(collection, iterator) {
    var index = 0;
    $.each(collection, function(key, value) {
      iterator(key, value, index++);
    });
  }

  function sanitize(options) {
    var buttons;
    var total;

    if (typeof options !== "object") {
      throw new Error("Please supply an object of options");
    }

    if (!options.message) {
      throw new Error("Please specify a message");
    }

    // make sure any supplied options take precedence over defaults
    options = $.extend({}, defaults, options);

    if (!options.buttons) {
      options.buttons = {};
    }

    buttons = options.buttons;

    total = getKeyLength(buttons);

    each(buttons, function(key, button, index) {

      if ($.isFunction(button)) {
        // short form, assume value is our callback. Since button
        // isn't an object it isn't a reference either so re-assign it
        button = buttons[key] = {
          callback: button
        };
      }

      // before any further checks make sure by now button is the correct type
      if ($.type(button) !== "object") {
        throw new Error("button with key " + key + " must be an object");
      }

      if (!button.label) {
        // the lack of an explicit label means we'll assume the key is good enough
        button.label = key;
      }

      if (!button.className) {
        if (total <= 2 && index === total-1) {
          // always add a primary to the main option in a two-button dialog
          button.className = "btn-primary";
        } else {
          button.className = "btn-default";
        }
      }
    });

    return options;
  }

  /**
   * map a flexible set of arguments into a single returned object
   * if args.length is already one just return it, otherwise
   * use the properties argument to map the unnamed args to
   * object properties
   * so in the latter case:
   * mapArguments(["foo", $.noop], ["message", "callback"])
   * -> { message: "foo", callback: $.noop }
   */
  function mapArguments(args, properties) {
    var argn = args.length;
    var options = {};

    if (argn < 1 || argn > 2) {
      throw new Error("Invalid argument length");
    }

    if (argn === 2 || typeof args[0] === "string") {
      options[properties[0]] = args[0];
      options[properties[1]] = args[1];
    } else {
      options = args[0];
    }

    return options;
  }

  /**
   * merge a set of default dialog options with user supplied arguments
   */
  function mergeArguments(defaults, args, properties) {
    return $.extend(
      // deep merge
      true,
      // ensure the target is an empty, unreferenced object
      {},
      // the base options object for this type of dialog (often just buttons)
      defaults,
      // args could be an object or array; if it's an array properties will
      // map it to a proper options object
      mapArguments(
        args,
        properties
      )
    );
  }

  /**
   * this entry-level method makes heavy use of composition to take a simple
   * range of inputs and return valid options suitable for passing to bootbox.dialog
   */
  function mergeDialogOptions(className, labels, properties, args) {
    //  build up a base set of dialog properties
    var baseOptions = {
      className: "bootbox-" + className,
      buttons: createLabels.apply(null, labels)
    };

    // ensure the buttons properties generated, *after* merging
    // with user args are still valid against the supplied labels
    return validateButtons(
      // merge the generated base properties with user supplied arguments
      mergeArguments(
        baseOptions,
        args,
        // if args.length > 1, properties specify how each arg maps to an object key
        properties
      ),
      labels
    );
  }

  /**
   * from a given list of arguments return a suitable object of button labels
   * all this does is normalise the given labels and translate them where possible
   * e.g. "ok", "confirm" -> { ok: "OK, cancel: "Annuleren" }
   */
  function createLabels() {
    var buttons = {};

    for (var i = 0, j = arguments.length; i < j; i++) {
      var argument = arguments[i];
      var key = argument.toLowerCase();
      var value = argument.toUpperCase();

      buttons[key] = {
        label: _t(value)
      };
    }

    return buttons;
  }

  function validateButtons(options, buttons) {
    var allowedButtons = {};
    each(buttons, function(key, value) {
      allowedButtons[value] = true;
    });

    each(options.buttons, function(key) {
      if (allowedButtons[key] === undefined) {
        throw new Error("button key " + key + " is not allowed (options are " + buttons.join("\n") + ")");
      }
    });

    return options;
  }

  exports.alert = function() {
    var options;

    options = mergeDialogOptions("alert", ["ok"], ["message", "callback"], arguments);

    if (options.callback && !$.isFunction(options.callback)) {
      throw new Error("alert requires callback property to be a function when provided");
    }

    /**
     * overrides
     */
    options.buttons.ok.callback = options.onEscape = function() {
      if ($.isFunction(options.callback)) {
        return options.callback.call(this);
      }
      return true;
    };

    return exports.dialog(options);
  };

  exports.confirm = function() {
    var options;

    options = mergeDialogOptions("confirm", ["cancel", "confirm"], ["message", "callback"], arguments);

    /**
     * overrides; undo anything the user tried to set they shouldn't have
     */
    options.buttons.cancel.callback = options.onEscape = function() {
      return options.callback.call(this, false);
    };

    options.buttons.confirm.callback = function() {
      return options.callback.call(this, true);
    };

    // confirm specific validation
    if (!$.isFunction(options.callback)) {
      throw new Error("confirm requires a callback");
    }

    return exports.dialog(options);
  };

  exports.prompt = function() {
    var options;
    var defaults;
    var dialog;
    var form;
    var input;
    var shouldShow;
    var inputOptions;

    // we have to create our form first otherwise
    // its value is undefined when gearing up our options
    // @TODO this could be solved by allowing message to
    // be a function instead...
    form = $(templates.form);

    // prompt defaults are more complex than others in that
    // users can override more defaults
    // @TODO I don't like that prompt has to do a lot of heavy
    // lifting which mergeDialogOptions can *almost* support already
    // just because of 'value' and 'inputType' - can we refactor?
    defaults = {
      className: "bootbox-prompt",
      buttons: createLabels("cancel", "confirm"),
      value: "",
      inputType: "text"
    };

    options = validateButtons(
      mergeArguments(defaults, arguments, ["title", "callback"]),
      ["cancel", "confirm"]
    );

    // capture the user's show value; we always set this to false before
    // spawning the dialog to give us a chance to attach some handlers to
    // it, but we need to make sure we respect a preference not to show it
    shouldShow = (options.show === undefined) ? true : options.show;

    /**
     * overrides; undo anything the user tried to set they shouldn't have
     */
    options.message = form;

    options.buttons.cancel.callback = options.onEscape = function() {
      return options.callback.call(this, null);
    };

    options.buttons.confirm.callback = function() {
      var value;

      switch (options.inputType) {
        case "text":
        case "textarea":
        case "email":
        case "select":
        case "date":
        case "time":
        case "number":
        case "password":
          value = input.val();
          break;

        case "checkbox":
          var checkedItems = input.find("input:checked");

          // we assume that checkboxes are always multiple,
          // hence we default to an empty array
          value = [];

          each(checkedItems, function(_, item) {
            value.push($(item).val());
          });
          break;
      }

      return options.callback.call(this, value);
    };

    options.show = false;

    // prompt specific validation
    if (!options.title) {
      throw new Error("prompt requires a title");
    }

    if (!$.isFunction(options.callback)) {
      throw new Error("prompt requires a callback");
    }

    if (!templates.inputs[options.inputType]) {
      throw new Error("invalid prompt type");
    }

    // create the input based on the supplied type
    input = $(templates.inputs[options.inputType]);

    switch (options.inputType) {
      case "text":
      case "textarea":
      case "email":
      case "date":
      case "time":
      case "number":
      case "password":
        input.val(options.value);
        break;

      case "select":
        var groups = {};
        inputOptions = options.inputOptions || [];

        if (!$.isArray(inputOptions)) {
          throw new Error("Please pass an array of input options");
        }

        if (!inputOptions.length) {
          throw new Error("prompt with select requires options");
        }

        each(inputOptions, function(_, option) {

          // assume the element to attach to is the input...
          var elem = input;

          if (option.value === undefined || option.text === undefined) {
            throw new Error("given options in wrong format");
          }

          // ... but override that element if this option sits in a group

          if (option.group) {
            // initialise group if necessary
            if (!groups[option.group]) {
              groups[option.group] = $("<optgroup/>").attr("label", option.group);
            }

            elem = groups[option.group];
          }

          elem.append("<option value='" + option.value + "'>" + option.text + "</option>");
        });

        each(groups, function(_, group) {
          input.append(group);
        });

        // safe to set a select's value as per a normal input
        input.val(options.value);
        break;

      case "checkbox":
        var values   = $.isArray(options.value) ? options.value : [options.value];
        inputOptions = options.inputOptions || [];

        if (!inputOptions.length) {
          throw new Error("prompt with checkbox requires options");
        }

        if (!inputOptions[0].value || !inputOptions[0].text) {
          throw new Error("given options in wrong format");
        }

        // checkboxes have to nest within a containing element, so
        // they break the rules a bit and we end up re-assigning
        // our 'input' element to this container instead
        input = $("<div/>");

        each(inputOptions, function(_, option) {
          var checkbox = $(templates.inputs[options.inputType]);

          checkbox.find("input").attr("value", option.value);
          checkbox.find("label").append(option.text);

          // we've ensured values is an array so we can always iterate over it
          each(values, function(_, value) {
            if (value === option.value) {
              checkbox.find("input").prop("checked", true);
            }
          });

          input.append(checkbox);
        });
        break;
    }

    // @TODO provide an attributes option instead
    // and simply map that as keys: vals
    if (options.placeholder) {
      input.attr("placeholder", options.placeholder);
    }

    if (options.pattern) {
      input.attr("pattern", options.pattern);
    }

    if (options.maxlength) {
      input.attr("maxlength", options.maxlength);
    }

    // now place it in our form
    form.append(input);

    form.on("submit", function(e) {
      e.preventDefault();
      // Fix for SammyJS (or similar JS routing library) hijacking the form post.
      e.stopPropagation();
      // @TODO can we actually click *the* button object instead?
      // e.g. buttons.confirm.click() or similar
      dialog.find(".btn-primary").click();
    });

    dialog = exports.dialog(options);

    // clear the existing handler focusing the submit button...
    dialog.off("shown.bs.modal");

    // ...and replace it with one focusing our input, if possible
    dialog.on("shown.bs.modal", function() {
      // need the closure here since input isn't
      // an object otherwise
      input.focus();
    });

    if (shouldShow === true) {
      dialog.modal("show");
    }

    return dialog;
  };

  exports.dialog = function(options) {
    options = sanitize(options);

    var dialog = $(templates.dialog);
    var innerDialog = dialog.find(".modal-dialog");
    var body = dialog.find(".modal-body");
    var buttons = options.buttons;
    var buttonStr = "";
    var callbacks = {
      onEscape: options.onEscape
    };

    if ($.fn.modal === undefined) {
      throw new Error(
        "$.fn.modal is not defined; please double check you have included " +
        "the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ " +
        "for more details."
      );
    }

    each(buttons, function(key, button) {

      // @TODO I don't like this string appending to itself; bit dirty. Needs reworking
      // can we just build up button elements instead? slower but neater. Then button
      // can just become a template too
      buttonStr += "<button data-bb-handler='" + key + "' type='button' class='btn " + button.className + "'>" + button.label + "</button>";
      callbacks[key] = button.callback;
    });

    body.find(".bootbox-body").html(options.message);

    if (options.animate === true) {
      dialog.addClass("fade");
    }

    if (options.className) {
      dialog.addClass(options.className);
    }

    if (options.size === "large") {
      innerDialog.addClass("modal-lg");
    } else if (options.size === "small") {
      innerDialog.addClass("modal-sm");
    }

    if (options.title) {
      body.before(templates.header);
    }

    if (options.closeButton) {
      var closeButton = $(templates.closeButton);

      if (options.title) {
        dialog.find(".modal-header").prepend(closeButton);
      } else {
        closeButton.css("margin-top", "-10px").prependTo(body);
      }
    }

    if (options.title) {
      dialog.find(".modal-title").html(options.title);
    }

    if (buttonStr.length) {
      body.after(templates.footer);
      dialog.find(".modal-footer").html(buttonStr);
    }


    /**
     * Bootstrap event listeners; used handle extra
     * setup & teardown required after the underlying
     * modal has performed certain actions
     */

    dialog.on("hidden.bs.modal", function(e) {
      // ensure we don't accidentally intercept hidden events triggered
      // by children of the current dialog. We shouldn't anymore now BS
      // namespaces its events; but still worth doing
      if (e.target === this) {
        dialog.remove();
      }
    });

    /*
    dialog.on("show.bs.modal", function() {
      // sadly this doesn't work; show is called *just* before
      // the backdrop is added so we'd need a setTimeout hack or
      // otherwise... leaving in as would be nice
      if (options.backdrop) {
        dialog.next(".modal-backdrop").addClass("bootbox-backdrop");
      }
    });
    */

    dialog.on("shown.bs.modal", function() {
      dialog.find(".btn-primary:first").focus();
    });

    /**
     * Bootbox event listeners; experimental and may not last
     * just an attempt to decouple some behaviours from their
     * respective triggers
     */

    if (options.backdrop !== "static") {
      // A boolean true/false according to the Bootstrap docs
      // should show a dialog the user can dismiss by clicking on
      // the background.
      // We always only ever pass static/false to the actual
      // $.modal function because with `true` we can't trap
      // this event (the .modal-backdrop swallows it)
      // However, we still want to sort of respect true
      // and invoke the escape mechanism instead
      dialog.on("click.dismiss.bs.modal", function(e) {
        // @NOTE: the target varies in >= 3.3.x releases since the modal backdrop
        // moved *inside* the outer dialog rather than *alongside* it
        if (dialog.children(".modal-backdrop").length) {
          e.currentTarget = dialog.children(".modal-backdrop").get(0);
        }

        if (e.target !== e.currentTarget) {
          return;
        }

        dialog.trigger("escape.close.bb");
      });
    }

    dialog.on("escape.close.bb", function(e) {
      if (callbacks.onEscape) {
        processCallback(e, dialog, callbacks.onEscape);
      }
    });

    /**
     * Standard jQuery event listeners; used to handle user
     * interaction with our dialog
     */

    dialog.on("click", ".modal-footer button", function(e) {
      var callbackKey = $(this).data("bb-handler");

      processCallback(e, dialog, callbacks[callbackKey]);
    });

    dialog.on("click", ".bootbox-close-button", function(e) {
      // onEscape might be falsy but that's fine; the fact is
      // if the user has managed to click the close button we
      // have to close the dialog, callback or not
      processCallback(e, dialog, callbacks.onEscape);
    });

    dialog.on("keyup", function(e) {
      if (e.which === 27) {
        dialog.trigger("escape.close.bb");
      }
    });

    // the remainder of this method simply deals with adding our
    // dialogent to the DOM, augmenting it with Bootstrap's modal
    // functionality and then giving the resulting object back
    // to our caller

    $(options.container).append(dialog);

    dialog.modal({
      backdrop: options.backdrop ? "static": false,
      keyboard: false,
      show: false
    });

    if (options.show) {
      dialog.modal("show");
    }

    // @TODO should we return the raw element here or should
    // we wrap it in an object on which we can expose some neater
    // methods, e.g. var d = bootbox.alert(); d.hide(); instead
    // of d.modal("hide");

   /*
    function BBDialog(elem) {
      this.elem = elem;
    }

    BBDialog.prototype = {
      hide: function() {
        return this.elem.modal("hide");
      },
      show: function() {
        return this.elem.modal("show");
      }
    };
    */

    return dialog;

  };

  exports.setDefaults = function() {
    var values = {};

    if (arguments.length === 2) {
      // allow passing of single key/value...
      values[arguments[0]] = arguments[1];
    } else {
      // ... and as an object too
      values = arguments[0];
    }

    $.extend(defaults, values);
  };

  exports.hideAll = function() {
    $(".bootbox").modal("hide");

    return exports;
  };


  /**
   * standard locales. Please add more according to ISO 639-1 standard. Multiple language variants are
   * unlikely to be required. If this gets too large it can be split out into separate JS files.
   */
  var locales = {
    bg_BG : {
      OK      : "Ок",
      CANCEL  : "Отказ",
      CONFIRM : "Потвърждавам"
    },
    br : {
      OK      : "OK",
      CANCEL  : "Cancelar",
      CONFIRM : "Sim"
    },
    cs : {
      OK      : "OK",
      CANCEL  : "Zrušit",
      CONFIRM : "Potvrdit"
    },
    da : {
      OK      : "OK",
      CANCEL  : "Annuller",
      CONFIRM : "Accepter"
    },
    de : {
      OK      : "OK",
      CANCEL  : "Abbrechen",
      CONFIRM : "Akzeptieren"
    },
    el : {
      OK      : "Εντάξει",
      CANCEL  : "Ακύρωση",
      CONFIRM : "Επιβεβαίωση"
    },
    en : {
      OK      : "OK",
      CANCEL  : "Cancel",
      CONFIRM : "OK"
    },
    es : {
      OK      : "OK",
      CANCEL  : "Cancelar",
      CONFIRM : "Aceptar"
    },
    et : {
      OK      : "OK",
      CANCEL  : "Katkesta",
      CONFIRM : "OK"
    },
    fa : {
      OK      : "قبول",
      CANCEL  : "لغو",
      CONFIRM : "تایید"
    },
    fi : {
      OK      : "OK",
      CANCEL  : "Peruuta",
      CONFIRM : "OK"
    },
    fr : {
      OK      : "OK",
      CANCEL  : "Annuler",
      CONFIRM : "D'accord"
    },
    he : {
      OK      : "אישור",
      CANCEL  : "ביטול",
      CONFIRM : "אישור"
    },
    hu : {
      OK      : "OK",
      CANCEL  : "Mégsem",
      CONFIRM : "Megerősít"
    },
    hr : {
      OK      : "OK",
      CANCEL  : "Odustani",
      CONFIRM : "Potvrdi"
    },
    id : {
      OK      : "OK",
      CANCEL  : "Batal",
      CONFIRM : "OK"
    },
    it : {
      OK      : "OK",
      CANCEL  : "Annulla",
      CONFIRM : "Conferma"
    },
    ja : {
      OK      : "OK",
      CANCEL  : "キャンセル",
      CONFIRM : "確認"
    },
    lt : {
      OK      : "Gerai",
      CANCEL  : "Atšaukti",
      CONFIRM : "Patvirtinti"
    },
    lv : {
      OK      : "Labi",
      CANCEL  : "Atcelt",
      CONFIRM : "Apstiprināt"
    },
    nl : {
      OK      : "OK",
      CANCEL  : "Annuleren",
      CONFIRM : "Accepteren"
    },
    no : {
      OK      : "OK",
      CANCEL  : "Avbryt",
      CONFIRM : "OK"
    },
    pl : {
      OK      : "OK",
      CANCEL  : "Anuluj",
      CONFIRM : "Potwierdź"
    },
    pt : {
      OK      : "OK",
      CANCEL  : "Cancelar",
      CONFIRM : "Confirmar"
    },
    ru : {
      OK      : "OK",
      CANCEL  : "Отмена",
      CONFIRM : "Применить"
    },
    sq : {
      OK : "OK",
      CANCEL : "Anulo",
      CONFIRM : "Prano"
    },
    sv : {
      OK      : "OK",
      CANCEL  : "Avbryt",
      CONFIRM : "OK"
    },
    th : {
      OK      : "ตกลง",
      CANCEL  : "ยกเลิก",
      CONFIRM : "ยืนยัน"
    },
    tr : {
      OK      : "Tamam",
      CANCEL  : "İptal",
      CONFIRM : "Onayla"
    },
    zh_CN : {
      OK      : "OK",
      CANCEL  : "取消",
      CONFIRM : "确认"
    },
    zh_TW : {
      OK      : "OK",
      CANCEL  : "取消",
      CONFIRM : "確認"
    }
  };

  exports.addLocale = function(name, values) {
    $.each(["OK", "CANCEL", "CONFIRM"], function(_, v) {
      if (!values[v]) {
        throw new Error("Please supply a translation for '" + v + "'");
      }
    });

    locales[name] = {
      OK: values.OK,
      CANCEL: values.CANCEL,
      CONFIRM: values.CONFIRM
    };

    return exports;
  };

  exports.removeLocale = function(name) {
    delete locales[name];

    return exports;
  };

  exports.setLocale = function(name) {
    return exports.setDefaults("locale", name);
  };

  exports.init = function(_$) {
    return init(_$ || $);
  };

  return exports;
}));

!function(root, factory) {
	 if (typeof define === 'function' && define.amd) {
		 define(['jquery'], factory);
	 } else if (typeof exports === 'object') {
		 module.exports = factory(require('jquery'));
	 } else {
		 factory(root.jQuery);
	 }
}(this, function($) {

/*!
 @package noty - jQuery Notification Plugin
 @version version: 2.3.5
 @contributors https://github.com/needim/noty/graphs/contributors

 @documentation Examples and Documentation - http://needim.github.com/noty/

 @license Licensed under the MIT licenses: http://www.opensource.org/licenses/mit-license.php
 */

    if(typeof Object.create !== 'function') {
        Object.create = function(o) {
            function F() {
            }

            F.prototype = o;
            return new F();
        };
    }

    var NotyObject = {

        init: function(options) {

            // Mix in the passed in options with the default options
            this.options = $.extend({}, $.noty.defaults, options);

            this.options.layout = (this.options.custom) ? $.noty.layouts['inline'] : $.noty.layouts[this.options.layout];

            if($.noty.themes[this.options.theme])
                this.options.theme = $.noty.themes[this.options.theme];
            else
                options.themeClassName = this.options.theme;

            delete options.layout;
            delete options.theme;

            this.options = $.extend({}, this.options, this.options.layout.options);
            this.options.id = 'noty_' + (new Date().getTime() * Math.floor(Math.random() * 1000000));

            this.options = $.extend({}, this.options, options);

            // Build the noty dom initial structure
            this._build();

            // return this so we can chain/use the bridge with less code.
            return this;
        }, // end init

        _build: function() {

            // Generating noty bar
            var $bar = $('<div class="noty_bar noty_type_' + this.options.type + '"></div>').attr('id', this.options.id);
            $bar.append(this.options.template).find('.noty_text').html(this.options.text);

            this.$bar = (this.options.layout.parent.object !== null) ? $(this.options.layout.parent.object).css(this.options.layout.parent.css).append($bar) : $bar;

            if(this.options.themeClassName)
                this.$bar.addClass(this.options.themeClassName).addClass('noty_container_type_' + this.options.type);

            // Set buttons if available
            if(this.options.buttons) {

                // If we have button disable closeWith & timeout options
                this.options.closeWith = [];
                this.options.timeout = false;

                var $buttons = $('<div/>').addClass('noty_buttons');

                (this.options.layout.parent.object !== null) ? this.$bar.find('.noty_bar').append($buttons) : this.$bar.append($buttons);

                var self = this;

                $.each(this.options.buttons, function(i, button) {
                    var $button = $('<button/>').addClass((button.addClass) ? button.addClass : 'gray').html(button.text).attr('id', button.id ? button.id : 'button-' + i)
                        .appendTo(self.$bar.find('.noty_buttons'))
                        .on('click', function(event) {
                            if($.isFunction(button.onClick)) {
                                button.onClick.call($button, self, event);
                            }
                        });
                });
            }

            // For easy access
            this.$message = this.$bar.find('.noty_message');
            this.$closeButton = this.$bar.find('.noty_close');
            this.$buttons = this.$bar.find('.noty_buttons');

            $.noty.store[this.options.id] = this; // store noty for api

        }, // end _build

        show: function() {

            var self = this;

            (self.options.custom) ? self.options.custom.find(self.options.layout.container.selector).append(self.$bar) : $(self.options.layout.container.selector).append(self.$bar);

            if(self.options.theme && self.options.theme.style)
                self.options.theme.style.apply(self);

            ($.type(self.options.layout.css) === 'function') ? this.options.layout.css.apply(self.$bar) : self.$bar.css(this.options.layout.css || {});

            self.$bar.addClass(self.options.layout.addClass);

            self.options.layout.container.style.apply($(self.options.layout.container.selector));

            self.showing = true;

            if(self.options.theme && self.options.theme.style)
                self.options.theme.callback.onShow.apply(this);

            if($.inArray('click', self.options.closeWith) > -1)
                self.$bar.css('cursor', 'pointer').one('click', function(evt) {
                    self.stopPropagation(evt);
                    if(self.options.callback.onCloseClick) {
                        self.options.callback.onCloseClick.apply(self);
                    }
                    self.close();
                });

            if($.inArray('hover', self.options.closeWith) > -1)
                self.$bar.one('mouseenter', function() {
                    self.close();
                });

            if($.inArray('button', self.options.closeWith) > -1)
                self.$closeButton.one('click', function(evt) {
                    self.stopPropagation(evt);
                    self.close();
                });

            if($.inArray('button', self.options.closeWith) == -1)
                self.$closeButton.remove();

            if(self.options.callback.onShow)
                self.options.callback.onShow.apply(self);

            if (typeof self.options.animation.open == 'string') {
                self.$bar.css('height', self.$bar.innerHeight());
                self.$bar.show().addClass(self.options.animation.open).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    if(self.options.callback.afterShow) self.options.callback.afterShow.apply(self);
                    self.showing = false;
                    self.shown = true;
                });

            } else {
                self.$bar.animate(
                    self.options.animation.open,
                    self.options.animation.speed,
                    self.options.animation.easing,
                    function() {
                        if(self.options.callback.afterShow) self.options.callback.afterShow.apply(self);
                        self.showing = false;
                        self.shown = true;
                    });
            }

            // If noty is have a timeout option
            if(self.options.timeout)
                self.$bar.delay(self.options.timeout).promise().done(function() {
                    self.close();
                });

            return this;

        }, // end show

        close: function() {

            if(this.closed) return;
            if(this.$bar && this.$bar.hasClass('i-am-closing-now')) return;

            var self = this;

            if(this.showing) {
                self.$bar.queue(
                    function() {
                        self.close.apply(self);
                    }
                );
                return;
            }

            if(!this.shown && !this.showing) { // If we are still waiting in the queue just delete from queue
                var queue = [];
                $.each($.noty.queue, function(i, n) {
                    if(n.options.id != self.options.id) {
                        queue.push(n);
                    }
                });
                $.noty.queue = queue;
                return;
            }

            self.$bar.addClass('i-am-closing-now');

            if(self.options.callback.onClose) {
                self.options.callback.onClose.apply(self);
            }

            if (typeof self.options.animation.close == 'string') {
                self.$bar.addClass(self.options.animation.close).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    if(self.options.callback.afterClose) self.options.callback.afterClose.apply(self);
                    self.closeCleanUp();
                });
            } else {
                self.$bar.clearQueue().stop().animate(
                    self.options.animation.close,
                    self.options.animation.speed,
                    self.options.animation.easing,
                    function() {
                        if(self.options.callback.afterClose) self.options.callback.afterClose.apply(self);
                    })
                    .promise().done(function() {
                        self.closeCleanUp();
                    });
            }

        }, // end close

        closeCleanUp: function() {

            var self = this;

            // Modal Cleaning
            if(self.options.modal) {
                $.notyRenderer.setModalCount(-1);
                if($.notyRenderer.getModalCount() == 0) $('.noty_modal').fadeOut('fast', function() {
                    $(this).remove();
                });
            }

            // Layout Cleaning
            $.notyRenderer.setLayoutCountFor(self, -1);
            if($.notyRenderer.getLayoutCountFor(self) == 0) $(self.options.layout.container.selector).remove();

            // Make sure self.$bar has not been removed before attempting to remove it
            if(typeof self.$bar !== 'undefined' && self.$bar !== null) {

                if (typeof self.options.animation.close == 'string') {
                    self.$bar.css('transition', 'all 100ms ease').css('border', 0).css('margin', 0).height(0);
                    self.$bar.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
                        self.$bar.remove();
                        self.$bar = null;
                        self.closed = true;

                        if(self.options.theme.callback && self.options.theme.callback.onClose) {
                            self.options.theme.callback.onClose.apply(self);
                        }
                    });
                } else {
                    self.$bar.remove();
                    self.$bar = null;
                    self.closed = true;
                }
            }

            delete $.noty.store[self.options.id]; // deleting noty from store

            if(self.options.theme.callback && self.options.theme.callback.onClose) {
                self.options.theme.callback.onClose.apply(self);
            }

            if(!self.options.dismissQueue) {
                // Queue render
                $.noty.ontap = true;

                $.notyRenderer.render();
            }

            if(self.options.maxVisible > 0 && self.options.dismissQueue) {
                $.notyRenderer.render();
            }

        }, // end close clean up

        setText: function(text) {
            if(!this.closed) {
                this.options.text = text;
                this.$bar.find('.noty_text').html(text);
            }
            return this;
        },

        setType: function(type) {
            if(!this.closed) {
                this.options.type = type;
                this.options.theme.style.apply(this);
                this.options.theme.callback.onShow.apply(this);
            }
            return this;
        },

        setTimeout: function(time) {
            if(!this.closed) {
                var self = this;
                this.options.timeout = time;
                self.$bar.delay(self.options.timeout).promise().done(function() {
                    self.close();
                });
            }
            return this;
        },

        stopPropagation: function(evt) {
            evt = evt || window.event;
            if(typeof evt.stopPropagation !== "undefined") {
                evt.stopPropagation();
            }
            else {
                evt.cancelBubble = true;
            }
        },

        closed : false,
        showing: false,
        shown  : false

    }; // end NotyObject

    $.notyRenderer = {};

    $.notyRenderer.init = function(options) {

        // Renderer creates a new noty
        var notification = Object.create(NotyObject).init(options);

        if(notification.options.killer)
            $.noty.closeAll();

        (notification.options.force) ? $.noty.queue.unshift(notification) : $.noty.queue.push(notification);

        $.notyRenderer.render();

        return ($.noty.returns == 'object') ? notification : notification.options.id;
    };

    $.notyRenderer.render = function() {

        var instance = $.noty.queue[0];

        if($.type(instance) === 'object') {
            if(instance.options.dismissQueue) {
                if(instance.options.maxVisible > 0) {
                    if($(instance.options.layout.container.selector + ' li').length < instance.options.maxVisible) {
                        $.notyRenderer.show($.noty.queue.shift());
                    }
                    else {

                    }
                }
                else {
                    $.notyRenderer.show($.noty.queue.shift());
                }
            }
            else {
                if($.noty.ontap) {
                    $.notyRenderer.show($.noty.queue.shift());
                    $.noty.ontap = false;
                }
            }
        }
        else {
            $.noty.ontap = true; // Queue is over
        }

    };

    $.notyRenderer.show = function(notification) {

        if(notification.options.modal) {
            $.notyRenderer.createModalFor(notification);
            $.notyRenderer.setModalCount(+1);
        }

        // Where is the container?
        if(notification.options.custom) {
            if(notification.options.custom.find(notification.options.layout.container.selector).length == 0) {
                notification.options.custom.append($(notification.options.layout.container.object).addClass('i-am-new'));
            }
            else {
                notification.options.custom.find(notification.options.layout.container.selector).removeClass('i-am-new');
            }
        }
        else {
            if($(notification.options.layout.container.selector).length == 0) {
                $('body').append($(notification.options.layout.container.object).addClass('i-am-new'));
            }
            else {
                $(notification.options.layout.container.selector).removeClass('i-am-new');
            }
        }

        $.notyRenderer.setLayoutCountFor(notification, +1);

        notification.show();
    };

    $.notyRenderer.createModalFor = function(notification) {
        if($('.noty_modal').length == 0) {
            var modal = $('<div/>').addClass('noty_modal').addClass(notification.options.theme).data('noty_modal_count', 0);

            if(notification.options.theme.modal && notification.options.theme.modal.css)
                modal.css(notification.options.theme.modal.css);

            modal.prependTo($('body')).fadeIn('fast');

            if($.inArray('backdrop', notification.options.closeWith) > -1)
                modal.on('click', function(e) {
                    $.noty.closeAll();
                });
        }
    };

    $.notyRenderer.getLayoutCountFor = function(notification) {
        return $(notification.options.layout.container.selector).data('noty_layout_count') || 0;
    };

    $.notyRenderer.setLayoutCountFor = function(notification, arg) {
        return $(notification.options.layout.container.selector).data('noty_layout_count', $.notyRenderer.getLayoutCountFor(notification) + arg);
    };

    $.notyRenderer.getModalCount = function() {
        return $('.noty_modal').data('noty_modal_count') || 0;
    };

    $.notyRenderer.setModalCount = function(arg) {
        return $('.noty_modal').data('noty_modal_count', $.notyRenderer.getModalCount() + arg);
    };

    // This is for custom container
    $.fn.noty = function(options) {
        options.custom = $(this);
        return $.notyRenderer.init(options);
    };

    $.noty = {};
    $.noty.queue = [];
    $.noty.ontap = true;
    $.noty.layouts = {};
    $.noty.themes = {};
    $.noty.returns = 'object';
    $.noty.store = {};

    $.noty.get = function(id) {
        return $.noty.store.hasOwnProperty(id) ? $.noty.store[id] : false;
    };

    $.noty.close = function(id) {
        return $.noty.get(id) ? $.noty.get(id).close() : false;
    };

    $.noty.setText = function(id, text) {
        return $.noty.get(id) ? $.noty.get(id).setText(text) : false;
    };

    $.noty.setType = function(id, type) {
        return $.noty.get(id) ? $.noty.get(id).setType(type) : false;
    };

    $.noty.clearQueue = function() {
        $.noty.queue = [];
    };

    $.noty.closeAll = function() {
        $.noty.clearQueue();
        $.each($.noty.store, function(id, noty) {
            noty.close();
        });
    };

    var windowAlert = window.alert;

    $.noty.consumeAlert = function(options) {
        window.alert = function(text) {
            if(options)
                options.text = text;
            else
                options = {text: text};

            $.notyRenderer.init(options);
        };
    };

    $.noty.stopConsumeAlert = function() {
        window.alert = windowAlert;
    };

    $.noty.defaults = {
        layout      : 'top',
        theme       : 'defaultTheme',
        type        : 'alert',
        text        : '',
        dismissQueue: true,
        template    : '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
        animation   : {
            open  : {height: 'toggle'},
            close : {height: 'toggle'},
            easing: 'swing',
            speed : 500
        },
        timeout     : false,
        force       : false,
        modal       : false,
        maxVisible  : 5,
        killer      : false,
        closeWith   : ['click'],
        callback    : {
            onShow      : function() {
            },
            afterShow   : function() {
            },
            onClose     : function() {
            },
            afterClose  : function() {
            },
            onCloseClick: function() {
            }
        },
        buttons     : false
    };

    $(window).on('resize', function() {
        $.each($.noty.layouts, function(index, layout) {
            layout.container.style.apply($(layout.container.selector));
        });
    });

    // Helpers
    window.noty = function noty(options) {
        return $.notyRenderer.init(options);
    };

$.noty.layouts.bottom = {
    name     : 'bottom',
    options  : {},
    container: {
        object  : '<ul id="noty_bottom_layout_container" />',
        selector: 'ul#noty_bottom_layout_container',
        style   : function() {
            $(this).css({
                bottom       : 0,
                left         : '5%',
                position     : 'fixed',
                width        : '90%',
                height       : 'auto',
                margin       : 0,
                padding      : 0,
                listStyleType: 'none',
                zIndex       : 9999999
            });
        }
    },
    parent   : {
        object  : '<li />',
        selector: 'li',
        css     : {}
    },
    css      : {
        display: 'none'
    },
    addClass : ''
};

$.noty.layouts.bottomCenter = {
    name     : 'bottomCenter',
    options  : { // overrides options

    },
    container: {
        object  : '<ul id="noty_bottomCenter_layout_container" />',
        selector: 'ul#noty_bottomCenter_layout_container',
        style   : function() {
            $(this).css({
                bottom       : 20,
                left         : 0,
                position     : 'fixed',
                width        : '310px',
                height       : 'auto',
                margin       : 0,
                padding      : 0,
                listStyleType: 'none',
                zIndex       : 10000000
            });

            $(this).css({
                left: ($(window).width() - $(this).outerWidth(false)) / 2 + 'px'
            });
        }
    },
    parent   : {
        object  : '<li />',
        selector: 'li',
        css     : {}
    },
    css      : {
        display: 'none',
        width  : '310px'
    },
    addClass : ''
};


$.noty.layouts.bottomLeft = {
    name     : 'bottomLeft',
    options  : { // overrides options

    },
    container: {
        object  : '<ul id="noty_bottomLeft_layout_container" />',
        selector: 'ul#noty_bottomLeft_layout_container',
        style   : function() {
            $(this).css({
                bottom       : 20,
                left         : 20,
                position     : 'fixed',
                width        : '310px',
                height       : 'auto',
                margin       : 0,
                padding      : 0,
                listStyleType: 'none',
                zIndex       : 10000000
            });

            if(window.innerWidth < 600) {
                $(this).css({
                    left: 5
                });
            }
        }
    },
    parent   : {
        object  : '<li />',
        selector: 'li',
        css     : {}
    },
    css      : {
        display: 'none',
        width  : '310px'
    },
    addClass : ''
};
$.noty.layouts.bottomRight = {
    name     : 'bottomRight',
    options  : { // overrides options

    },
    container: {
        object  : '<ul id="noty_bottomRight_layout_container" />',
        selector: 'ul#noty_bottomRight_layout_container',
        style   : function() {
            $(this).css({
                bottom       : 20,
                right        : 20,
                position     : 'fixed',
                width        : '310px',
                height       : 'auto',
                margin       : 0,
                padding      : 0,
                listStyleType: 'none',
                zIndex       : 10000000
            });

            if(window.innerWidth < 600) {
                $(this).css({
                    right: 5
                });
            }
        }
    },
    parent   : {
        object  : '<li />',
        selector: 'li',
        css     : {}
    },
    css      : {
        display: 'none',
        width  : '310px'
    },
    addClass : ''
};
$.noty.layouts.center = {
    name     : 'center',
    options  : { // overrides options

    },
    container: {
        object  : '<ul id="noty_center_layout_container" />',
        selector: 'ul#noty_center_layout_container',
        style   : function() {
            $(this).css({
                position     : 'fixed',
                width        : '310px',
                height       : 'auto',
                margin       : 0,
                padding      : 0,
                listStyleType: 'none',
                zIndex       : 10000000
            });

            // getting hidden height
            var dupe = $(this).clone().css({visibility: "hidden", display: "block", position: "absolute", top: 0, left: 0}).attr('id', 'dupe');
            $("body").append(dupe);
            dupe.find('.i-am-closing-now').remove();
            dupe.find('li').css('display', 'block');
            var actual_height = dupe.height();
            dupe.remove();

            if($(this).hasClass('i-am-new')) {
                $(this).css({
                    left: ($(window).width() - $(this).outerWidth(false)) / 2 + 'px',
                    top : ($(window).height() - actual_height) / 2 + 'px'
                });
            }
            else {
                $(this).animate({
                    left: ($(window).width() - $(this).outerWidth(false)) / 2 + 'px',
                    top : ($(window).height() - actual_height) / 2 + 'px'
                }, 500);
            }

        }
    },
    parent   : {
        object  : '<li />',
        selector: 'li',
        css     : {}
    },
    css      : {
        display: 'none',
        width  : '310px'
    },
    addClass : ''
};
$.noty.layouts.centerLeft = {
    name     : 'centerLeft',
    options  : { // overrides options

    },
    container: {
        object  : '<ul id="noty_centerLeft_layout_container" />',
        selector: 'ul#noty_centerLeft_layout_container',
        style   : function() {
            $(this).css({
                left         : 20,
                position     : 'fixed',
                width        : '310px',
                height       : 'auto',
                margin       : 0,
                padding      : 0,
                listStyleType: 'none',
                zIndex       : 10000000
            });

            // getting hidden height
            var dupe = $(this).clone().css({visibility: "hidden", display: "block", position: "absolute", top: 0, left: 0}).attr('id', 'dupe');
            $("body").append(dupe);
            dupe.find('.i-am-closing-now').remove();
            dupe.find('li').css('display', 'block');
            var actual_height = dupe.height();
            dupe.remove();

            if($(this).hasClass('i-am-new')) {
                $(this).css({
                    top: ($(window).height() - actual_height) / 2 + 'px'
                });
            }
            else {
                $(this).animate({
                    top: ($(window).height() - actual_height) / 2 + 'px'
                }, 500);
            }

            if(window.innerWidth < 600) {
                $(this).css({
                    left: 5
                });
            }

        }
    },
    parent   : {
        object  : '<li />',
        selector: 'li',
        css     : {}
    },
    css      : {
        display: 'none',
        width  : '310px'
    },
    addClass : ''
};

$.noty.layouts.centerRight = {
    name     : 'centerRight',
    options  : { // overrides options

    },
    container: {
        object  : '<ul id="noty_centerRight_layout_container" />',
        selector: 'ul#noty_centerRight_layout_container',
        style   : function() {
            $(this).css({
                right        : 20,
                position     : 'fixed',
                width        : '310px',
                height       : 'auto',
                margin       : 0,
                padding      : 0,
                listStyleType: 'none',
                zIndex       : 10000000
            });

            // getting hidden height
            var dupe = $(this).clone().css({visibility: "hidden", display: "block", position: "absolute", top: 0, left: 0}).attr('id', 'dupe');
            $("body").append(dupe);
            dupe.find('.i-am-closing-now').remove();
            dupe.find('li').css('display', 'block');
            var actual_height = dupe.height();
            dupe.remove();

            if($(this).hasClass('i-am-new')) {
                $(this).css({
                    top: ($(window).height() - actual_height) / 2 + 'px'
                });
            }
            else {
                $(this).animate({
                    top: ($(window).height() - actual_height) / 2 + 'px'
                }, 500);
            }

            if(window.innerWidth < 600) {
                $(this).css({
                    right: 5
                });
            }

        }
    },
    parent   : {
        object  : '<li />',
        selector: 'li',
        css     : {}
    },
    css      : {
        display: 'none',
        width  : '310px'
    },
    addClass : ''
};
$.noty.layouts.inline = {
    name     : 'inline',
    options  : {},
    container: {
        object  : '<ul class="noty_inline_layout_container" />',
        selector: 'ul.noty_inline_layout_container',
        style   : function() {
            $(this).css({
                width        : '100%',
                height       : 'auto',
                margin       : 0,
                padding      : 0,
                listStyleType: 'none',
                zIndex       : 9999999
            });
        }
    },
    parent   : {
        object  : '<li />',
        selector: 'li',
        css     : {}
    },
    css      : {
        display: 'none'
    },
    addClass : ''
};
$.noty.layouts.top = {
    name     : 'top',
    options  : {},
    container: {
        object  : '<ul id="noty_top_layout_container" />',
        selector: 'ul#noty_top_layout_container',
        style   : function() {
            $(this).css({
                top          : 0,
                left         : '5%',
                position     : 'fixed',
                width        : '90%',
                height       : 'auto',
                margin       : 0,
                padding      : 0,
                listStyleType: 'none',
                zIndex       : 9999999
            });
        }
    },
    parent   : {
        object  : '<li />',
        selector: 'li',
        css     : {}
    },
    css      : {
        display: 'none'
    },
    addClass : ''
};
$.noty.layouts.topCenter = {
    name     : 'topCenter',
    options  : { // overrides options

    },
    container: {
        object  : '<ul id="noty_topCenter_layout_container" />',
        selector: 'ul#noty_topCenter_layout_container',
        style   : function() {
            $(this).css({
                top          : 20,
                left         : 0,
                position     : 'fixed',
                width        : '310px',
                height       : 'auto',
                margin       : 0,
                padding      : 0,
                listStyleType: 'none',
                zIndex       : 10000000
            });

            $(this).css({
                left: ($(window).width() - $(this).outerWidth(false)) / 2 + 'px'
            });
        }
    },
    parent   : {
        object  : '<li />',
        selector: 'li',
        css     : {}
    },
    css      : {
        display: 'none',
        width  : '310px'
    },
    addClass : ''
};

$.noty.layouts.topLeft = {
    name     : 'topLeft',
    options  : { // overrides options

    },
    container: {
        object  : '<ul id="noty_topLeft_layout_container" />',
        selector: 'ul#noty_topLeft_layout_container',
        style   : function() {
            $(this).css({
                top          : 20,
                left         : 20,
                position     : 'fixed',
                width        : '310px',
                height       : 'auto',
                margin       : 0,
                padding      : 0,
                listStyleType: 'none',
                zIndex       : 10000000
            });

            if(window.innerWidth < 600) {
                $(this).css({
                    left: 5
                });
            }
        }
    },
    parent   : {
        object  : '<li />',
        selector: 'li',
        css     : {}
    },
    css      : {
        display: 'none',
        width  : '310px'
    },
    addClass : ''
};
$.noty.layouts.topRight = {
    name     : 'topRight',
    options  : { // overrides options

    },
    container: {
        object  : '<ul id="noty_topRight_layout_container" />',
        selector: 'ul#noty_topRight_layout_container',
        style   : function() {
            $(this).css({
                top          : 20,
                right        : 20,
                position     : 'fixed',
                width        : '310px',
                height       : 'auto',
                margin       : 0,
                padding      : 0,
                listStyleType: 'none',
                zIndex       : 10000000
            });

            if(window.innerWidth < 600) {
                $(this).css({
                    right: 5
                });
            }
        }
    },
    parent   : {
        object  : '<li />',
        selector: 'li',
        css     : {}
    },
    css      : {
        display: 'none',
        width  : '310px'
    },
    addClass : ''
};
$.noty.themes.bootstrapTheme = {
    name: 'bootstrapTheme',
    modal: {
        css: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            zIndex: 10000,
            opacity: 0.6,
            display: 'none',
            left: 0,
            top: 0
        }
    },
    style: function() {

        var containerSelector = this.options.layout.container.selector;
        $(containerSelector).addClass('list-group');

        this.$closeButton.append('<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>');
        this.$closeButton.addClass('close');

        this.$bar.addClass( "list-group-item" ).css('padding', '0px');

        switch (this.options.type) {
            case 'alert': case 'notification':
                this.$bar.addClass( "list-group-item-info" );
                break;
            case 'warning':
                this.$bar.addClass( "list-group-item-warning" );
                break;
            case 'error':
                this.$bar.addClass( "list-group-item-danger" );
                break;
            case 'information':
                this.$bar.addClass("list-group-item-info");
                break;
            case 'success':
                this.$bar.addClass( "list-group-item-success" );
                break;
        }

        this.$message.css({
            fontSize: '13px',
            lineHeight: '16px',
            textAlign: 'center',
            padding: '8px 10px 9px',
            width: 'auto',
            position: 'relative'
        });
    },
    callback: {
        onShow: function() {  },
        onClose: function() {  }
    }
};


$.noty.themes.defaultTheme = {
    name    : 'defaultTheme',
    helpers : {
        borderFix: function() {
            if(this.options.dismissQueue) {
                var selector = this.options.layout.container.selector + ' ' + this.options.layout.parent.selector;
                switch(this.options.layout.name) {
                    case 'top':
                        $(selector).css({borderRadius: '0px 0px 0px 0px'});
                        $(selector).last().css({borderRadius: '0px 0px 5px 5px'});
                        break;
                    case 'topCenter':
                    case 'topLeft':
                    case 'topRight':
                    case 'bottomCenter':
                    case 'bottomLeft':
                    case 'bottomRight':
                    case 'center':
                    case 'centerLeft':
                    case 'centerRight':
                    case 'inline':
                        $(selector).css({borderRadius: '0px 0px 0px 0px'});
                        $(selector).first().css({'border-top-left-radius': '5px', 'border-top-right-radius': '5px'});
                        $(selector).last().css({'border-bottom-left-radius': '5px', 'border-bottom-right-radius': '5px'});
                        break;
                    case 'bottom':
                        $(selector).css({borderRadius: '0px 0px 0px 0px'});
                        $(selector).first().css({borderRadius: '5px 5px 0px 0px'});
                        break;
                    default:
                        break;
                }
            }
        }
    },
    modal   : {
        css: {
            position       : 'fixed',
            width          : '100%',
            height         : '100%',
            backgroundColor: '#000',
            zIndex         : 10000,
            opacity        : 0.6,
            display        : 'none',
            left           : 0,
            top            : 0
        }
    },
    style   : function() {

        this.$bar.css({
            overflow  : 'hidden',
            background: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAoCAQAAAClM0ndAAAAhklEQVR4AdXO0QrCMBBE0bttkk38/w8WRERpdyjzVOc+HxhIHqJGMQcFFkpYRQotLLSw0IJ5aBdovruMYDA/kT8plF9ZKLFQcgF18hDj1SbQOMlCA4kao0iiXmah7qBWPdxpohsgVZyj7e5I9KcID+EhiDI5gxBYKLBQYKHAQoGFAoEks/YEGHYKB7hFxf0AAAAASUVORK5CYII=') repeat-x scroll left top #fff"
        });

        this.$message.css({
            fontSize  : '13px',
            lineHeight: '16px',
            textAlign : 'center',
            padding   : '8px 10px 9px',
            width     : 'auto',
            position  : 'relative'
        });

        this.$closeButton.css({
            position  : 'absolute',
            top       : 4, right: 4,
            width     : 10, height: 10,
            background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAxUlEQVR4AR3MPUoDURSA0e++uSkkOxC3IAOWNtaCIDaChfgXBMEZbQRByxCwk+BasgQRZLSYoLgDQbARxry8nyumPcVRKDfd0Aa8AsgDv1zp6pYd5jWOwhvebRTbzNNEw5BSsIpsj/kurQBnmk7sIFcCF5yyZPDRG6trQhujXYosaFoc+2f1MJ89uc76IND6F9BvlXUdpb6xwD2+4q3me3bysiHvtLYrUJto7PD/ve7LNHxSg/woN2kSz4txasBdhyiz3ugPGetTjm3XRokAAAAASUVORK5CYII=)",
            display   : 'none',
            cursor    : 'pointer'
        });

        this.$buttons.css({
            padding        : 5,
            textAlign      : 'right',
            borderTop      : '1px solid #ccc',
            backgroundColor: '#fff'
        });

        this.$buttons.find('button').css({
            marginLeft: 5
        });

        this.$buttons.find('button:first').css({
            marginLeft: 0
        });

        this.$bar.on({
            mouseenter: function() {
                $(this).find('.noty_close').stop().fadeTo('normal', 1);
            },
            mouseleave: function() {
                $(this).find('.noty_close').stop().fadeTo('normal', 0);
            }
        });

        switch(this.options.layout.name) {
            case 'top':
                this.$bar.css({
                    borderRadius: '0px 0px 5px 5px',
                    borderBottom: '2px solid #eee',
                    borderLeft  : '2px solid #eee',
                    borderRight : '2px solid #eee',
                    boxShadow   : "0 2px 4px rgba(0, 0, 0, 0.1)"
                });
                break;
            case 'topCenter':
            case 'center':
            case 'bottomCenter':
            case 'inline':
                this.$bar.css({
                    borderRadius: '5px',
                    border      : '1px solid #eee',
                    boxShadow   : "0 2px 4px rgba(0, 0, 0, 0.1)"
                });
                this.$message.css({fontSize: '13px', textAlign: 'center'});
                break;
            case 'topLeft':
            case 'topRight':
            case 'bottomLeft':
            case 'bottomRight':
            case 'centerLeft':
            case 'centerRight':
                this.$bar.css({
                    borderRadius: '5px',
                    border      : '1px solid #eee',
                    boxShadow   : "0 2px 4px rgba(0, 0, 0, 0.1)"
                });
                this.$message.css({fontSize: '13px', textAlign: 'left'});
                break;
            case 'bottom':
                this.$bar.css({
                    borderRadius: '5px 5px 0px 0px',
                    borderTop   : '2px solid #eee',
                    borderLeft  : '2px solid #eee',
                    borderRight : '2px solid #eee',
                    boxShadow   : "0 -2px 4px rgba(0, 0, 0, 0.1)"
                });
                break;
            default:
                this.$bar.css({
                    border   : '2px solid #eee',
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                });
                break;
        }

        switch(this.options.type) {
            case 'alert':
            case 'notification':
                this.$bar.css({backgroundColor: '#FFF', borderColor: '#CCC', color: '#444'});
                break;
            case 'warning':
                this.$bar.css({backgroundColor: '#FFEAA8', borderColor: '#FFC237', color: '#826200'});
                this.$buttons.css({borderTop: '1px solid #FFC237'});
                break;
            case 'error':
                this.$bar.css({backgroundColor: 'red', borderColor: 'darkred', color: '#FFF'});
                this.$message.css({fontWeight: 'bold'});
                this.$buttons.css({borderTop: '1px solid darkred'});
                break;
            case 'information':
                this.$bar.css({backgroundColor: '#57B7E2', borderColor: '#0B90C4', color: '#FFF'});
                this.$buttons.css({borderTop: '1px solid #0B90C4'});
                break;
            case 'success':
                this.$bar.css({backgroundColor: 'lightgreen', borderColor: '#50C24E', color: 'darkgreen'});
                this.$buttons.css({borderTop: '1px solid #50C24E'});
                break;
            default:
                this.$bar.css({backgroundColor: '#FFF', borderColor: '#CCC', color: '#444'});
                break;
        }
    },
    callback: {
        onShow : function() {
            $.noty.themes.defaultTheme.helpers.borderFix.apply(this);
        },
        onClose: function() {
            $.noty.themes.defaultTheme.helpers.borderFix.apply(this);
        }
    }
};

$.noty.themes.relax = {
    name    : 'relax',
    helpers : {},
    modal   : {
        css: {
            position       : 'fixed',
            width          : '100%',
            height         : '100%',
            backgroundColor: '#000',
            zIndex         : 10000,
            opacity        : 0.6,
            display        : 'none',
            left           : 0,
            top            : 0
        }
    },
    style   : function() {

        this.$bar.css({
            overflow    : 'hidden',
            margin      : '4px 0',
            borderRadius: '2px'
        });

        this.$message.css({
            fontSize  : '14px',
            lineHeight: '16px',
            textAlign : 'center',
            padding   : '10px',
            width     : 'auto',
            position  : 'relative'
        });

        this.$closeButton.css({
            position  : 'absolute',
            top       : 4, right: 4,
            width     : 10, height: 10,
            background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAxUlEQVR4AR3MPUoDURSA0e++uSkkOxC3IAOWNtaCIDaChfgXBMEZbQRByxCwk+BasgQRZLSYoLgDQbARxry8nyumPcVRKDfd0Aa8AsgDv1zp6pYd5jWOwhvebRTbzNNEw5BSsIpsj/kurQBnmk7sIFcCF5yyZPDRG6trQhujXYosaFoc+2f1MJ89uc76IND6F9BvlXUdpb6xwD2+4q3me3bysiHvtLYrUJto7PD/ve7LNHxSg/woN2kSz4txasBdhyiz3ugPGetTjm3XRokAAAAASUVORK5CYII=)",
            display   : 'none',
            cursor    : 'pointer'
        });

        this.$buttons.css({
            padding        : 5,
            textAlign      : 'right',
            borderTop      : '1px solid #ccc',
            backgroundColor: '#fff'
        });

        this.$buttons.find('button').css({
            marginLeft: 5
        });

        this.$buttons.find('button:first').css({
            marginLeft: 0
        });

        this.$bar.on({
            mouseenter: function() {
                $(this).find('.noty_close').stop().fadeTo('normal', 1);
            },
            mouseleave: function() {
                $(this).find('.noty_close').stop().fadeTo('normal', 0);
            }
        });

        switch(this.options.layout.name) {
            case 'top':
                this.$bar.css({
                    borderBottom: '2px solid #eee',
                    borderLeft  : '2px solid #eee',
                    borderRight : '2px solid #eee',
                    borderTop   : '2px solid #eee',
                    boxShadow   : "0 2px 4px rgba(0, 0, 0, 0.1)"
                });
                break;
            case 'topCenter':
            case 'center':
            case 'bottomCenter':
            case 'inline':
                this.$bar.css({
                    border   : '1px solid #eee',
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                });
                this.$message.css({fontSize: '13px', textAlign: 'center'});
                break;
            case 'topLeft':
            case 'topRight':
            case 'bottomLeft':
            case 'bottomRight':
            case 'centerLeft':
            case 'centerRight':
                this.$bar.css({
                    border   : '1px solid #eee',
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                });
                this.$message.css({fontSize: '13px', textAlign: 'left'});
                break;
            case 'bottom':
                this.$bar.css({
                    borderTop   : '2px solid #eee',
                    borderLeft  : '2px solid #eee',
                    borderRight : '2px solid #eee',
                    borderBottom: '2px solid #eee',
                    boxShadow   : "0 -2px 4px rgba(0, 0, 0, 0.1)"
                });
                break;
            default:
                this.$bar.css({
                    border   : '2px solid #eee',
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                });
                break;
        }

        switch(this.options.type) {
            case 'alert':
            case 'notification':
                this.$bar.css({backgroundColor: '#FFF', borderColor: '#dedede', color: '#444'});
                break;
            case 'warning':
                this.$bar.css({backgroundColor: '#FFEAA8', borderColor: '#FFC237', color: '#826200'});
                this.$buttons.css({borderTop: '1px solid #FFC237'});
                break;
            case 'error':
                this.$bar.css({backgroundColor: '#FF8181', borderColor: '#e25353', color: '#FFF'});
                this.$message.css({fontWeight: 'bold'});
                this.$buttons.css({borderTop: '1px solid darkred'});
                break;
            case 'information':
                this.$bar.css({backgroundColor: '#78C5E7', borderColor: '#3badd6', color: '#FFF'});
                this.$buttons.css({borderTop: '1px solid #0B90C4'});
                break;
            case 'success':
                this.$bar.css({backgroundColor: '#BCF5BC', borderColor: '#7cdd77', color: 'darkgreen'});
                this.$buttons.css({borderTop: '1px solid #50C24E'});
                break;
            default:
                this.$bar.css({backgroundColor: '#FFF', borderColor: '#CCC', color: '#444'});
                break;
        }
    },
    callback: {
        onShow : function() {

        },
        onClose: function() {

        }
    }
};


return window.noty;

});
(function(root, factory) {
  if(typeof exports === 'object') {
    module.exports = factory();
  }
  else if(typeof define === 'function' && define.amd) {
    define('GMaps', [], factory);
  }

  root.GMaps = factory();

}(this, function() {

/*!
 * GMaps.js v0.4.17
 * http://hpneo.github.com/gmaps/
 *
 * Copyright 2015, Gustavo Leon
 * Released under the MIT License.
 */

if (!(typeof window.google === 'object' && window.google.maps)) {
  throw 'Google Maps API is required. Please register the following JavaScript library http://maps.google.com/maps/api/js?sensor=true.'
}

var extend_object = function(obj, new_obj) {
  var name;

  if (obj === new_obj) {
    return obj;
  }

  for (name in new_obj) {
    obj[name] = new_obj[name];
  }

  return obj;
};

var replace_object = function(obj, replace) {
  var name;

  if (obj === replace) {
    return obj;
  }

  for (name in replace) {
    if (obj[name] != undefined) {
      obj[name] = replace[name];
    }
  }

  return obj;
};

var array_map = function(array, callback) {
  var original_callback_params = Array.prototype.slice.call(arguments, 2),
      array_return = [],
      array_length = array.length,
      i;

  if (Array.prototype.map && array.map === Array.prototype.map) {
    array_return = Array.prototype.map.call(array, function(item) {
      callback_params = original_callback_params;
      callback_params.splice(0, 0, item);

      return callback.apply(this, callback_params);
    });
  }
  else {
    for (i = 0; i < array_length; i++) {
      callback_params = original_callback_params;
      callback_params.splice(0, 0, array[i]);
      array_return.push(callback.apply(this, callback_params));
    }
  }

  return array_return;
};

var array_flat = function(array) {
  var new_array = [],
      i;

  for (i = 0; i < array.length; i++) {
    new_array = new_array.concat(array[i]);
  }

  return new_array;
};

var coordsToLatLngs = function(coords, useGeoJSON) {
  var first_coord = coords[0],
      second_coord = coords[1];

  if (useGeoJSON) {
    first_coord = coords[1];
    second_coord = coords[0];
  }

  return new google.maps.LatLng(first_coord, second_coord);
};

var arrayToLatLng = function(coords, useGeoJSON) {
  var i;

  for (i = 0; i < coords.length; i++) {
    if (!(coords[i] instanceof google.maps.LatLng)) {
      if (coords[i].length > 0 && typeof(coords[i][0]) === "object") {
        coords[i] = arrayToLatLng(coords[i], useGeoJSON);
      }
      else {
        coords[i] = coordsToLatLngs(coords[i], useGeoJSON);
      }
    }
  }

  return coords;
};

var getElementById = function(id, context) {
  var element,
  id = id.replace('#', '');

  if ('jQuery' in this && context) {
    element = $('#' + id, context)[0];
  } else {
    element = document.getElementById(id);
  };

  return element;
};

var findAbsolutePosition = function(obj)  {
  var curleft = 0,
      curtop = 0;

  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
  }

  return [curleft, curtop];
};

var GMaps = (function(global) {
  "use strict";

  var doc = document;

  var GMaps = function(options) {
    if (!this) return new GMaps(options);

    options.zoom = options.zoom || 15;
    options.mapType = options.mapType || 'roadmap';

    var self = this,
        i,
        events_that_hide_context_menu = [
          'bounds_changed', 'center_changed', 'click', 'dblclick', 'drag',
          'dragend', 'dragstart', 'idle', 'maptypeid_changed', 'projection_changed',
          'resize', 'tilesloaded', 'zoom_changed'
        ],
        events_that_doesnt_hide_context_menu = ['mousemove', 'mouseout', 'mouseover'],
        options_to_be_deleted = ['el', 'lat', 'lng', 'mapType', 'width', 'height', 'markerClusterer', 'enableNewStyle'],
        container_id = options.el || options.div,
        markerClustererFunction = options.markerClusterer,
        mapType = google.maps.MapTypeId[options.mapType.toUpperCase()],
        map_center = new google.maps.LatLng(options.lat, options.lng),
        zoomControl = options.zoomControl || true,
        zoomControlOpt = options.zoomControlOpt || {
          style: 'DEFAULT',
          position: 'TOP_LEFT'
        },
        zoomControlStyle = zoomControlOpt.style || 'DEFAULT',
        zoomControlPosition = zoomControlOpt.position || 'TOP_LEFT',
        panControl = options.panControl || true,
        mapTypeControl = options.mapTypeControl || true,
        scaleControl = options.scaleControl || true,
        streetViewControl = options.streetViewControl || true,
        overviewMapControl = overviewMapControl || true,
        map_options = {},
        map_base_options = {
          zoom: this.zoom,
          center: map_center,
          mapTypeId: mapType
        },
        map_controls_options = {
          panControl: panControl,
          zoomControl: zoomControl,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle[zoomControlStyle],
            position: google.maps.ControlPosition[zoomControlPosition]
          },
          mapTypeControl: mapTypeControl,
          scaleControl: scaleControl,
          streetViewControl: streetViewControl,
          overviewMapControl: overviewMapControl
        };

    if (typeof(options.el) === 'string' || typeof(options.div) === 'string') {
      this.el = getElementById(container_id, options.context);
    } else {
      this.el = container_id;
    }

    if (typeof(this.el) === 'undefined' || this.el === null) {
      throw 'No element defined.';
    }

    window.context_menu = window.context_menu || {};
    window.context_menu[self.el.id] = {};

    this.controls = [];
    this.overlays = [];
    this.layers = []; // array with kml/georss and fusiontables layers, can be as many
    this.singleLayers = {}; // object with the other layers, only one per layer
    this.markers = [];
    this.polylines = [];
    this.routes = [];
    this.polygons = [];
    this.infoWindow = null;
    this.overlay_el = null;
    this.zoom = options.zoom;
    this.registered_events = {};

    this.el.style.width = options.width || this.el.scrollWidth || this.el.offsetWidth;
    this.el.style.height = options.height || this.el.scrollHeight || this.el.offsetHeight;

    google.maps.visualRefresh = options.enableNewStyle;

    for (i = 0; i < options_to_be_deleted.length; i++) {
      delete options[options_to_be_deleted[i]];
    }

    if(options.disableDefaultUI != true) {
      map_base_options = extend_object(map_base_options, map_controls_options);
    }

    map_options = extend_object(map_base_options, options);

    for (i = 0; i < events_that_hide_context_menu.length; i++) {
      delete map_options[events_that_hide_context_menu[i]];
    }

    for (i = 0; i < events_that_doesnt_hide_context_menu.length; i++) {
      delete map_options[events_that_doesnt_hide_context_menu[i]];
    }

    this.map = new google.maps.Map(this.el, map_options);

    if (markerClustererFunction) {
      this.markerClusterer = markerClustererFunction.apply(this, [this.map]);
    }

    var buildContextMenuHTML = function(control, e) {
      var html = '',
          options = window.context_menu[self.el.id][control];

      for (var i in options){
        if (options.hasOwnProperty(i)) {
          var option = options[i];

          html += '<li><a id="' + control + '_' + i + '" href="#">' + option.title + '</a></li>';
        }
      }

      if (!getElementById('gmaps_context_menu')) return;

      var context_menu_element = getElementById('gmaps_context_menu');
      
      context_menu_element.innerHTML = html;

      var context_menu_items = context_menu_element.getElementsByTagName('a'),
          context_menu_items_count = context_menu_items.length,
          i;

      for (i = 0; i < context_menu_items_count; i++) {
        var context_menu_item = context_menu_items[i];

        var assign_menu_item_action = function(ev){
          ev.preventDefault();

          options[this.id.replace(control + '_', '')].action.apply(self, [e]);
          self.hideContextMenu();
        };

        google.maps.event.clearListeners(context_menu_item, 'click');
        google.maps.event.addDomListenerOnce(context_menu_item, 'click', assign_menu_item_action, false);
      }

      var position = findAbsolutePosition.apply(this, [self.el]),
          left = position[0] + e.pixel.x - 15,
          top = position[1] + e.pixel.y- 15;

      context_menu_element.style.left = left + "px";
      context_menu_element.style.top = top + "px";

      context_menu_element.style.display = 'block';
    };

    this.buildContextMenu = function(control, e) {
      if (control === 'marker') {
        e.pixel = {};

        var overlay = new google.maps.OverlayView();
        overlay.setMap(self.map);
        
        overlay.draw = function() {
          var projection = overlay.getProjection(),
              position = e.marker.getPosition();
          
          e.pixel = projection.fromLatLngToContainerPixel(position);

          buildContextMenuHTML(control, e);
        };
      }
      else {
        buildContextMenuHTML(control, e);
      }
    };

    this.setContextMenu = function(options) {
      window.context_menu[self.el.id][options.control] = {};

      var i,
          ul = doc.createElement('ul');

      for (i in options.options) {
        if (options.options.hasOwnProperty(i)) {
          var option = options.options[i];

          window.context_menu[self.el.id][options.control][option.name] = {
            title: option.title,
            action: option.action
          };
        }
      }

      ul.id = 'gmaps_context_menu';
      ul.style.display = 'none';
      ul.style.position = 'absolute';
      ul.style.minWidth = '100px';
      ul.style.background = 'white';
      ul.style.listStyle = 'none';
      ul.style.padding = '8px';
      ul.style.boxShadow = '2px 2px 6px #ccc';

      doc.body.appendChild(ul);

      var context_menu_element = getElementById('gmaps_context_menu')

      google.maps.event.addDomListener(context_menu_element, 'mouseout', function(ev) {
        if (!ev.relatedTarget || !this.contains(ev.relatedTarget)) {
          window.setTimeout(function(){
            context_menu_element.style.display = 'none';
          }, 400);
        }
      }, false);
    };

    this.hideContextMenu = function() {
      var context_menu_element = getElementById('gmaps_context_menu');

      if (context_menu_element) {
        context_menu_element.style.display = 'none';
      }
    };

    var setupListener = function(object, name) {
      google.maps.event.addListener(object, name, function(e){
        if (e == undefined) {
          e = this;
        }

        options[name].apply(this, [e]);

        self.hideContextMenu();
      });
    };

    //google.maps.event.addListener(this.map, 'idle', this.hideContextMenu);
    google.maps.event.addListener(this.map, 'zoom_changed', this.hideContextMenu);

    for (var ev = 0; ev < events_that_hide_context_menu.length; ev++) {
      var name = events_that_hide_context_menu[ev];

      if (name in options) {
        setupListener(this.map, name);
      }
    }

    for (var ev = 0; ev < events_that_doesnt_hide_context_menu.length; ev++) {
      var name = events_that_doesnt_hide_context_menu[ev];

      if (name in options) {
        setupListener(this.map, name);
      }
    }

    google.maps.event.addListener(this.map, 'rightclick', function(e) {
      if (options.rightclick) {
        options.rightclick.apply(this, [e]);
      }

      if(window.context_menu[self.el.id]['map'] != undefined) {
        self.buildContextMenu('map', e);
      }
    });

    this.refresh = function() {
      google.maps.event.trigger(this.map, 'resize');
    };

    this.fitZoom = function() {
      var latLngs = [],
          markers_length = this.markers.length,
          i;

      for (i = 0; i < markers_length; i++) {
        if(typeof(this.markers[i].visible) === 'boolean' && this.markers[i].visible) {
          latLngs.push(this.markers[i].getPosition());
        }
      }

      this.fitLatLngBounds(latLngs);
    };

    this.fitLatLngBounds = function(latLngs) {
      var total = latLngs.length,
          bounds = new google.maps.LatLngBounds(),
          i;

      for(i = 0; i < total; i++) {
        bounds.extend(latLngs[i]);
      }

      this.map.fitBounds(bounds);
    };

    this.setCenter = function(lat, lng, callback) {
      this.map.panTo(new google.maps.LatLng(lat, lng));

      if (callback) {
        callback();
      }
    };

    this.getElement = function() {
      return this.el;
    };

    this.zoomIn = function(value) {
      value = value || 1;

      this.zoom = this.map.getZoom() + value;
      this.map.setZoom(this.zoom);
    };

    this.zoomOut = function(value) {
      value = value || 1;

      this.zoom = this.map.getZoom() - value;
      this.map.setZoom(this.zoom);
    };

    var native_methods = [],
        method;

    for (method in this.map) {
      if (typeof(this.map[method]) == 'function' && !this[method]) {
        native_methods.push(method);
      }
    }

    for (i = 0; i < native_methods.length; i++) {
      (function(gmaps, scope, method_name) {
        gmaps[method_name] = function(){
          return scope[method_name].apply(scope, arguments);
        };
      })(this, this.map, native_methods[i]);
    }
  };

  return GMaps;
})(this);

GMaps.prototype.createControl = function(options) {
  var control = document.createElement('div');

  control.style.cursor = 'pointer';
  
  if (options.disableDefaultStyles !== true) {
    control.style.fontFamily = 'Roboto, Arial, sans-serif';
    control.style.fontSize = '11px';
    control.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
  }

  for (var option in options.style) {
    control.style[option] = options.style[option];
  }

  if (options.id) {
    control.id = options.id;
  }

  if (options.classes) {
    control.className = options.classes;
  }

  if (options.content) {
    if (typeof options.content === 'string') {
      control.innerHTML = options.content;
    }
    else if (options.content instanceof HTMLElement) {
      control.appendChild(options.content);
    }
  }

  if (options.position) {
    control.position = google.maps.ControlPosition[options.position.toUpperCase()];
  }

  for (var ev in options.events) {
    (function(object, name) {
      google.maps.event.addDomListener(object, name, function(){
        options.events[name].apply(this, [this]);
      });
    })(control, ev);
  }

  control.index = 1;

  return control;
};

GMaps.prototype.addControl = function(options) {
  var control = this.createControl(options);
  
  this.controls.push(control);
  this.map.controls[control.position].push(control);

  return control;
};

GMaps.prototype.removeControl = function(control) {
  var position = null,
      i;

  for (i = 0; i < this.controls.length; i++) {
    if (this.controls[i] == control) {
      position = this.controls[i].position;
      this.controls.splice(i, 1);
    }
  }

  if (position) {
    for (i = 0; i < this.map.controls.length; i++) {
      var controlsForPosition = this.map.controls[control.position];

      if (controlsForPosition.getAt(i) == control) {
        controlsForPosition.removeAt(i);

        break;
      }
    }
  }

  return control;
};

GMaps.prototype.createMarker = function(options) {
  if (options.lat == undefined && options.lng == undefined && options.position == undefined) {
    throw 'No latitude or longitude defined.';
  }

  var self = this,
      details = options.details,
      fences = options.fences,
      outside = options.outside,
      base_options = {
        position: new google.maps.LatLng(options.lat, options.lng),
        map: null
      },
      marker_options = extend_object(base_options, options);

  delete marker_options.lat;
  delete marker_options.lng;
  delete marker_options.fences;
  delete marker_options.outside;

  var marker = new google.maps.Marker(marker_options);

  marker.fences = fences;

  if (options.infoWindow) {
    marker.infoWindow = new google.maps.InfoWindow(options.infoWindow);

    var info_window_events = ['closeclick', 'content_changed', 'domready', 'position_changed', 'zindex_changed'];

    for (var ev = 0; ev < info_window_events.length; ev++) {
      (function(object, name) {
        if (options.infoWindow[name]) {
          google.maps.event.addListener(object, name, function(e){
            options.infoWindow[name].apply(this, [e]);
          });
        }
      })(marker.infoWindow, info_window_events[ev]);
    }
  }

  var marker_events = ['animation_changed', 'clickable_changed', 'cursor_changed', 'draggable_changed', 'flat_changed', 'icon_changed', 'position_changed', 'shadow_changed', 'shape_changed', 'title_changed', 'visible_changed', 'zindex_changed'];

  var marker_events_with_mouse = ['dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseout', 'mouseover', 'mouseup'];

  for (var ev = 0; ev < marker_events.length; ev++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(){
          options[name].apply(this, [this]);
        });
      }
    })(marker, marker_events[ev]);
  }

  for (var ev = 0; ev < marker_events_with_mouse.length; ev++) {
    (function(map, object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(me){
          if(!me.pixel){
            me.pixel = map.getProjection().fromLatLngToPoint(me.latLng)
          }
          
          options[name].apply(this, [me]);
        });
      }
    })(this.map, marker, marker_events_with_mouse[ev]);
  }

  google.maps.event.addListener(marker, 'click', function() {
    this.details = details;

    if (options.click) {
      options.click.apply(this, [this]);
    }

    if (marker.infoWindow) {
      self.hideInfoWindows();
      marker.infoWindow.open(self.map, marker);
    }
  });

  google.maps.event.addListener(marker, 'rightclick', function(e) {
    e.marker = this;

    if (options.rightclick) {
      options.rightclick.apply(this, [e]);
    }

    if (window.context_menu[self.el.id]['marker'] != undefined) {
      self.buildContextMenu('marker', e);
    }
  });

  if (marker.fences) {
    google.maps.event.addListener(marker, 'dragend', function() {
      self.checkMarkerGeofence(marker, function(m, f) {
        outside(m, f);
      });
    });
  }

  return marker;
};

GMaps.prototype.addMarker = function(options) {
  var marker;
  if(options.hasOwnProperty('gm_accessors_')) {
    // Native google.maps.Marker object
    marker = options;
  }
  else {
    if ((options.hasOwnProperty('lat') && options.hasOwnProperty('lng')) || options.position) {
      marker = this.createMarker(options);
    }
    else {
      throw 'No latitude or longitude defined.';
    }
  }

  marker.setMap(this.map);

  if(this.markerClusterer) {
    this.markerClusterer.addMarker(marker);
  }

  this.markers.push(marker);

  GMaps.fire('marker_added', marker, this);

  return marker;
};

GMaps.prototype.addMarkers = function(array) {
  for (var i = 0, marker; marker=array[i]; i++) {
    this.addMarker(marker);
  }

  return this.markers;
};

GMaps.prototype.hideInfoWindows = function() {
  for (var i = 0, marker; marker = this.markers[i]; i++){
    if (marker.infoWindow) {
      marker.infoWindow.close();
    }
  }
};

GMaps.prototype.removeMarker = function(marker) {
  for (var i = 0; i < this.markers.length; i++) {
    if (this.markers[i] === marker) {
      this.markers[i].setMap(null);
      this.markers.splice(i, 1);

      if(this.markerClusterer) {
        this.markerClusterer.removeMarker(marker);
      }

      GMaps.fire('marker_removed', marker, this);

      break;
    }
  }

  return marker;
};

GMaps.prototype.removeMarkers = function (collection) {
  var new_markers = [];

  if (typeof collection == 'undefined') {
    for (var i = 0; i < this.markers.length; i++) {
      var marker = this.markers[i];
      marker.setMap(null);

      if(this.markerClusterer) {
        this.markerClusterer.removeMarker(marker);
      }

      GMaps.fire('marker_removed', marker, this);
    }
    
    this.markers = new_markers;
  }
  else {
    for (var i = 0; i < collection.length; i++) {
      var index = this.markers.indexOf(collection[i]);

      if (index > -1) {
        var marker = this.markers[index];
        marker.setMap(null);

        if(this.markerClusterer) {
          this.markerClusterer.removeMarker(marker);
        }

        GMaps.fire('marker_removed', marker, this);
      }
    }

    for (var i = 0; i < this.markers.length; i++) {
      var marker = this.markers[i];
      if (marker.getMap() != null) {
        new_markers.push(marker);
      }
    }

    this.markers = new_markers;
  }
};

GMaps.prototype.drawOverlay = function(options) {
  var overlay = new google.maps.OverlayView(),
      auto_show = true;

  overlay.setMap(this.map);

  if (options.auto_show != null) {
    auto_show = options.auto_show;
  }

  overlay.onAdd = function() {
    var el = document.createElement('div');

    el.style.borderStyle = "none";
    el.style.borderWidth = "0px";
    el.style.position = "absolute";
    el.style.zIndex = 100;
    el.innerHTML = options.content;

    overlay.el = el;

    if (!options.layer) {
      options.layer = 'overlayLayer';
    }
    
    var panes = this.getPanes(),
        overlayLayer = panes[options.layer],
        stop_overlay_events = ['contextmenu', 'DOMMouseScroll', 'dblclick', 'mousedown'];

    overlayLayer.appendChild(el);

    for (var ev = 0; ev < stop_overlay_events.length; ev++) {
      (function(object, name) {
        google.maps.event.addDomListener(object, name, function(e){
          if (navigator.userAgent.toLowerCase().indexOf('msie') != -1 && document.all) {
            e.cancelBubble = true;
            e.returnValue = false;
          }
          else {
            e.stopPropagation();
          }
        });
      })(el, stop_overlay_events[ev]);
    }

    if (options.click) {
      panes.overlayMouseTarget.appendChild(overlay.el);
      google.maps.event.addDomListener(overlay.el, 'click', function() {
        options.click.apply(overlay, [overlay]);
      });
    }

    google.maps.event.trigger(this, 'ready');
  };

  overlay.draw = function() {
    var projection = this.getProjection(),
        pixel = projection.fromLatLngToDivPixel(new google.maps.LatLng(options.lat, options.lng));

    options.horizontalOffset = options.horizontalOffset || 0;
    options.verticalOffset = options.verticalOffset || 0;

    var el = overlay.el,
        content = el.children[0],
        content_height = content.clientHeight,
        content_width = content.clientWidth;

    switch (options.verticalAlign) {
      case 'top':
        el.style.top = (pixel.y - content_height + options.verticalOffset) + 'px';
        break;
      default:
      case 'middle':
        el.style.top = (pixel.y - (content_height / 2) + options.verticalOffset) + 'px';
        break;
      case 'bottom':
        el.style.top = (pixel.y + options.verticalOffset) + 'px';
        break;
    }

    switch (options.horizontalAlign) {
      case 'left':
        el.style.left = (pixel.x - content_width + options.horizontalOffset) + 'px';
        break;
      default:
      case 'center':
        el.style.left = (pixel.x - (content_width / 2) + options.horizontalOffset) + 'px';
        break;
      case 'right':
        el.style.left = (pixel.x + options.horizontalOffset) + 'px';
        break;
    }

    el.style.display = auto_show ? 'block' : 'none';

    if (!auto_show) {
      options.show.apply(this, [el]);
    }
  };

  overlay.onRemove = function() {
    var el = overlay.el;

    if (options.remove) {
      options.remove.apply(this, [el]);
    }
    else {
      overlay.el.parentNode.removeChild(overlay.el);
      overlay.el = null;
    }
  };

  this.overlays.push(overlay);
  return overlay;
};

GMaps.prototype.removeOverlay = function(overlay) {
  for (var i = 0; i < this.overlays.length; i++) {
    if (this.overlays[i] === overlay) {
      this.overlays[i].setMap(null);
      this.overlays.splice(i, 1);

      break;
    }
  }
};

GMaps.prototype.removeOverlays = function() {
  for (var i = 0, item; item = this.overlays[i]; i++) {
    item.setMap(null);
  }

  this.overlays = [];
};

GMaps.prototype.drawPolyline = function(options) {
  var path = [],
      points = options.path;

  if (points.length) {
    if (points[0][0] === undefined) {
      path = points;
    }
    else {
      for (var i = 0, latlng; latlng = points[i]; i++) {
        path.push(new google.maps.LatLng(latlng[0], latlng[1]));
      }
    }
  }

  var polyline_options = {
    map: this.map,
    path: path,
    strokeColor: options.strokeColor,
    strokeOpacity: options.strokeOpacity,
    strokeWeight: options.strokeWeight,
    geodesic: options.geodesic,
    clickable: true,
    editable: false,
    visible: true
  };

  if (options.hasOwnProperty("clickable")) {
    polyline_options.clickable = options.clickable;
  }

  if (options.hasOwnProperty("editable")) {
    polyline_options.editable = options.editable;
  }

  if (options.hasOwnProperty("icons")) {
    polyline_options.icons = options.icons;
  }

  if (options.hasOwnProperty("zIndex")) {
    polyline_options.zIndex = options.zIndex;
  }

  var polyline = new google.maps.Polyline(polyline_options);

  var polyline_events = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

  for (var ev = 0; ev < polyline_events.length; ev++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(e){
          options[name].apply(this, [e]);
        });
      }
    })(polyline, polyline_events[ev]);
  }

  this.polylines.push(polyline);

  GMaps.fire('polyline_added', polyline, this);

  return polyline;
};

GMaps.prototype.removePolyline = function(polyline) {
  for (var i = 0; i < this.polylines.length; i++) {
    if (this.polylines[i] === polyline) {
      this.polylines[i].setMap(null);
      this.polylines.splice(i, 1);

      GMaps.fire('polyline_removed', polyline, this);

      break;
    }
  }
};

GMaps.prototype.removePolylines = function() {
  for (var i = 0, item; item = this.polylines[i]; i++) {
    item.setMap(null);
  }

  this.polylines = [];
};

GMaps.prototype.drawCircle = function(options) {
  options =  extend_object({
    map: this.map,
    center: new google.maps.LatLng(options.lat, options.lng)
  }, options);

  delete options.lat;
  delete options.lng;

  var polygon = new google.maps.Circle(options),
      polygon_events = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

  for (var ev = 0; ev < polygon_events.length; ev++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(e){
          options[name].apply(this, [e]);
        });
      }
    })(polygon, polygon_events[ev]);
  }

  this.polygons.push(polygon);

  return polygon;
};

GMaps.prototype.drawRectangle = function(options) {
  options = extend_object({
    map: this.map
  }, options);

  var latLngBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(options.bounds[0][0], options.bounds[0][1]),
    new google.maps.LatLng(options.bounds[1][0], options.bounds[1][1])
  );

  options.bounds = latLngBounds;

  var polygon = new google.maps.Rectangle(options),
      polygon_events = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

  for (var ev = 0; ev < polygon_events.length; ev++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(e){
          options[name].apply(this, [e]);
        });
      }
    })(polygon, polygon_events[ev]);
  }

  this.polygons.push(polygon);

  return polygon;
};

GMaps.prototype.drawPolygon = function(options) {
  var useGeoJSON = false;

  if(options.hasOwnProperty("useGeoJSON")) {
    useGeoJSON = options.useGeoJSON;
  }

  delete options.useGeoJSON;

  options = extend_object({
    map: this.map
  }, options);

  if (useGeoJSON == false) {
    options.paths = [options.paths.slice(0)];
  }

  if (options.paths.length > 0) {
    if (options.paths[0].length > 0) {
      options.paths = array_flat(array_map(options.paths, arrayToLatLng, useGeoJSON));
    }
  }

  var polygon = new google.maps.Polygon(options),
      polygon_events = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

  for (var ev = 0; ev < polygon_events.length; ev++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(e){
          options[name].apply(this, [e]);
        });
      }
    })(polygon, polygon_events[ev]);
  }

  this.polygons.push(polygon);

  GMaps.fire('polygon_added', polygon, this);

  return polygon;
};

GMaps.prototype.removePolygon = function(polygon) {
  for (var i = 0; i < this.polygons.length; i++) {
    if (this.polygons[i] === polygon) {
      this.polygons[i].setMap(null);
      this.polygons.splice(i, 1);

      GMaps.fire('polygon_removed', polygon, this);

      break;
    }
  }
};

GMaps.prototype.removePolygons = function() {
  for (var i = 0, item; item = this.polygons[i]; i++) {
    item.setMap(null);
  }

  this.polygons = [];
};

GMaps.prototype.getFromFusionTables = function(options) {
  var events = options.events;

  delete options.events;

  var fusion_tables_options = options,
      layer = new google.maps.FusionTablesLayer(fusion_tables_options);

  for (var ev in events) {
    (function(object, name) {
      google.maps.event.addListener(object, name, function(e) {
        events[name].apply(this, [e]);
      });
    })(layer, ev);
  }

  this.layers.push(layer);

  return layer;
};

GMaps.prototype.loadFromFusionTables = function(options) {
  var layer = this.getFromFusionTables(options);
  layer.setMap(this.map);

  return layer;
};

GMaps.prototype.getFromKML = function(options) {
  var url = options.url,
      events = options.events;

  delete options.url;
  delete options.events;

  var kml_options = options,
      layer = new google.maps.KmlLayer(url, kml_options);

  for (var ev in events) {
    (function(object, name) {
      google.maps.event.addListener(object, name, function(e) {
        events[name].apply(this, [e]);
      });
    })(layer, ev);
  }

  this.layers.push(layer);

  return layer;
};

GMaps.prototype.loadFromKML = function(options) {
  var layer = this.getFromKML(options);
  layer.setMap(this.map);

  return layer;
};

GMaps.prototype.addLayer = function(layerName, options) {
  //var default_layers = ['weather', 'clouds', 'traffic', 'transit', 'bicycling', 'panoramio', 'places'];
  options = options || {};
  var layer;

  switch(layerName) {
    case 'weather': this.singleLayers.weather = layer = new google.maps.weather.WeatherLayer();
      break;
    case 'clouds': this.singleLayers.clouds = layer = new google.maps.weather.CloudLayer();
      break;
    case 'traffic': this.singleLayers.traffic = layer = new google.maps.TrafficLayer();
      break;
    case 'transit': this.singleLayers.transit = layer = new google.maps.TransitLayer();
      break;
    case 'bicycling': this.singleLayers.bicycling = layer = new google.maps.BicyclingLayer();
      break;
    case 'panoramio':
        this.singleLayers.panoramio = layer = new google.maps.panoramio.PanoramioLayer();
        layer.setTag(options.filter);
        delete options.filter;

        //click event
        if (options.click) {
          google.maps.event.addListener(layer, 'click', function(event) {
            options.click(event);
            delete options.click;
          });
        }
      break;
      case 'places':
        this.singleLayers.places = layer = new google.maps.places.PlacesService(this.map);

        //search, nearbySearch, radarSearch callback, Both are the same
        if (options.search || options.nearbySearch || options.radarSearch) {
          var placeSearchRequest  = {
            bounds : options.bounds || null,
            keyword : options.keyword || null,
            location : options.location || null,
            name : options.name || null,
            radius : options.radius || null,
            rankBy : options.rankBy || null,
            types : options.types || null
          };

          if (options.radarSearch) {
            layer.radarSearch(placeSearchRequest, options.radarSearch);
          }

          if (options.search) {
            layer.search(placeSearchRequest, options.search);
          }

          if (options.nearbySearch) {
            layer.nearbySearch(placeSearchRequest, options.nearbySearch);
          }
        }

        //textSearch callback
        if (options.textSearch) {
          var textSearchRequest  = {
            bounds : options.bounds || null,
            location : options.location || null,
            query : options.query || null,
            radius : options.radius || null
          };

          layer.textSearch(textSearchRequest, options.textSearch);
        }
      break;
  }

  if (layer !== undefined) {
    if (typeof layer.setOptions == 'function') {
      layer.setOptions(options);
    }
    if (typeof layer.setMap == 'function') {
      layer.setMap(this.map);
    }

    return layer;
  }
};

GMaps.prototype.removeLayer = function(layer) {
  if (typeof(layer) == "string" && this.singleLayers[layer] !== undefined) {
     this.singleLayers[layer].setMap(null);

     delete this.singleLayers[layer];
  }
  else {
    for (var i = 0; i < this.layers.length; i++) {
      if (this.layers[i] === layer) {
        this.layers[i].setMap(null);
        this.layers.splice(i, 1);

        break;
      }
    }
  }
};

var travelMode, unitSystem;

GMaps.prototype.getRoutes = function(options) {
  switch (options.travelMode) {
    case 'bicycling':
      travelMode = google.maps.TravelMode.BICYCLING;
      break;
    case 'transit':
      travelMode = google.maps.TravelMode.TRANSIT;
      break;
    case 'driving':
      travelMode = google.maps.TravelMode.DRIVING;
      break;
    default:
      travelMode = google.maps.TravelMode.WALKING;
      break;
  }

  if (options.unitSystem === 'imperial') {
    unitSystem = google.maps.UnitSystem.IMPERIAL;
  }
  else {
    unitSystem = google.maps.UnitSystem.METRIC;
  }

  var base_options = {
        avoidHighways: false,
        avoidTolls: false,
        optimizeWaypoints: false,
        waypoints: []
      },
      request_options =  extend_object(base_options, options);

  request_options.origin = /string/.test(typeof options.origin) ? options.origin : new google.maps.LatLng(options.origin[0], options.origin[1]);
  request_options.destination = /string/.test(typeof options.destination) ? options.destination : new google.maps.LatLng(options.destination[0], options.destination[1]);
  request_options.travelMode = travelMode;
  request_options.unitSystem = unitSystem;

  delete request_options.callback;
  delete request_options.error;

  var self = this,
      service = new google.maps.DirectionsService();

  service.route(request_options, function(result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      for (var r in result.routes) {
        if (result.routes.hasOwnProperty(r)) {
          self.routes.push(result.routes[r]);
        }
      }

      if (options.callback) {
        options.callback(self.routes);
      }
    }
    else {
      if (options.error) {
        options.error(result, status);
      }
    }
  });
};

GMaps.prototype.removeRoutes = function() {
  this.routes = [];
};

GMaps.prototype.getElevations = function(options) {
  options = extend_object({
    locations: [],
    path : false,
    samples : 256
  }, options);

  if (options.locations.length > 0) {
    if (options.locations[0].length > 0) {
      options.locations = array_flat(array_map([options.locations], arrayToLatLng,  false));
    }
  }

  var callback = options.callback;
  delete options.callback;

  var service = new google.maps.ElevationService();

  //location request
  if (!options.path) {
    delete options.path;
    delete options.samples;

    service.getElevationForLocations(options, function(result, status) {
      if (callback && typeof(callback) === "function") {
        callback(result, status);
      }
    });
  //path request
  } else {
    var pathRequest = {
      path : options.locations,
      samples : options.samples
    };

    service.getElevationAlongPath(pathRequest, function(result, status) {
     if (callback && typeof(callback) === "function") {
        callback(result, status);
      }
    });
  }
};

GMaps.prototype.cleanRoute = GMaps.prototype.removePolylines;

GMaps.prototype.drawRoute = function(options) {
  var self = this;

  this.getRoutes({
    origin: options.origin,
    destination: options.destination,
    travelMode: options.travelMode,
    waypoints: options.waypoints,
    unitSystem: options.unitSystem,
    error: options.error,
    callback: function(e) {
      if (e.length > 0) {
        var polyline_options = {
          path: e[e.length - 1].overview_path,
          strokeColor: options.strokeColor,
          strokeOpacity: options.strokeOpacity,
          strokeWeight: options.strokeWeight
        };

        if (options.hasOwnProperty("icons")) {
          polyline_options.icons = options.icons;
        }

        self.drawPolyline(polyline_options);
        
        if (options.callback) {
          options.callback(e[e.length - 1]);
        }
      }
    }
  });
};

GMaps.prototype.travelRoute = function(options) {
  if (options.origin && options.destination) {
    this.getRoutes({
      origin: options.origin,
      destination: options.destination,
      travelMode: options.travelMode,
      waypoints : options.waypoints,
      unitSystem: options.unitSystem,
      error: options.error,
      callback: function(e) {
        //start callback
        if (e.length > 0 && options.start) {
          options.start(e[e.length - 1]);
        }

        //step callback
        if (e.length > 0 && options.step) {
          var route = e[e.length - 1];
          if (route.legs.length > 0) {
            var steps = route.legs[0].steps;
            for (var i = 0, step; step = steps[i]; i++) {
              step.step_number = i;
              options.step(step, (route.legs[0].steps.length - 1));
            }
          }
        }

        //end callback
        if (e.length > 0 && options.end) {
           options.end(e[e.length - 1]);
        }
      }
    });
  }
  else if (options.route) {
    if (options.route.legs.length > 0) {
      var steps = options.route.legs[0].steps;
      for (var i = 0, step; step = steps[i]; i++) {
        step.step_number = i;
        options.step(step);
      }
    }
  }
};

GMaps.prototype.drawSteppedRoute = function(options) {
  var self = this;
  
  if (options.origin && options.destination) {
    this.getRoutes({
      origin: options.origin,
      destination: options.destination,
      travelMode: options.travelMode,
      waypoints : options.waypoints,
      error: options.error,
      callback: function(e) {
        //start callback
        if (e.length > 0 && options.start) {
          options.start(e[e.length - 1]);
        }

        //step callback
        if (e.length > 0 && options.step) {
          var route = e[e.length - 1];
          if (route.legs.length > 0) {
            var steps = route.legs[0].steps;
            for (var i = 0, step; step = steps[i]; i++) {
              step.step_number = i;
              var polyline_options = {
                path: step.path,
                strokeColor: options.strokeColor,
                strokeOpacity: options.strokeOpacity,
                strokeWeight: options.strokeWeight
              };

              if (options.hasOwnProperty("icons")) {
                polyline_options.icons = options.icons;
              }

              self.drawPolyline(polyline_options);
              options.step(step, (route.legs[0].steps.length - 1));
            }
          }
        }

        //end callback
        if (e.length > 0 && options.end) {
           options.end(e[e.length - 1]);
        }
      }
    });
  }
  else if (options.route) {
    if (options.route.legs.length > 0) {
      var steps = options.route.legs[0].steps;
      for (var i = 0, step; step = steps[i]; i++) {
        step.step_number = i;
        var polyline_options = {
          path: step.path,
          strokeColor: options.strokeColor,
          strokeOpacity: options.strokeOpacity,
          strokeWeight: options.strokeWeight
        };

        if (options.hasOwnProperty("icons")) {
          polyline_options.icons = options.icons;
        }

        self.drawPolyline(polyline_options);
        options.step(step);
      }
    }
  }
};

GMaps.Route = function(options) {
  this.origin = options.origin;
  this.destination = options.destination;
  this.waypoints = options.waypoints;

  this.map = options.map;
  this.route = options.route;
  this.step_count = 0;
  this.steps = this.route.legs[0].steps;
  this.steps_length = this.steps.length;

  var polyline_options = {
    path: new google.maps.MVCArray(),
    strokeColor: options.strokeColor,
    strokeOpacity: options.strokeOpacity,
    strokeWeight: options.strokeWeight
  };

  if (options.hasOwnProperty("icons")) {
    polyline_options.icons = options.icons;
  }

  this.polyline = this.map.drawPolyline(polyline_options).getPath();
};

GMaps.Route.prototype.getRoute = function(options) {
  var self = this;

  this.map.getRoutes({
    origin : this.origin,
    destination : this.destination,
    travelMode : options.travelMode,
    waypoints : this.waypoints || [],
    error: options.error,
    callback : function() {
      self.route = e[0];

      if (options.callback) {
        options.callback.call(self);
      }
    }
  });
};

GMaps.Route.prototype.back = function() {
  if (this.step_count > 0) {
    this.step_count--;
    var path = this.route.legs[0].steps[this.step_count].path;

    for (var p in path){
      if (path.hasOwnProperty(p)){
        this.polyline.pop();
      }
    }
  }
};

GMaps.Route.prototype.forward = function() {
  if (this.step_count < this.steps_length) {
    var path = this.route.legs[0].steps[this.step_count].path;

    for (var p in path){
      if (path.hasOwnProperty(p)){
        this.polyline.push(path[p]);
      }
    }
    this.step_count++;
  }
};

GMaps.prototype.checkGeofence = function(lat, lng, fence) {
  return fence.containsLatLng(new google.maps.LatLng(lat, lng));
};

GMaps.prototype.checkMarkerGeofence = function(marker, outside_callback) {
  if (marker.fences) {
    for (var i = 0, fence; fence = marker.fences[i]; i++) {
      var pos = marker.getPosition();
      if (!this.checkGeofence(pos.lat(), pos.lng(), fence)) {
        outside_callback(marker, fence);
      }
    }
  }
};

GMaps.prototype.toImage = function(options) {
  var options = options || {},
      static_map_options = {};

  static_map_options['size'] = options['size'] || [this.el.clientWidth, this.el.clientHeight];
  static_map_options['lat'] = this.getCenter().lat();
  static_map_options['lng'] = this.getCenter().lng();

  if (this.markers.length > 0) {
    static_map_options['markers'] = [];
    
    for (var i = 0; i < this.markers.length; i++) {
      static_map_options['markers'].push({
        lat: this.markers[i].getPosition().lat(),
        lng: this.markers[i].getPosition().lng()
      });
    }
  }

  if (this.polylines.length > 0) {
    var polyline = this.polylines[0];
    
    static_map_options['polyline'] = {};
    static_map_options['polyline']['path'] = google.maps.geometry.encoding.encodePath(polyline.getPath());
    static_map_options['polyline']['strokeColor'] = polyline.strokeColor
    static_map_options['polyline']['strokeOpacity'] = polyline.strokeOpacity
    static_map_options['polyline']['strokeWeight'] = polyline.strokeWeight
  }

  return GMaps.staticMapURL(static_map_options);
};

GMaps.staticMapURL = function(options){
  var parameters = [],
      data,
      static_root = (location.protocol === 'file:' ? 'http:' : location.protocol ) + '//maps.googleapis.com/maps/api/staticmap';

  if (options.url) {
    static_root = options.url;
    delete options.url;
  }

  static_root += '?';

  var markers = options.markers;
  
  delete options.markers;

  if (!markers && options.marker) {
    markers = [options.marker];
    delete options.marker;
  }

  var styles = options.styles;

  delete options.styles;

  var polyline = options.polyline;
  delete options.polyline;

  /** Map options **/
  if (options.center) {
    parameters.push('center=' + options.center);
    delete options.center;
  }
  else if (options.address) {
    parameters.push('center=' + options.address);
    delete options.address;
  }
  else if (options.lat) {
    parameters.push(['center=', options.lat, ',', options.lng].join(''));
    delete options.lat;
    delete options.lng;
  }
  else if (options.visible) {
    var visible = encodeURI(options.visible.join('|'));
    parameters.push('visible=' + visible);
  }

  var size = options.size;
  if (size) {
    if (size.join) {
      size = size.join('x');
    }
    delete options.size;
  }
  else {
    size = '630x300';
  }
  parameters.push('size=' + size);

  if (!options.zoom && options.zoom !== false) {
    options.zoom = 15;
  }

  var sensor = options.hasOwnProperty('sensor') ? !!options.sensor : true;
  delete options.sensor;
  parameters.push('sensor=' + sensor);

  for (var param in options) {
    if (options.hasOwnProperty(param)) {
      parameters.push(param + '=' + options[param]);
    }
  }

  /** Markers **/
  if (markers) {
    var marker, loc;

    for (var i = 0; data = markers[i]; i++) {
      marker = [];

      if (data.size && data.size !== 'normal') {
        marker.push('size:' + data.size);
        delete data.size;
      }
      else if (data.icon) {
        marker.push('icon:' + encodeURI(data.icon));
        delete data.icon;
      }

      if (data.color) {
        marker.push('color:' + data.color.replace('#', '0x'));
        delete data.color;
      }

      if (data.label) {
        marker.push('label:' + data.label[0].toUpperCase());
        delete data.label;
      }

      loc = (data.address ? data.address : data.lat + ',' + data.lng);
      delete data.address;
      delete data.lat;
      delete data.lng;

      for(var param in data){
        if (data.hasOwnProperty(param)) {
          marker.push(param + ':' + data[param]);
        }
      }

      if (marker.length || i === 0) {
        marker.push(loc);
        marker = marker.join('|');
        parameters.push('markers=' + encodeURI(marker));
      }
      // New marker without styles
      else {
        marker = parameters.pop() + encodeURI('|' + loc);
        parameters.push(marker);
      }
    }
  }

  /** Map Styles **/
  if (styles) {
    for (var i = 0; i < styles.length; i++) {
      var styleRule = [];
      if (styles[i].featureType){
        styleRule.push('feature:' + styles[i].featureType.toLowerCase());
      }

      if (styles[i].elementType) {
        styleRule.push('element:' + styles[i].elementType.toLowerCase());
      }

      for (var j = 0; j < styles[i].stylers.length; j++) {
        for (var p in styles[i].stylers[j]) {
          var ruleArg = styles[i].stylers[j][p];
          if (p == 'hue' || p == 'color') {
            ruleArg = '0x' + ruleArg.substring(1);
          }
          styleRule.push(p + ':' + ruleArg);
        }
      }

      var rule = styleRule.join('|');
      if (rule != '') {
        parameters.push('style=' + rule);
      }
    }
  }

  /** Polylines **/
  function parseColor(color, opacity) {
    if (color[0] === '#'){
      color = color.replace('#', '0x');

      if (opacity) {
        opacity = parseFloat(opacity);
        opacity = Math.min(1, Math.max(opacity, 0));
        if (opacity === 0) {
          return '0x00000000';
        }
        opacity = (opacity * 255).toString(16);
        if (opacity.length === 1) {
          opacity += opacity;
        }

        color = color.slice(0,8) + opacity;
      }
    }
    return color;
  }

  if (polyline) {
    data = polyline;
    polyline = [];

    if (data.strokeWeight) {
      polyline.push('weight:' + parseInt(data.strokeWeight, 10));
    }

    if (data.strokeColor) {
      var color = parseColor(data.strokeColor, data.strokeOpacity);
      polyline.push('color:' + color);
    }

    if (data.fillColor) {
      var fillcolor = parseColor(data.fillColor, data.fillOpacity);
      polyline.push('fillcolor:' + fillcolor);
    }

    var path = data.path;
    if (path.join) {
      for (var j=0, pos; pos=path[j]; j++) {
        polyline.push(pos.join(','));
      }
    }
    else {
      polyline.push('enc:' + path);
    }

    polyline = polyline.join('|');
    parameters.push('path=' + encodeURI(polyline));
  }

  /** Retina support **/
  var dpi = window.devicePixelRatio || 1;
  parameters.push('scale=' + dpi);

  parameters = parameters.join('&');
  return static_root + parameters;
};

GMaps.prototype.addMapType = function(mapTypeId, options) {
  if (options.hasOwnProperty("getTileUrl") && typeof(options["getTileUrl"]) == "function") {
    options.tileSize = options.tileSize || new google.maps.Size(256, 256);

    var mapType = new google.maps.ImageMapType(options);

    this.map.mapTypes.set(mapTypeId, mapType);
  }
  else {
    throw "'getTileUrl' function required.";
  }
};

GMaps.prototype.addOverlayMapType = function(options) {
  if (options.hasOwnProperty("getTile") && typeof(options["getTile"]) == "function") {
    var overlayMapTypeIndex = options.index;

    delete options.index;

    this.map.overlayMapTypes.insertAt(overlayMapTypeIndex, options);
  }
  else {
    throw "'getTile' function required.";
  }
};

GMaps.prototype.removeOverlayMapType = function(overlayMapTypeIndex) {
  this.map.overlayMapTypes.removeAt(overlayMapTypeIndex);
};

GMaps.prototype.addStyle = function(options) {
  var styledMapType = new google.maps.StyledMapType(options.styles, { name: options.styledMapName });

  this.map.mapTypes.set(options.mapTypeId, styledMapType);
};

GMaps.prototype.setStyle = function(mapTypeId) {
  this.map.setMapTypeId(mapTypeId);
};

GMaps.prototype.createPanorama = function(streetview_options) {
  if (!streetview_options.hasOwnProperty('lat') || !streetview_options.hasOwnProperty('lng')) {
    streetview_options.lat = this.getCenter().lat();
    streetview_options.lng = this.getCenter().lng();
  }

  this.panorama = GMaps.createPanorama(streetview_options);

  this.map.setStreetView(this.panorama);

  return this.panorama;
};

GMaps.createPanorama = function(options) {
  var el = getElementById(options.el, options.context);

  options.position = new google.maps.LatLng(options.lat, options.lng);

  delete options.el;
  delete options.context;
  delete options.lat;
  delete options.lng;

  var streetview_events = ['closeclick', 'links_changed', 'pano_changed', 'position_changed', 'pov_changed', 'resize', 'visible_changed'],
      streetview_options = extend_object({visible : true}, options);

  for (var i = 0; i < streetview_events.length; i++) {
    delete streetview_options[streetview_events[i]];
  }

  var panorama = new google.maps.StreetViewPanorama(el, streetview_options);

  for (var i = 0; i < streetview_events.length; i++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(){
          options[name].apply(this);
        });
      }
    })(panorama, streetview_events[i]);
  }

  return panorama;
};

GMaps.prototype.on = function(event_name, handler) {
  return GMaps.on(event_name, this, handler);
};

GMaps.prototype.off = function(event_name) {
  GMaps.off(event_name, this);
};

GMaps.custom_events = ['marker_added', 'marker_removed', 'polyline_added', 'polyline_removed', 'polygon_added', 'polygon_removed', 'geolocated', 'geolocation_failed'];

GMaps.on = function(event_name, object, handler) {
  if (GMaps.custom_events.indexOf(event_name) == -1) {
    if(object instanceof GMaps) object = object.map; 
    return google.maps.event.addListener(object, event_name, handler);
  }
  else {
    var registered_event = {
      handler : handler,
      eventName : event_name
    };

    object.registered_events[event_name] = object.registered_events[event_name] || [];
    object.registered_events[event_name].push(registered_event);

    return registered_event;
  }
};

GMaps.off = function(event_name, object) {
  if (GMaps.custom_events.indexOf(event_name) == -1) {
    if(object instanceof GMaps) object = object.map; 
    google.maps.event.clearListeners(object, event_name);
  }
  else {
    object.registered_events[event_name] = [];
  }
};

GMaps.fire = function(event_name, object, scope) {
  if (GMaps.custom_events.indexOf(event_name) == -1) {
    google.maps.event.trigger(object, event_name, Array.prototype.slice.apply(arguments).slice(2));
  }
  else {
    if(event_name in scope.registered_events) {
      var firing_events = scope.registered_events[event_name];

      for(var i = 0; i < firing_events.length; i++) {
        (function(handler, scope, object) {
          handler.apply(scope, [object]);
        })(firing_events[i]['handler'], scope, object);
      }
    }
  }
};

GMaps.geolocate = function(options) {
  var complete_callback = options.always || options.complete;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      options.success(position);

      if (complete_callback) {
        complete_callback();
      }
    }, function(error) {
      options.error(error);

      if (complete_callback) {
        complete_callback();
      }
    }, options.options);
  }
  else {
    options.not_supported();

    if (complete_callback) {
      complete_callback();
    }
  }
};

GMaps.geocode = function(options) {
  this.geocoder = new google.maps.Geocoder();
  var callback = options.callback;
  if (options.hasOwnProperty('lat') && options.hasOwnProperty('lng')) {
    options.latLng = new google.maps.LatLng(options.lat, options.lng);
  }

  delete options.lat;
  delete options.lng;
  delete options.callback;
  
  this.geocoder.geocode(options, function(results, status) {
    callback(results, status);
  });
};

//==========================
// Polygon containsLatLng
// https://github.com/tparkin/Google-Maps-Point-in-Polygon
// Poygon getBounds extension - google-maps-extensions
// http://code.google.com/p/google-maps-extensions/source/browse/google.maps.Polygon.getBounds.js
if (!google.maps.Polygon.prototype.getBounds) {
  google.maps.Polygon.prototype.getBounds = function(latLng) {
    var bounds = new google.maps.LatLngBounds();
    var paths = this.getPaths();
    var path;

    for (var p = 0; p < paths.getLength(); p++) {
      path = paths.getAt(p);
      for (var i = 0; i < path.getLength(); i++) {
        bounds.extend(path.getAt(i));
      }
    }

    return bounds;
  };
}

if (!google.maps.Polygon.prototype.containsLatLng) {
  // Polygon containsLatLng - method to determine if a latLng is within a polygon
  google.maps.Polygon.prototype.containsLatLng = function(latLng) {
    // Exclude points outside of bounds as there is no way they are in the poly
    var bounds = this.getBounds();

    if (bounds !== null && !bounds.contains(latLng)) {
      return false;
    }

    // Raycast point in polygon method
    var inPoly = false;

    var numPaths = this.getPaths().getLength();
    for (var p = 0; p < numPaths; p++) {
      var path = this.getPaths().getAt(p);
      var numPoints = path.getLength();
      var j = numPoints - 1;

      for (var i = 0; i < numPoints; i++) {
        var vertex1 = path.getAt(i);
        var vertex2 = path.getAt(j);

        if (vertex1.lng() < latLng.lng() && vertex2.lng() >= latLng.lng() || vertex2.lng() < latLng.lng() && vertex1.lng() >= latLng.lng()) {
          if (vertex1.lat() + (latLng.lng() - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < latLng.lat()) {
            inPoly = !inPoly;
          }
        }

        j = i;
      }
    }

    return inPoly;
  };
}

if (!google.maps.Circle.prototype.containsLatLng) {
  google.maps.Circle.prototype.containsLatLng = function(latLng) {
    if (google.maps.geometry) {
      return google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
    }
    else {
      return true;
    }
  };
}

google.maps.LatLngBounds.prototype.containsLatLng = function(latLng) {
  return this.contains(latLng);
};

google.maps.Marker.prototype.setFences = function(fences) {
  this.fences = fences;
};

google.maps.Marker.prototype.addFence = function(fence) {
  this.fences.push(fence);
};

google.maps.Marker.prototype.getId = function() {
  return this['__gm_id'];
};

//==========================
// Array indexOf
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
      "use strict";
      if (this == null) {
          throw new TypeError();
      }
      var t = Object(this);
      var len = t.length >>> 0;
      if (len === 0) {
          return -1;
      }
      var n = 0;
      if (arguments.length > 1) {
          n = Number(arguments[1]);
          if (n != n) { // shortcut for verifying if it's NaN
              n = 0;
          } else if (n != 0 && n != Infinity && n != -Infinity) {
              n = (n > 0 || -1) * Math.floor(Math.abs(n));
          }
      }
      if (n >= len) {
          return -1;
      }
      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      for (; k < len; k++) {
          if (k in t && t[k] === searchElement) {
              return k;
          }
      }
      return -1;
  }
}
  
return GMaps;
}));

/*
* $ lightbox_me
* By: Buck Wilson
* Version : 2.4
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


(function($) {

    $.fn.lightbox_me = function(options) {

        return this.each(function() {

            var
                opts = $.extend({}, $.fn.lightbox_me.defaults, options),
                $overlay = $(),
                $self = $(this),
                $iframe = $('<iframe id="foo" style="z-index: ' + (opts.zIndex + 1) + ';border: none; margin: 0; padding: 0; position: absolute; width: 100%; height: 100%; top: 0; left: 0; filter: mask();"/>');

            if (opts.showOverlay) {
                //check if there's an existing overlay, if so, make subequent ones clear
               var $currentOverlays = $(".js_lb_overlay:visible");
                if ($currentOverlays.length > 0){
                    $overlay = $('<div class="lb_overlay_clear js_lb_overlay"/>');
                } else {
                    $overlay = $('<div class="' + opts.classPrefix + '_overlay js_lb_overlay"/>');
                }
            }

            /*----------------------------------------------------
               DOM Building
            ---------------------------------------------------- */
            $('body').append($self.hide()).append($overlay);


            /*----------------------------------------------------
               Overlay CSS stuffs
            ---------------------------------------------------- */

            // set css of the overlay
            if (opts.showOverlay) {
                setOverlayHeight(); // pulled this into a function because it is called on window resize.
                $overlay.css({ position: 'absolute', width: '100%', top: 0, left: 0, right: 0, bottom: 0, zIndex: (opts.zIndex + 2), display: 'none' });
				if (!$overlay.hasClass('lb_overlay_clear')){
                	$overlay.css(opts.overlayCSS);
                }
            }

            /*----------------------------------------------------
               Animate it in.
            ---------------------------------------------------- */
               //
            if (opts.showOverlay) {
                $overlay.fadeIn(opts.overlaySpeed, function() {
                    setSelfPosition();
                    $self[opts.appearEffect](opts.lightboxSpeed, function() { setOverlayHeight(); setSelfPosition(); opts.onLoad()});
                });
            } else {
                setSelfPosition();
                $self[opts.appearEffect](opts.lightboxSpeed, function() { opts.onLoad()});
            }

            /*----------------------------------------------------
               Hide parent if parent specified (parentLightbox should be jquery reference to any parent lightbox)
            ---------------------------------------------------- */
            if (opts.parentLightbox) {
                opts.parentLightbox.fadeOut(200);
            }


            /*----------------------------------------------------
               Bind Events
            ---------------------------------------------------- */

            $(window).resize(setOverlayHeight)
                     .resize(setSelfPosition)
                     .scroll(setSelfPosition);

            $(window).bind('keyup.lightbox_me', observeKeyPress);

            if (opts.closeClick) {
                $overlay.click(function(e) { closeLightbox(); e.preventDefault; });
            }
            $self.delegate(opts.closeSelector, "click", function(e) {
                closeLightbox(); e.preventDefault();
            });
            $self.bind('close', closeLightbox);
            $self.bind('reposition', setSelfPosition);



            /*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
              -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


            /*----------------------------------------------------
               Private Functions
            ---------------------------------------------------- */

            /* Remove or hide all elements */
            function closeLightbox() {
                var s = $self[0].style;
                if (opts.destroyOnClose) {
                    $self.add($overlay).remove();
                } else {
                    $self.add($overlay).hide();
                }

                //show the hidden parent lightbox
                if (opts.parentLightbox) {
                    opts.parentLightbox.fadeIn(200);
                }
                if (opts.preventScroll) {
                    $('body').css('overflow', '');
                }
                $iframe.remove();

				        // clean up events.
                $self.undelegate(opts.closeSelector, "click");
                $self.unbind('close', closeLightbox);
                $self.unbind('repositon', setSelfPosition);
                
                $(window).unbind('resize', setOverlayHeight);
                $(window).unbind('resize', setSelfPosition);
                $(window).unbind('scroll', setSelfPosition);
                $(window).unbind('keyup.lightbox_me');
                opts.onClose();
            }


            /* Function to bind to the window to observe the escape/enter key press */
            function observeKeyPress(e) {
                if((e.keyCode == 27 || (e.DOM_VK_ESCAPE == 27 && e.which==0)) && opts.closeEsc) closeLightbox();
            }


            /* Set the height of the overlay
                    : if the document height is taller than the window, then set the overlay height to the document height.
                    : otherwise, just set overlay height: 100%
            */
            function setOverlayHeight() {
                if ($(window).height() < $(document).height()) {
                    $overlay.css({height: $(document).height() + 'px'});
                     $iframe.css({height: $(document).height() + 'px'});
                } else {
                    $overlay.css({height: '100%'});
                }
            }


            /* Set the position of the modal'd window ($self)
                    : if $self is taller than the window, then make it absolutely positioned
                    : otherwise fixed
            */
            function setSelfPosition() {
                var s = $self[0].style;

                // reset CSS so width is re-calculated for margin-left CSS
                $self.css({left: '50%', marginLeft: ($self.outerWidth() / 2) * -1,  zIndex: (opts.zIndex + 3) });


                /* we have to get a little fancy when dealing with height, because lightbox_me
                    is just so fancy.
                 */

                // if the height of $self is bigger than the window and self isn't already position absolute
                if (($self.height() + 80  >= $(window).height()) && ($self.css('position') != 'absolute')) {

                    // we are going to make it positioned where the user can see it, but they can still scroll
                    // so the top offset is based on the user's scroll position.
                    var topOffset = $(document).scrollTop() + 40;
                    $self.css({position: 'absolute', top: topOffset + 'px', marginTop: 0})
                } else if ($self.height()+ 80  < $(window).height()) {
                    //if the height is less than the window height, then we're gonna make this thing position: fixed.
                    if (opts.centered) {
                        $self.css({ position: 'fixed', top: '50%', marginTop: ($self.outerHeight() / 2) * -1})
                    } else {
                        $self.css({ position: 'fixed'}).css(opts.modalCSS);
                    }
                    if (opts.preventScroll) {
                        $('body').css('overflow', 'hidden');
                    }
                }
            }

        });



    };

    $.fn.lightbox_me.defaults = {

        // animation
        appearEffect: "fadeIn",
        appearEase: "",
        overlaySpeed: 250,
        lightboxSpeed: 300,

        // close
        closeSelector: ".close",
        closeClick: true,
        closeEsc: true,

        // behavior
        destroyOnClose: false,
        showOverlay: true,
        parentLightbox: false,
        preventScroll: false,

        // callbacks
        onLoad: function() {},
        onClose: function() {},

        // style
        classPrefix: 'lb',
        zIndex: 999,
        centered: false,
        modalCSS: {top: '40px'},
        overlayCSS: {background: 'black', opacity: .3}
    }
})(jQuery);

/*! ========================================================================
 * Bootstrap Toggle: bootstrap-toggle.js v2.2.0
 * http://www.bootstraptoggle.com
 * ========================================================================
 * Copyright 2014 Min Hur, The New York Times Company
 * Licensed under MIT
 * ======================================================================== */


 +function ($) {
 	'use strict';

	// TOGGLE PUBLIC CLASS DEFINITION
	// ==============================

	var Toggle = function (element, options) {
		this.$element  = $(element)
		this.options   = $.extend({}, this.defaults(), options)
		this.render()
	}

	Toggle.VERSION  = '2.2.0'

	Toggle.DEFAULTS = {
		on: 'On',
		off: 'Off',
		onstyle: 'primary',
		offstyle: 'default',
		size: 'normal',
		style: '',
		width: null,
		height: null
	}

	Toggle.prototype.defaults = function() {
		return {
			on: this.$element.attr('data-on') || Toggle.DEFAULTS.on,
			off: this.$element.attr('data-off') || Toggle.DEFAULTS.off,
			onstyle: this.$element.attr('data-onstyle') || Toggle.DEFAULTS.onstyle,
			offstyle: this.$element.attr('data-offstyle') || Toggle.DEFAULTS.offstyle,
			size: this.$element.attr('data-size') || Toggle.DEFAULTS.size,
			style: this.$element.attr('data-style') || Toggle.DEFAULTS.style,
			width: this.$element.attr('data-width') || Toggle.DEFAULTS.width,
			height: this.$element.attr('data-height') || Toggle.DEFAULTS.height
		}
	}

	Toggle.prototype.render = function () {
		this._onstyle = 'btn-' + this.options.onstyle
		this._offstyle = 'btn-' + this.options.offstyle
		var size = this.options.size === 'large' ? 'btn-lg'
			: this.options.size === 'small' ? 'btn-sm'
			: this.options.size === 'mini' ? 'btn-xs'
			: ''
		var $toggleOn = $('<label class="btn">').html(this.options.on)
			.addClass(this._onstyle + ' ' + size)
		var $toggleOff = $('<label class="btn">').html(this.options.off)
			.addClass(this._offstyle + ' ' + size + ' active')
		var $toggleHandle = $('<span class="toggle-handle btn btn-default">')
			.addClass(size)
		var $toggleGroup = $('<div class="toggle-group">')
			.append($toggleOn, $toggleOff, $toggleHandle)
		var $toggle = $('<div class="toggle btn" data-toggle="toggle">')
			.addClass( this.$element.prop('checked') ? this._onstyle : this._offstyle+' off' )
			.addClass(size).addClass(this.options.style)

		this.$element.wrap($toggle)
		$.extend(this, {
			$toggle: this.$element.parent(),
			$toggleOn: $toggleOn,
			$toggleOff: $toggleOff,
			$toggleGroup: $toggleGroup
		})
		this.$toggle.append($toggleGroup)

		var width = this.options.width || Math.max($toggleOn.outerWidth(), $toggleOff.outerWidth())+($toggleHandle.outerWidth()/2)
		var height = this.options.height || Math.max($toggleOn.outerHeight(), $toggleOff.outerHeight())
		$toggleOn.addClass('toggle-on')
		$toggleOff.addClass('toggle-off')
		this.$toggle.css({ width: width, height: height })
		if (this.options.height) {
			$toggleOn.css('line-height', $toggleOn.height() + 'px')
			$toggleOff.css('line-height', $toggleOff.height() + 'px')
		}
		this.update(true)
		this.trigger(true)
	}

	Toggle.prototype.toggle = function () {
		if (this.$element.prop('checked')) this.off()
		else this.on()
	}

	Toggle.prototype.on = function (silent) {
		if (this.$element.prop('disabled')) return false
		this.$toggle.removeClass(this._offstyle + ' off').addClass(this._onstyle)
		this.$element.prop('checked', true)
		if (!silent) this.trigger()
	}

	Toggle.prototype.off = function (silent) {
		if (this.$element.prop('disabled')) return false
		this.$toggle.removeClass(this._onstyle).addClass(this._offstyle + ' off')
		this.$element.prop('checked', false)
		if (!silent) this.trigger()
	}

	Toggle.prototype.enable = function () {
		this.$toggle.removeAttr('disabled')
		this.$element.prop('disabled', false)
	}

	Toggle.prototype.disable = function () {
		this.$toggle.attr('disabled', 'disabled')
		this.$element.prop('disabled', true)
	}

	Toggle.prototype.update = function (silent) {
		if (this.$element.prop('disabled')) this.disable()
		else this.enable()
		if (this.$element.prop('checked')) this.on(silent)
		else this.off(silent)
	}

	Toggle.prototype.trigger = function (silent) {
		this.$element.off('change.bs.toggle')
		if (!silent) this.$element.change()
		this.$element.on('change.bs.toggle', $.proxy(function() {
			this.update()
		}, this))
	}

	Toggle.prototype.destroy = function() {
		this.$element.off('change.bs.toggle')
		this.$toggleGroup.remove()
		this.$element.removeData('bs.toggle')
		this.$element.unwrap()
	}

	// TOGGLE PLUGIN DEFINITION
	// ========================

	function Plugin(option) {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('bs.toggle')
			var options = typeof option == 'object' && option

			if (!data) $this.data('bs.toggle', (data = new Toggle(this, options)))
			if (typeof option == 'string' && data[option]) data[option]()
		})
	}

	var old = $.fn.bootstrapToggle

	$.fn.bootstrapToggle             = Plugin
	$.fn.bootstrapToggle.Constructor = Toggle

	// TOGGLE NO CONFLICT
	// ==================

	$.fn.toggle.noConflict = function () {
		$.fn.bootstrapToggle = old
		return this
	}

	// TOGGLE DATA-API
	// ===============

	$(function() {
		$('input[type=checkbox][data-toggle^=toggle]').bootstrapToggle()
	})

	$(document).on('click.bs.toggle', 'div[data-toggle^=toggle]', function(e) {
		var $checkbox = $(this).find('input[type=checkbox]')
		$checkbox.bootstrapToggle('toggle')
		e.preventDefault()
	})

}(jQuery);

// Initialize our namespace.
var Pernoite = Pernoite || {autorun: true};

$(function() {
	var app = new Pernoite.Application(document.body);

	if (Pernoite.autorun) {
		app.run(location);
	}
});
Pernoite.Application = (function() {
	
  function Application(container) {
	
  this.container = $(container);
  this.languageSelected = this.container.find('.language-selected');
  this.languageChange = this.languageSelected.find('.dropdown-menu-language li');
  this.languageCode = this.languageSelected.find('button span');

	this.routes = {

     '/': Pernoite.IndexRoute
   , '/hotel.html': Pernoite.HotelRoute
   , '/resultado.html': Pernoite.ResultadoRoute
   , '/reservar.html': Pernoite.ReservarRoute
   , '/usuario.html': Pernoite.UsuarioRoute
   , '/contato.html': Pernoite.ContactRoute

  };

  };

  Application.fn = Application.prototype;

  /*-----------------------------------------------------------------*/
  /* RUN APPLICATION
  /*-----------------------------------------------------------------*/

  Application.fn.run = function(location) {
    var RouteClass = this.routes[location.pathname];
    
    if (RouteClass) {
      var route = new RouteClass(this.container);
      // this.clickTableRow();
      this.caroulselAdvanced();
      this.dropdownStop();
      this.translate();
      this.flowType();
      this.facebookConnect();
      this.animateDropdown('.clickDrop', 'fadeIn');
      this.notyRun('#botaoPesquisar', 'Erro de Preencimento no Formulário de Busca');
      this.notyQuestion('.remover-favorito', 'Deseja realmente excluir?');

      route.run();

    } else {
      console.log(location.pathname, "doesn't have a route function");
    }
  };

  /*-----------------------------------------------------------------*/
  /* BUTTON LANGUAGE TRANSLATE
  /*-----------------------------------------------------------------*/

  Application.fn.translate = function() {
    var _this = this;
    this.languageChange.each(function() {
      if($(this).attr('class') == 'active'){
        var active = $(this).find('a').data('language');
        _this.languageCode.html(active);
      }
    })
    this.languageChange.find('a').click(function(event) {
      event.preventDefault();
      var active = $(this).data('language');
      _this.languageChange.removeClass('active');
      $(this).parent('li').addClass('active');
      _this.languageCode.html(active);
    });
  };

  /*-----------------------------------------------------------------*/
  /* DROPDOWN STOP PROPAGATION
  /*-----------------------------------------------------------------*/

  Application.fn.dropdownStop = function() {
    $('.dropdown-menu-login').on("click", function(e){ e.stopPropagation(); });
    $('.dropdown-menu-language').on("click", function(e){ e.stopPropagation(); });
    $('.dropdown-menu-mensagens').on("click", function(e){ e.stopPropagation(); });

    $('.dropdown-menu-visualizacoes').on("click", function(e){
      e.stopPropagation();
      $('.area-visualizados .controls .left').on("click", function(e){
        $('#carousel-visualizados').carousel('prev');
      });
      $('.area-visualizados .controls .right').on("click", function(e){
        $('#carousel-visualizados').carousel('next');
      });
    });

    $('.dropdown-menu-favoritos').on("click", function(e){
      e.stopPropagation();
      $('.area-favoritos .controls .left').on("click", function(e){
        $('#carousel-favoritos').carousel('prev');
      });
      $('.area-favoritos .controls .right').on("click", function(e){
        $('#carousel-favoritos').carousel('next');
      });
    });

    $('.area-comece-sua-busca .controls .left').on("click", function(e){
      console.log('left');
      $('#carousel-em-destaque, #carousel-mais-visualizados, #carousel-melhor-avaliados').carousel('prev');
    });
    $('.area-comece-sua-busca .controls .right').on("click", function(e){
      console.log('right');
      $('#carousel-em-destaque, #carousel-mais-visualizados, #carousel-melhor-avaliados').carousel('next');
    });

  };

  /*-----------------------------------------------------------------*/
  /* ANIMATE DROPDOWN
  /*-----------------------------------------------------------------*/

  Application.fn.animateDropdown = function(element, animation) {
        
    $(element).click(function() {
      $('.animaDrop').addClass(animation);
        var wait = window.setTimeout( function(){
        $('.animaDrop').removeClass(animation)}, 800
      );
    });
     
  };

  /*-----------------------------------------------------------------*/
  /* COROUSEL ADVANCED ITEM
  /*-----------------------------------------------------------------*/

  Application.fn.caroulselAdvanced = function() {

    $('.carousel-showmanymoveone .item').each(function(){
      var itemToClone = $(this);

      for (var i=1;i<4;i++) {
        itemToClone = itemToClone.next();

        // wrap around if at end of item collection
        if (!itemToClone.length) {
          itemToClone = $(this).siblings(':first');
        }

        // grab item, clone, add marker class, add to collection
        itemToClone.children(':first-child').clone()
          .addClass("cloneditem-"+(i))
          .appendTo($(this));
      }
    });
      
  };

  /*-----------------------------------------------------------------*/
  /* PEGA CLICK DA TABLE ROW NA AREA DE MENSAGENS
  /*-----------------------------------------------------------------*/

  Application.fn.clickTableRow = function() {

    $(".clickable-row").click(function() {
        window.document.location = $(this).data("href");
    });
      
  };

  /*-----------------------------------------------------------------*/
  /* FLOWTYPE - TIPOGRAFIA RESPONSIVA
  /*-----------------------------------------------------------------*/

  Application.fn.flowType = function() {

    $('body').flowtype({
      minimum   : 500,
      maximum   : 1200,
      minFont   : 18,
      maxFont   : 40,
      fontRatio : 40
    });

  };

  /*-----------------------------------------------------------------*/
  /* ALERTAS
  /*-----------------------------------------------------------------*/

  Application.fn.notyRun = function(element, msg) {

    _this = this;

    $(element).on("click", function(event){ 
      event.preventDefault(); 
      var n = noty({
          layout: 'topRight',
          theme: 'defaultTheme', // or 'relax'
          type: 'error',
          text: msg, // can be html or string
          dismissQueue: true, // If you want to use queue feature set this true
          template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
          animation: {
              open: 'animated fadeInRight', // or Animate.css class names like: 'animated bounceInLeft'
              close: 'animated fadeOutRightBig', // or Animate.css class names like: 'animated bounceOutLeft'
              easing: 'swing',
              speed: 500 // opening & closing animation speed
          },
          timeout: false, // delay for closing event. Set false for sticky notifications
          force: false, // adds notification to the beginning of queue when set to true
          modal: false,
          maxVisible: 5, // you can set max visible notification for dismissQueue true option,
          killer: false, // for close all notifications before show
          closeWith: ['click', 'hover'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
          callback: {
              onShow: function() {},
              afterShow: function() {},
              onClose: function() {},
              afterClose: function() {},
              onCloseClick: function() {},
          },
          buttons: false // an array of buttons
      });
    });
     
  };

  /*-----------------------------------------------------------------*/
  /* PERGUNTAS
  /*-----------------------------------------------------------------*/

  Application.fn.notyQuestion = function(element, msg) {

    _this = this;

    $(element).on("click", function(event){ 
      event.preventDefault();

      var n = noty({
            text        : msg,
            type        : 'alert',
            dismissQueue: true,
            layout      : 'center',
            theme       : 'defaultTheme',
            buttons     : [
                {addClass: 'btn btn-primary btn-sm', text: 'Sim', onClick: function ($noty) {
                    $noty.close();
                    noty({dismissQueue: true, force: true, layout: 'topRight', theme: 'defaultTheme', text: 'Você removeu o item dos favoritos', type: 'success', closeWith: ['click', 'hover'], animation: {
              open: 'animated fadeInRight', // or Animate.css class names like: 'animated bounceInLeft'
              close: 'animated fadeOutRightBig', // or Animate.css class names like: 'animated bounceOutLeft'
              easing: 'swing',
              speed: 500 // opening & closing animation speed
          },});
                }
                },
                {addClass: 'btn btn-danger btn-sm', text: 'Não', onClick: function ($noty) {
                    $noty.close();
                    noty({dismissQueue: true, force: true, layout: 'topRight', theme: 'defaultTheme', text: 'Você manteve o item nos favoritos', type: 'error', closeWith: ['click', 'hover'], animation: {
              open: 'animated fadeInRight', // or Animate.css class names like: 'animated bounceInLeft'
              close: 'animated fadeOutRightBig', // or Animate.css class names like: 'animated bounceOutLeft'
              easing: 'swing',
              speed: 500 // opening & closing animation speed
          },});
                }
                }
            ]
        });

    });
     
  };

  /*-----------------------------------------------------------------*/
  /* FACEBOOK CONNECT
  /*-----------------------------------------------------------------*/

  Application.fn.facebookConnect = function() {

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
      
  };
	
	return Application;

})();






Pernoite.Mapas = (function() {

	function Mapas(container) {

		this.container = $(container);
		this.mapElement = this.container.find('#map-canvas');
    this.mapHotel = this.container.find('.content-hotel #map-canvas');
		
	}

	Mapas.fn = Mapas.prototype;

	Mapas.fn.run = function(callback) {
		console.log('Mapa run executed');
	    this.carregaMapa();
	};

  /*-----------------------------------------------------------------*/
  /* GOOGLE MAPAS
  /*-----------------------------------------------------------------*/

  Mapas.fn.carregaMapa = function() {

    // map center
    var center = new google.maps.LatLng(40.589500, -8.683542);

    // marker position
    var factory = new google.maps.LatLng(40.589500, -8.683542);

    function initialize() {
      var mapOptions = {
        center: center,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

      // InfoWindow content
      var content = '<div id="iw-container">' +
                        '<div class="iw-title"> R$ 1110,00 </div>' +

                        '<div class="iw-content">' +
                          '<div class="iw-subTitle">Love Time Hotel Love Time Hotel</div>' +
                          '<p>Rua do Catete Rua do Catete Rua do Catete, 93</p>' +
                          '<p>Rio de Janeiro - RJ</p>' +
                          '<p>22783-020</p>' +
                          '<a class="btn btn-azul-escuro btn-sm" href="#" role="button">Reservar</a>' +
                        '</div>' +

                    '</div>';

      // A new Info Window is created and set content
      var infowindow = new google.maps.InfoWindow({
        content: content,

        // Assign a maximum value for the width of the infowindow allows
        // greater control over the various content elements
        maxWidth: 350
      });
       
      // marker options
      var marker = new google.maps.Marker({
        position: factory,
        map: map,
        title:"Fábrica de Porcelana da Vista Alegre"
      });

      // This event expects a click on a marker
      // When this event is fired the Info Window is opened.
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });

      // Event that closes the Info Window with a click on the map
      google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
      });

      // *
      // START INFOWINDOW CUSTOMIZE.
      // The google.maps.event.addListener() event expects
      // the creation of the infowindow HTML structure 'domready'
      // and before the opening of the infowindow, defined styles are applied.
      // *
      google.maps.event.addListener(infowindow, 'domready', function() {

        // Reference to the DIV that wraps the bottom of infowindow
        var iwOuter = $('.gm-style-iw');

        /* Since this div is in a position prior to .gm-div style-iw.
         * We use jQuery and create a iwBackground variable,
         * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
        */
        var iwBackground = iwOuter.prev();

        // Removes background shadow DIV
        iwBackground.children(':nth-child(2)').css({'display' : 'none'});

        // Removes white background DIV
        iwBackground.children(':nth-child(4)').css({'display' : 'none'});

        // Moves the infowindow 115px to the right.
        iwOuter.parent().parent().css({left: '0px'});

        // Moves the shadow of the arrow 76px to the left margin.
        iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 125px !important;'});

        // Moves the arrow 76px to the left margin.
        iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 125px !important;'});

        // Changes the desired tail shadow color.
        iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

        // Reference to the div that groups the close button elements.
        var iwCloseBtn = iwOuter.next();

        // Apply the desired effect to the close button
        iwCloseBtn.css({opacity: '1',position: 'absolute', right: '60px', top: '23px', width: '27px', height:'27px', border: '7px solid #fff', 'border-radius': '13px', 'box-shadow': '0 0 1px #ccc'});

        // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
        if($('.iw-content').height() < 140){
          $('.iw-bottom-gradient').css({display: 'none'});
        }

        // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
        iwCloseBtn.mouseout(function(){
          $(this).css({opacity: '1'});
        });
      });
    }
    google.maps.event.addDomListener(window, 'load', initialize);

    this.mapHotel.click(function() {
      console.log('Click lighthbox ok');
      $('#map-canvas').css('width', '380px').css('height', '430px').css('border', 'solid 2px #000').lightbox_me();
    });

  };
	
	return Mapas;
})();


Pernoite.ObserverMixin = (function() {
	
	return function(target) {
		target.observer = $({});
		target.on = $.proxy(target.observer, 'on');
	};

})();

Pernoite.ContactRoute = (function(){

	//PAGE LOADING TRANSITION
	var TRANSITION_DURATION = 1000;

  function ContactRoute(container) {
  	this.container = container;
  	this.loadingElement = this.container.find('.loading');
  	this.pageElement = this.container.find('.page');

  };

  ContactRoute.fn = ContactRoute.prototype;

  /*-----------------------------------------------------------------*/
  /* RUN CONTACT
  /*-----------------------------------------------------------------*/

  ContactRoute.fn.run = function(callback) {
  	console.log('contact run executed');
  	this.transition();
  };

  /*-----------------------------------------------------------------*/
  /* TRANSITION
  /*-----------------------------------------------------------------*/

  ContactRoute.fn.transition = function() {
    this.loadingElement.fadeOut(TRANSITION_DURATION);
  	this.pageElement.fadeIn(TRANSITION_DURATION);
  };
  
  return ContactRoute;

})();


Pernoite.HotelRoute = (function() {

	//PAGE LOADING TRANSITION
	var TRANSITION_DURATION = 1000;

	var mapas = new Pernoite.Mapas(document.body);

	function HotelRoute(container) {

		this.container = container;
	  	this.loadingElement = this.container.find('.loading');
	  	this.pageElement = this.container.find('.page');
		
	}

	HotelRoute.fn = HotelRoute.prototype;

  /*-----------------------------------------------------------------*/
  /* RUN PAGINA DO HOTEL
  /*-----------------------------------------------------------------*/

	HotelRoute.fn.run = function(callback) {
		console.log('HotelRoute run executed');

		this.transition();
		mapas.run();
		  
	};

  /*-----------------------------------------------------------------*/
  /* TRANSITION
  /*-----------------------------------------------------------------*/

	HotelRoute.fn.transition = function() {
		this.loadingElement.fadeOut(TRANSITION_DURATION);
		this.pageElement.fadeIn(TRANSITION_DURATION);
	};
	
	return HotelRoute;
})();

Pernoite.IndexRoute = (function(){

	//PAGE LOADING TRANSITION
	var TRANSITION_DURATION = 1000;

  function IndexRoute(container) {
  	this.container = container;
  	this.loadingElement = this.container.find('.loading');
  	this.pageElement = this.container.find('.page');
    this.mostraOpcoes = this.container.find('#mostraOpcoes');
    this.datepickerSetas = this.container.find('.datepicker-calendar-header .prev');

  };

  IndexRoute.fn = IndexRoute.prototype;

  /*-----------------------------------------------------------------*/
  /* RUN INDEX
  /*-----------------------------------------------------------------*/

  IndexRoute.fn.run = function(callback) {
    console.log('indexRoute run executed');
  	
    this.maisOpcoes();
    this.inputPesquisa();

    this.transition();

    $('#timepicker3').timepicker({
      minuteStep: 5,
      showInputs: false,
      disableFocus: true
    });

    $("#myDatepickerInput").datepicker();

  };

  /*-----------------------------------------------------------------*/
  /* TRANSITION
  /*-----------------------------------------------------------------*/

  IndexRoute.fn.transition = function() {
    this.loadingElement.fadeOut(TRANSITION_DURATION);
  	this.pageElement.fadeIn(TRANSITION_DURATION);
  };

  /*-----------------------------------------------------------------*/
  /* INPUT PESQUISA
  /*-----------------------------------------------------------------*/

  IndexRoute.fn.inputPesquisa = function() {

     var countries = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      limit: 10,
      prefetch: {
        // url points to a json file that contains an array of country names, see
        // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
        url: '../data/countries.json',
        // the json file contains an array of strings, but the Bloodhound
        // suggestion engine expects JavaScript objects so this converts all of
        // those strings
        filter: function(list) {
          return $.map(list, function(country) { return { name: country }; });
        }
      }
    });
     
    // kicks off the loading/processing of `local` and `prefetch`
    countries.initialize();
     
    // passing in `null` for the `options` arguments will result in the default
    // options being used
    $('.input-search .typeahead').typeahead(null, {
      name: 'countries',
      displayKey: 'name',
      // `ttAdapter` wraps the suggestion engine in an adapter that
      // is compatible with the typeahead jQuery plugin
      source: countries.ttAdapter()
    });

  };

  /*-----------------------------------------------------------------*/
  /* PESQUISA - MOSTAR MAIS OPÇÕES
  /*-----------------------------------------------------------------*/
  
  IndexRoute.fn.maisOpcoes = function() {
      this.mostraOpcoes.on('click', function(event) {
        event.preventDefault();
        $('.mais-opcoes-container').slideToggle();
      });
  };


  return IndexRoute;

})();


Pernoite.ReservarRoute = (function() {

	//PAGE LOADING TRANSITION
	var TRANSITION_DURATION = 1000;

	function ReservarRoute(container) {

		this.container = container;
  		this.loadingElement = this.container.find('.loading');
  		this.pageElement = this.container.find('.page');
		
	}

	ReservarRoute.fn = ReservarRoute.prototype;

  /*-----------------------------------------------------------------*/
  /* RUN RESERVAR
  /*-----------------------------------------------------------------*/

  ReservarRoute.fn.run = function(callback) {
    console.log('ReservarRoute run executed');
  	
    this.transition();

  };

  /*-----------------------------------------------------------------*/
  /* TRANSITION
  /*-----------------------------------------------------------------*/

  ReservarRoute.fn.transition = function() {
    this.loadingElement.fadeOut(TRANSITION_DURATION);
  	this.pageElement.fadeIn(TRANSITION_DURATION);
  };

	
	return ReservarRoute;
})();


Pernoite.ResultadoRoute = (function() {
	
	//PAGE LOADING TRANSITION
	var TRANSITION_DURATION = 1000;

	var mapas = new Pernoite.Mapas(document.body);

	function ResultadoRoute(container) {

	this.container = container;
  	this.loadingElement = this.container.find('.loading');
  	this.pageElement = this.container.find('.page');

	}

	ResultadoRoute.fn = ResultadoRoute.prototype;

  /*-----------------------------------------------------------------*/
  /* RUN RESULTADO DA BUSCA
  /*-----------------------------------------------------------------*/

	ResultadoRoute.fn.run = function(callback) {
		console.log('ResultadoRoute run executed');

		this.transition();
		mapas.run();

		$('#timepicker3').timepicker({
	      minuteStep: 5,
	      showInputs: false,
	      disableFocus: true
	    });

	    $("#myDatepickerInput").datepicker();  
	};

  /*-----------------------------------------------------------------*/
  /* TRANSITION
  /*-----------------------------------------------------------------*/

	ResultadoRoute.fn.transition = function() {
		this.loadingElement.fadeOut(TRANSITION_DURATION);
		this.pageElement.fadeIn(TRANSITION_DURATION);
	};

  /*-----------------------------------------------------------------*/
  /* 
  /*-----------------------------------------------------------------*/
	
	return ResultadoRoute;

})();


Pernoite.UsuarioRoute = (function() {

	//PAGE LOADING TRANSITION
	var TRANSITION_DURATION = 1000;

	var mapas = new Pernoite.Mapas(document.body);

	function UsuarioRoute(container) {

		this.container = container;
	  	this.loadingElement = this.container.find('.loading');
	  	this.pageElement = this.container.find('.page');
		
	}

	UsuarioRoute.fn = UsuarioRoute.prototype;

  /*-----------------------------------------------------------------*/
  /* RUN PAGINA DO HOTEL
  /*-----------------------------------------------------------------*/

	UsuarioRoute.fn.run = function(callback) {
		console.log('UsuarioRoute run executed');

		this.transition();
		  
	};

  /*-----------------------------------------------------------------*/
  /* TRANSITION
  /*-----------------------------------------------------------------*/

	UsuarioRoute.fn.transition = function() {
		this.loadingElement.fadeOut(TRANSITION_DURATION);
		this.pageElement.fadeIn(TRANSITION_DURATION);
	};
	
	return UsuarioRoute;
})();
