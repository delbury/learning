const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList' && mutation.addedNodes.length) {
      mutation.addedNodes.forEach(node => {
        if (node.id === 'test-element') {
          console.log(node);
          node.remove();
        }
      });
    }
  });
});

observer.observe(document.documentElement, { childList: true, subtree: true });