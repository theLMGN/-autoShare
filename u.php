<?php
if($_SERVER["REMOTE_ADDR"]=='5.198.117.21'){

    

    // open the output file for writing
    $base64_string = $_POST["base64"];
    $temp = tempnam(".","f");
    $output_file = $temp . $_POST["type"];
    $ifp = fopen( $output_file, 'wb' ); 

    // split the string on commas
    // $data[ 0 ] == "data:image/png;base64"
    // $data[ 1 ] == <actual base64 string>
    $data = explode( ',', $base64_string );

    // we could add validation here with ensuring count( $data ) > 1
    fwrite( $ifp, base64_decode( $data[ 1 ] ) );

    // clean up the file resource
    fclose( $ifp );
    chmod($output_file, 0644);
    print $output_file; 
} else {
    die("You have been IP Banned");
}
?>