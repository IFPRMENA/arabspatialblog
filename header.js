
var HEADER_MOCK_OBJ = {
		
	"logoText":{"text":{"en":"Arab Spatial","ara":"الحيز العربي"}},
	"map":{"text":{"en":"map","ara":"خريطة"}},
	"blog":{"text":{"en":"blog","ara":"لعربي"}}
};


function WSHeader(parentNodeID, model, onClickConfig) {
	
	var self = this;
	self._Model = model;
	
	this.translate = function(langCode) {
		
		self.logoButton.html(self._Model['logoText']['text'][langCode]);
		self.mapButton.html(self._Model['map']['text'][langCode]);
		self.blogHeaderButton.html(self._Model['blog']['text'][langCode]);
	};
	
	self._onNavButtonClick = function(node, callback) {
		node.addClass("headerTextButtonSelected").siblings().removeClass('headerTextButtonSelected');
		callback();
	};
		
	(function init() {
		
		var parentNode = $("#"+parentNodeID);
		self.logoButton = $("<div>").addClass("logoText headerFooterTextStyle").appendTo(parentNode).click(function() {
			$(".headerTextButtonSelected").removeClass('headerTextButtonSelected');
			onClickConfig['onLogoClick']();
		});
		var buttonsNode = $("<div>").addClass("headerTextButtons headerFooterTextStyle").appendTo(parentNode); 
		self.mapButton = $("<div>").addClass("mapSectionButton headerTextButton headerFooterTextStyle").appendTo(buttonsNode).click(function() {
			self._onNavButtonClick($(this), onClickConfig['onMapClick']);
		});				
		self.blogHeaderButton = $("<div>").addClass("blogSectionButton headerTextButton headerFooterTextStyle").appendTo(buttonsNode).click(function() {
			self._onNavButtonClick($(this), onClickConfig['onBlogClick']);
		});
	})();
}