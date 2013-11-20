require 'yaml'
require 'erb'

class Configuration

  @@base_folder = "./config/"

  def self.base_folder= value
    @@base_folder = value
  end

  # merge a Hash into current configuration values
  def self.merge(hash)
    merge_hashes_recursive(@@values, hash)
  end

  # load and merge configuration file(s) in order
  #
  # Notes:
  # - yml files are search on Configuration.base_folder
  # - files are preprocessed with ERB
  #
  # args: names is a "+" separated list of config names, if a name has "-" each level is loaded
  # eg: "a+b-c-d+e/f" will load: "a.yml", "b.yml", "b-c.yml", "b-c-d.yml", and "e/f.yml"
  def self.load names
    groups = names.split "+"
    groups.each do |group|
      parts = group.split "-"
      filename = parts[0]
      parts.each do |part|
        fullpath = @@base_folder + filename + '.yml'
        if File.file? fullpath 
          self.merge(YAML.load(ERB.new(File.read(fullpath)).result))
        end
        filename += "-" + part
      end
    end
  end

  def self.clear
    @@values = Hash.new
    # enable dot-access for config Hash
    def @@values.method_missing(n)
       self[n.to_s]
    end
  end

  # enable direct Hash access from this class
  def self.[] key
    @@values[key]
  end

  # enable direct Hash access from this class
  def self.[]= key, value
    @@values[key] = value
  end

  # enable dot-access to config values
  def self.method_missing(n, *arguments, &block)
    @@values[n.to_s]
  end

  self.clear unless defined? @@values
end

def merge_hashes_recursive(hash, hash2)
  hash2.each_pair do |k,v2|
    v = hash[k]
    if v.is_a?(Hash)
      merge(v, v2)
    else
      hash[k] = v2
      if v2.is_a?(Hash)
        # enable dot-access for nested Hashes
        def v2.method_missing(n)
           self[n.to_s]
        end
      end
    end
  end
end
