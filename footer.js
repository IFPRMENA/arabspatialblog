var FOOTER_MOCK_OBJ = {
		
	"socialMediaLinks":{
		"facebook":{"url":{"en":"www.facebook.com", "ara":"www.facebook.com"}},
		"twitter":{"url":{"en":"www.twitter.com", "ara":"www.twitter.com"}},
		"blog":{"url":{"en":"www.blog.com", "ara":"www.blog.com"}}
	},
	"spatialSelector":{
		"button":{"text":{"en":"Go to another Spatial","ara":""}},
		"description":{"text":{"en":"Select a Spatial from the list below.","ara":""}},
		"spatials":[
		   {"text":{"en":"Iraq Spatial","ara":""},"url":{"en":"www.arabspatial.org/iraq?lang=en","ara":"www.arabspatial.org/iraq?lang=ara"}},
		   {"text":{"en":"Egypt Spatial","ara":""},"url":{"en":"www.arabspatial.org/egypt?lang=en","ara":"www.arabspatial.org/egypt?lang=ara"}},
		   {"text":{"en":"Yemen Spatial","ara":""},"url":{"en":"www.arabspatial.org/yemen?lang=en","ara":"www.arabspatial.org/yemen?lang=ara"}}
		]
	},
	"translateButtons":{
		"lang2":{"text":"English"},
		"lang1":{"text":"العربي"}
	}
};

function WSFooter(parentNodeID, model, onClickConfig) {
	
	var self = this;
	self._Model = model;
	
	this.translate = function(langCode) {
		self.goToSpatialButton.html(self._Model['spatialSelector']['button']['text'][langCode]);
	};
	
	self._openURL = function(url) {
		window.open(url, "_blank");
	};
		
	(function init() {
		
		var parentNode = $("#"+parentNodeID);

		var links = $("<div>").addClass("socialMediaLinksContainer").appendTo(parentNode);
		
		$("<div>").addClass("facebookLink icon-Facebook socialMediaLink").appendTo(links).click(function() {
			self._openURL(self._Model['socialMediaLinks']['facebook']['url'][langCode]);
		});
		$("<div>").addClass("twitterLink icon-twitter socialMediaLink").appendTo(links).click(function() {
			self._openURL(self._Model['socialMediaLinks']['twitter']['url'][langCode]);
		});
		$("<div>").addClass("blogLink icon-blog socialMediaLink").appendTo(links).click(function() {
			self._openURL(self._Model['socialMediaLinks']['blog']['url'][langCode]);
		});

		var footerButtons = $("<div>").addClass("toggleLanguageContainer").appendTo(parentNode);
		
		self.goToSpatialButton = $("<div>")
		.addClass("goToSpatialButton")
		.appendTo(footerButtons)
		.click(onClickConfig['onSpatialSelectorClick']);
		
		$("<div>")
		.addClass("lang1 langButton")
		.appendTo(footerButtons)
		.click(onClickConfig['onLang1Click'])
		.html(self._Model['translateButtons']['lang1']['text']);
		
		$("<div>").addClass("langButtonBorder").appendTo(footerButtons).html("/");
		
		$("<div>").addClass("lang2 langButton langButtonSelected")
		.appendTo(footerButtons)
		.click(onClickConfig['onLang2Click'])
		.html(self._Model['translateButtons']['lang2']['text']);
	})();	
}