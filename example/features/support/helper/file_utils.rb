#Helper class.
module File_Utils

  #Creates directory together with parent directories if they do not exist
  #Dir.mkdir only creates folders whose parents exist
  def self.mkdir(directory)
    aux = ""
    #split fullpath directory into separate folder nodes
    directory.split("/").each do |folder|
      #append child folder to parent directory
      aux << "#{folder}/"
      #creates folder in directory tree
      Dir.mkdir aux unless File.directory? aux
    end
  end
end