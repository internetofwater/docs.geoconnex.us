# docs.geoconnex.us


A repository to create a documentation website for guidance for data publishers, aggregators, and users.


Following the install and build guide at https://kirenz.github.io/codelabs/codelabs/jupyter-book/#0

```
conda install -c conda-forge jupyter-book

```

in this repo the book has been created and made in the books/iowbook directory.

_cd_  into that directory and build the book with: 

```
jupyter-book build .
```

This will create the HTML version of the book in 

```
\_build/html
```

If you wish to remove the book and rebuild you can use:

```
 jupyter-book clean . --all 
```

```
 jupyter-book clean . --all; jupyter-book build .
```


You can also build a nice PDF of your book with 

```
 jupyter-book build . --builder pdflatex
```

Note this does require a full LaTeX installion with an engine like xelatex which 
can be quite large.  So unless you need a nice PDF version this is not a required step. 
If you do the results can be found in \_build/latex

