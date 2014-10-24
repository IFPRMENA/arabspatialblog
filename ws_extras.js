function DropDownController(parentDivID, items, onSelect) {
	
	var self = this;
	self._dropDownNode = null;
	self._dropDownLabelNode = null;
	self._dropDownListNode = null;
	self._dropDownButtonNode = null;
	self._dropDownButtonArrowNode = null;
	self._DROPDOWN_ANIM_DURATION_MS = 200;
	self._Value = null;
	self._Items = items;
	self._OnSelect = onSelect;
	
	this.translate = function() {
		
	};
	
	this.updateValues = function(items ,dontOverwriteExistingValues) {
		
		if(!dontOverwriteExistingValues) {
			self._Items = items;
		}
		self._updateDropDownItems(items);	
	};
	
	this.selectValue = function(valueLabel) {
		for(var i=0;i<self._Items.length;i++) {
			if(self._Items[i]['label'] === valueLabel) {
				self._OnSelect(obj);
				break;
			}
		};
	};
 
	this.selectFirstValue = function() {
		self._OnSelect(self._Items[0]);
	};
	
	this.values = function() {
		return self._Items.slice(0);
	};
	
	this.value = function() {
		return self._Value;
	};
	
	this.hide = function() {
		self._dropDownNode.hide();
	};
	
	this.show = function() {
		self._dropDownNode.show();
	};
	
	self._openDropDownMenu = function() {
		
	    self._dropDownListNode.show();
		self._dropDownButtonArrowNode.addClass("rotate180Deg");
	    var curHeight = self._dropDownListNode.height();
	    var autoHeight = self._dropDownListNode.css('height', 'auto').height();
		self._dropDownListNode.height(curHeight).animate({height: autoHeight}, {duration:self._DROPDOWN_ANIM_DURATION_MS, complete:function() {

		}});		
	};
	
	self._closeDropDownMenu = function() {
		self._dropDownListNode.animate({height:0}, {duration:self._DROPDOWN_ANIM_DURATION_MS, complete:function() {
			self._dropDownListNode.hide();
			self._dropDownButtonArrowNode.removeClass("rotate180Deg");
		}});
	};
	
	self._toggleDropDownMenu = function() {
		self._dropDownListNode.height() === 0 ? self._openDropDownMenu():self._closeDropDownMenu();
	};
	
	self._updateDropDownItems = function(items) {
		
		var items = items ? items : self._Items;
		self._dropDownListNode.empty();
		var currentSelectedItemInList = false;
		
		items.forEach(function(itemObj) {
			
			var label = itemObj['label'];
			
			if(self._Value && self._Value['id'] && !currentSelectedItemInList) {
				currentSelectedItemInList = self._Value['id'] === itemObj['id'];
			}
			
			var itemNode = $('<div>').addClass("dropDownItem overflowEllipsis").html(label).click(function() {
				self._dropDownLabelNode.html(label);
				self._Value = itemObj;
				self._OnSelect(itemObj);
				self._closeDropDownMenu();
			});
			self._dropDownListNode.append(itemNode);
		});
		
		if(!currentSelectedItemInList && items.length > 0) {
			self._dropDownLabelNode.html(items[0]['label']);
			self._Value = items[0];	
		}
	};
	
	(function init() {
		
		self._dropDownLabelNode = $('<div>').addClass("dropDownLabel dropDownItem overflowEllipsis");
		self._dropDownButtonNode = $('<div>').addClass("dropDownButton");
		self._dropDownButtonArrowNode = $('<div>').addClass("dropDownButtonArrow");
		self._dropDownButtonNode.append(self._dropDownButtonArrowNode);		
		var dropDownLabelItemsNode = $('<div>').addClass("dropDownLabelItems");
		dropDownLabelItemsNode.append(self._dropDownButtonNode).append(self._dropDownLabelNode);
		self._dropDownListNode = $('<div>').addClass("dropDownList");
		self._dropDownNode = $('<div>').addClass("dropDownContainer").append(dropDownLabelItemsNode).append(self._dropDownListNode).appendTo(parentDivID);		
		self._updateDropDownItems();
		self._dropDownButtonNode.click(self._toggleDropDownMenu);
		self._dropDownLabelNode.click(self._toggleDropDownMenu);
	})();
}
var FOOTER_MOCK_OBJ = {
		
		"socialMediaLinks":{
			"facebook":{"url":{"en":"www.facebook.com"}},
			"twitter":{"url":{"en":"www.twitter.com"}},
			"blog":{"url":{"en":"www.blog.com"}}
		},
		"spatialSelector":{
			"button":{"text":{"en":"Go to another Spatial"}},
			"description":{"text":{"en":"Select a Spatial from the list below."}},
			"spatials":[
			   {"label":"Iraq Spatial","url":"http://54.191.215.52/ArabSpatial/?id=IRQ"},
			   {"label":"Egypt Spatial","url":"http://54.191.215.52/ArabSpatial/?id=EGY"},
			   {"label":"Yemen Spatial","url":"http://54.191.215.52/ArabSpatial/?id=YEM"}
			]
		},
		"translateButtons":{
			"lang1":{"text":"English"},
			"lang2":{"text":"العربي"}
		}
	};

	function WSFooter(parentNodeID, model, onClickConfig) {
		
		var self = this;
		self._Model = model;
		self._OnTranslateFunctions = [];
		
		this.translate = function(langCode) {
			self._OnTranslateFunctions.forEach(function(func) {
				func(langCode);
			});
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

			var spatialSelectorController = new SpatialSelectorController(self._Model['spatialSelector']);
			var footerButtons = $("<div>").addClass("toggleLanguageContainer").appendTo(parentNode);
			var goToSpatialButton = $("<div>").addClass("goToSpatialButton").appendTo(footerButtons).click(function() {
				spatialSelectorController.onSpatialsButtonClick();
			});		
			self._OnTranslateFunctions.push(function(langCode) {
				goToSpatialButton.html(self._Model['spatialSelector']['button']['text'][langCode]);
				spatialSelectorController.translate(langCode);
			});
			
			var onLangButtonClick = function(node, callback) {
				node.addClass("langButtonSelected").siblings().removeClass("langButtonSelected");
				callback();
			};
			
			$("<div>").addClass("lang1 langButton langButtonSelected").appendTo(footerButtons).click(function() {
				onLangButtonClick($(this), onClickConfig['onLang1Click']);
			}).html(self._Model['translateButtons']['lang1']['text']);
			
			$("<div>").addClass("langButtonBorder").appendTo(footerButtons).html("/");
			
			$("<div>").addClass("lang2 langButton").appendTo(footerButtons).click(function() {
				onLangButtonClick($(this), onClickConfig['onLang2Click']);
			}).html(self._Model['translateButtons']['lang2']['text']);
			
		})();	
	}


	var HEADER_MOCK_OBJ = {
		
		"logoText":{"text":{"en":"Arab Spatial","ara":"الحيز العربي"}, "url":{"en":"http://54.191.215.52/ArabSpatial/?id=MENA","ara":""}},
		"map":{"text":{"en":"map","ara":"خريطة"}, "url":{"en":"http://54.191.215.52/ArabSpatial/map.html?id=MENA","ara":""}},
		"blog":{"text":{"en":"blog","ara":"لعربي"}, "url":{"en":"http://50.62.145.200/arabspatialblog/fullsite/","ara":""}}
	};


	function WSHeader(parentNodeID, model, onClickConfig) {
		
		var self = this;
		self._Model = model;
		self._OnTranslateFunctions = [];
		
		this.translate = function(langCode) {
			self._OnTranslateFunctions.forEach(function(func) {
				func(langCode);
			});
		};

		self._openLink = function(url) {
			window.open(url, "_self");
		};
			
		(function init() {
			
			var parentNode = $("#"+parentNodeID);
			var logoButton = $("<a>").addClass("logoText headerFooterTextStyle").attr("target", "_self").appendTo(parentNode);
			var buttonsNode = $("<div>").addClass("headerTextButtons headerFooterTextStyle").appendTo(parentNode); 
			var mapButton = $("<a>").addClass("mapSectionButton headerTextButton headerFooterTextStyle").attr("target", "_self").appendTo(buttonsNode);
			var blogButton = $("<a>").addClass("blogSectionButton headerTextButton headerFooterTextStyle").attr("target", "_self").appendTo(buttonsNode);
			
			self._OnTranslateFunctions.push(function(langCode) {
				
				logoButton.html(self._Model['logoText']['text'][langCode]);
				logoButton.attr("href", self._Model['logoText']['url'][langCode]);
				
				mapButton.html(self._Model['map']['text'][langCode]);
				mapButton.attr("href", self._Model['map']['url'][langCode]);

				blogButton.html(self._Model['blog']['text'][langCode]);
				blogButton.attr("href", self._Model['blog']['url'][langCode]);
			});
		})();
	}
	function SpatialSelectorController(model) {
		
		var self = this;
		self._Model = model;
		self._OnTranslateFunctions = [];
		self._SpatialSelectorWrapper = null;
		
		this.translate = function(langCode) {
			self._OnTranslateFunctions.forEach(function(func) {
				func(langCode);
			});
		};
		
		this.onSpatialsButtonClick = function() {
			self._SpatialSelectorWrapper.toggle();
		};
		
		(function init() {

			self._SpatialSelectorWrapper = $("<div>").addClass("spatialSelectorWrapper").appendTo($('body'));
			var spatialSelectorMenu = $("<div>").addClass("spatialSelectorMenu").appendTo(self._SpatialSelectorWrapper);	
			var spatialSelectorTitle = $("<div>").addClass("spatialSelectorTitle").appendTo(spatialSelectorMenu);
			var spatialSelectorDropDownContainer = $("<div>").addClass("spatialSelectorDropDownContainer").appendTo(spatialSelectorMenu);
			var dropDownController = new DropDownController(spatialSelectorDropDownContainer, model['spatials'], function(obj) {
				window.open(obj['url'], "_blank");
				self._SpatialSelectorWrapper.hide();
			});

			$("<div>").addClass("spatialSelectorCloseButton icon-icon_close").appendTo(spatialSelectorMenu).click(function() {
				self._SpatialSelectorWrapper.hide();
			});
			self._SpatialSelectorWrapper.hide();
			
			self._OnTranslateFunctions.push(function(langCode) {
				spatialSelectorTitle.html(self._Model['description']['text'][langCode]);
			});
		})();
	}
