(function() {
	var forEach = function (list, cb) {
		for (var i = 0;i < list.length; i++) {
			cb(list[i], i);
		}
	};

	var setSelected = function(learnmoreElement) {
		return function (event) {
			history.pushState(null, "", location.href.split("?")[0]);
			
			var newSelected = event.target;
			var className = newSelected.className;
			var currentlySelected = document.getElementsByClassName('learnmore-selected');
			var currentlySelectedElement = document.getElementsByClassName('learnmore-selected-element')[0];
			var newlySelectedElement = document.getElementsByClassName('learnmore-unselected-element')[0];

			if (!className.match('learnmore-selected')) {
				forEach(currentlySelected, function(element) {
					element.setAttribute('class', 'learnmore-not-selected');
				});
				currentlySelectedElement.setAttribute('class', 'learnmore-unselected-element');
				if (learnmoreElement.name === 'hub') {
					currentlySelectedElement.setAttribute(
						'style',
						'height:' + (newlySelectedElement.offsetHeight + 120) + 'px; overflow:hidden;'
					)
				}
				else {
					newlySelectedElement.setAttribute(
						'style',
						'height:' + learnmoreElement.initialHeight + 'px; overflow:visible;'
					)
				}
				newlySelectedElement.setAttribute('class', 'learnmore-selected-element');
				newSelected.setAttribute('class', 'learnmore-selected');
			}
		}
	};

	docReady(function () {
		var learnmoreTimelineSelector = document.getElementById('learnmore-timeline-selector');
		var learnmoreHubSelector = document.getElementById('learnmore-hub-selector');
		var learnmoreTimeline = document.getElementById('learnmore-timeline');
		var learnmoreHub = document.getElementById('learnmore-hub');

		learnmoreTimeline.setAttribute(
			'style',
			'height:' + (learnmoreTimeline.offsetHeight + 120) + 'px;'
		)

		var timelineSelecter = setSelected({
			element: learnmoreTimeline,
			initialHeight: learnmoreTimeline.offsetHeight,
			name: 'timeline',
		});
		var hubSelecter = setSelected({
			element: learnmoreHub,
			initialHeight: learnmoreTimeline.offsetHeight,
			name: 'hub',
		});
		
		learnmoreTimelineSelector.addEventListener('click', timelineSelecter);
		learnmoreHubSelector.addEventListener('click', hubSelecter);

		var href = window.location.href;
		var isLearnHubSearch = href.match(/\?search/);

		if (isLearnHubSearch) {
			hubSelecter({target: learnmoreHubSelector});
		}
		document.getElementsByClassName('learnmore-elements')[0].setAttribute('style', 'display:inherit;');
	});
})();