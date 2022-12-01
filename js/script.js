{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log(clickedElement);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    let hrefAttribute = clickedElement.getAttribute('href');
    hrefAttribute = hrefAttribute.substring(1);
    console.log(hrefAttribute);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const rightArticle = document.getElementById(hrefAttribute);
    console.log(rightArticle);

    /* [DONE] add class 'active' to the correct article */
    rightArticle.classList.add('active');
  };
  
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.sidebar .tags';

  const generateTitleLinks = function(customSelector = ''){
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(articles);
    let html = '';
    /* for each article */
    for(let article of articles){
      /* get the article id */
      const articleId = article.getAttribute('id');
      console.log(articleId);
      /* find the title element and get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);
      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      /* insert link into titleList */
      html = html + linkHTML;
      console.log(html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);
    
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  function generateTags(){
    let allTags = [];
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' '); 
      console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        console.log(tag);
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        /* add generated code to html variable */
        html= html + linkHTML;
        console.log(html);
        if(allTags.indexOf(linkHTML) == -1){
          allTags.push(linkHTML);
        }
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      console.log(tagsWrapper);
    /* END LOOP: for every article: */
    }
    const tagList = document.querySelector(optTagsListSelector);
    console.log(tagList);
    console.log(allTags);
    tagList.innerHTML = allTags.join(' ');
  }
  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(clickedElement);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.substring(5);
    console.log(tag);
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeTagLinks);
    /* START LOOP: for each active tag link */
    for(let activeTagLink of activeTagLinks){
      /* remove class active */
      activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const equalTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log(equalTagLinks);
    /* START LOOP: for each found tag link */
    for(let equalTagLink of equalTagLinks){
      /* add class active */
      equalTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('.list-horizontal a');
    console.log(tagLinks);
    /* START LOOP: for each link */
    for(let tagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();

  const generateAuthors = function(){
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){
      const authorsWrapper = article.querySelector(optArticleAuthorSelector);
      const articleAuthor = article.getAttribute('data-author');
      authorsWrapper.innerHTML ='by ' + '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';
      console.log(authorsWrapper);
    }
  }
  generateAuthors();

  const authorClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('pod tym powinno byc clicked element');
    console.log(clickedElement);
    const correctClickedElement = clickedElement.querySelector('a');
    console.log(correctClickedElement);
    const href = correctClickedElement.getAttribute('href');
    console.log(href);
    const author = href.substring(8)
    console.log(author);
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    console.log(activeAuthorLinks);
    for(let activeAuthorLink of activeAuthorLinks){
      activeAuthorLink.classList.remove('active');
    }
    const equalAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log(equalAuthorLinks);
    for(let equalAuthorLink of equalAuthorLinks){
      equalAuthorLink.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors(){
    const AuthorsLinks = document.querySelectorAll(optArticleAuthorSelector);
    console.log(AuthorsLinks);
    for(let AuthorsLink of AuthorsLinks){
      AuthorsLink.addEventListener('click', authorClickHandler);
    }
  }
  
  addClickListenersToAuthors();
}