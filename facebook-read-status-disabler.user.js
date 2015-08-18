// ==UserScript==
// @name          Facebook sneekycate
// @grant         none
// @description   Blocks the capability of "Seen" and "Typing" in Facebook chat
// @details       This script blocks every POST to http(s)://www.facebook.com/ajax/mercury/change_read_status.php, http(s)://www.facebook.com/ajax/messaging/typ.php, and http(s)://www.facebook.com/ajax/mercury/delivery_receipts.php. (08/18/2015)
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @match         http://*.facebook.com/*
// @match         https://*.facebook.com/*
// @updateURL     https://github.com/OzuYatamutsu/facebook-read-status-disabler/raw/master/facebook-read-status-disabler.user.js
// @version       1.0.1b
// @license       GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @author        Working fork of Facebook Stealth by Loïs Di Qual - http://lois.di-qual.net/ (08/18/2015)
// ==/UserScript==

// BLOCK: "change_read_status", "typ", "delivery_receipts"

function main() {
  // Save the original XHR.open handler
  window.XMLHttpRequest.prototype.trueOpen = window.XMLHttpRequest.prototype.open;

  // Override XHR.open with a custom function
  window.XMLHttpRequest.prototype.open = function() {
    // If its a read-message status, block-it
    if (arguments.length >= 2
      && (arguments["0"].toLowerCase() == "post")
      && (typeof arguments["1"] === "string")
      && (
        (arguments["1"].indexOf("change_read_status", 0) != -1)
        || (arguments["1"].indexOf("delivery_receipts", 0) != -1)
        || (arguments["1"].indexOf("typ", 0) != -1)
        )
    ) {
      return null;
    }
    // If not, send the ajax call
    this.trueOpen.apply(this, arguments);
  };
}

// Call main() in the page scope
var script = document.createElement("script");
script.textContent = "(" + main.toString() + ")();";
document.body.appendChild(script);
