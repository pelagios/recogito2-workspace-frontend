# A simple helper to copy the contents of the build folder to Recogito.
# Use at your own risk!
npm run build

echo "Removing JS and view templates from previous build"
rm -rf ../recogito2/public/javascripts/ui/static/
rm ../recogito2/app/views/my/profile.scala.html
rm ../recogito2/app/views/my/workspace.scala.html

echo "Copying files from /build folder"
cp -a ./build/static/ ../recogito2/public/javascripts/ui/.
cp ./build/profile.scala.html ../recogito2/app/views/my/.
cp ./build/workspace.scala.html ../recogito2/app/views/my/.
