<!doctype html>
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js"><!--<![endif]-->

<head>
  <meta charset="UTF-8">
  <title>Experiements</title>
  <link rel="shortcut icon" href="https://webfactor.ch/images/favicon.png" />
  <style>

    * { -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;margin:0;padding:0;}
    
    body {font-family:'Quicksand', monospace;background:white;}

    h1 {
      text-align: center;
      font-size:4em;
      padding:30px 0 30px;
    }

    a {color:#32B1E8;-webkit-transition:all 0.2s;text-decoration: none}
    a:hover {color: rgb(50,100,215);}


    .project_container {
        display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
        flex-wrap:wrap;
            -ms-flex-wrap: wrap;
    }




    .project {
        min-width: calc(100% - 30px);
        max-width: calc(100% - 30px);
        flex: 1 auto 0;
        -webkit-box-flex: 1;
        -ms-flex: 1 auto 0px;
   padding:20px;
      border:1px solid #f1f1f1;
      margin: 0 15px 30px;
      display: block;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
      overflow: hidden
    }
    @media (min-width:568px){
        .project{
            min-width: calc(50% - 30px);
            max-width: calc(50% - 30px);
            margin: 0 15px 30px;
        }
    }
    @media (min-width:768px){
        .project{
            min-width: calc(33% - 30px);
            max-width: calc(33% - 30px);
            margin: 0 15px 30px;
        }
    }
    @media (min-width:992px){
        .project{
            min-width: calc(25% - 30px);
            max-width: calc(25% - 30px);
            margin: 0 15px 30px;
        }
    }

    .project:hover {
      box-shadow: 0 0 30px rgba(0,0,0,0.1)
    }

    h2 {
      padding:0 0 40px;
    word-wrap: break-word;
    }
    p {
      color:#888;
    }

    input {padding:10px;position: absolute;top: 15px;right: 15px;font-size: 1em}

    footer { background:#32b1e8;margin:30px 0 0;padding:30px; }
    footer a, footer a:hover {color:white;display: block}

  </style>
</head>

<body>




<?php 
 $path = '.';

	 # '.' for current 

    $projectArray = array();

    foreach (new DirectoryIterator($path) as $file) {
     if($file->isDot()) continue;
     if($file->isDir()){
       $projectArray[$file->getMTime()] = $file->getFilename();

     }
   }


   krsort($projectArray);


   $j = $i=count($projectArray) ;

   $max_size = 35;
   $min_size = 10;
   $font_int =  ($max_size - $min_size) / ($j);
   $k = 0;
   ?>


    <h1>Projects</h1>
    <input type="text" name="search" placeholder="search for projects" id="search" />
   <div class="project_container">
      <?php foreach ($projectArray as $date => $name)  : ?>
        <?php  $opacity = ($i+6)/($j-1); ?>
        <?php  $fontsize = $font_int * ($i - 1) + $min_size; ?>

         <a id="<?php echo $name; ?>"  href="<?php echo $name; ?>" class="project">
           <h2><?php echo  $name; ?></h2>
           <p>Modified: <?php echo date('d M Y ' , $date) ; ?> </p>
         </a>

       <?php  $i=$i-1; $k++; ?>
     <?php endforeach; ?>

 </div>






<script type="text/javascript">

  var projects = document.getElementsByTagName('a');

  for (var i = 0 ; i <  projects.length ; i++) {
     project = projects[i];

  }


  var search = document.getElementById('search');

  search.focus();


    document.addEventListener('keyup', function(e){
     // e.preventDefault();

      val = search.value;

      for (var i = 0 ; i <  projects.length ; i++) {
         project = projects[i];
         name = project.id;

         if ( name.indexOf(val) !== -1  ) {
            project.style.display = 'block';
         } else {
            project.style.display = 'none';
         }

      }



    });


</script>
</body>
</html>
