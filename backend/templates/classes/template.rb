require 'erb'

CLASSESDIR = File.dirname(__FILE__)
BASEDIR = "#{CLASSESDIR}/.."

class Template
  def initVars
    @@themes = self.getThemes()
    @@initialized = true
  end

  def initialize(theme, questions)
    begin
      unless @@initialized
        self.initVars()
      end
    rescue
      self.initVars()
    end
    
    @questions = questions
    @theme = self.getTheme(theme)
    self.loadRender()
  end

  def getThemes
    archives = Dir["#{CLASSESDIR}/../*.erb"]
    names = archives.map do |archive|
      archive.gsub("#{CLASSESDIR}/../", '').gsub('.erb', '')
    end
    themes = {}

    for number in 0..names.length-1 do
      name = names[number]
      archive = archives[number]

      themes[name] = {
        'name'=>name,
        'archive'=>archive
      }
    end

    return themes
  end

  def getTheme(name)
    begin
      theme = @@themes[name]
      unless theme
        raise 'Tema inválido'
      end

      return theme
    rescue
      raise "#{name} não é um tema válido"
    end
  end

  def loadRender
    erb = ERB.new(File.read(@theme['archive']))
    erb.def_method(Template, 'render()')
  end
end
