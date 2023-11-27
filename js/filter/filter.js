const filterPanel = document.querySelector('.img-filters');

const showFilterPanel = () => {
  filterPanel.classList.remove('img-filters--inactive');
};

export {showFilterPanel};

