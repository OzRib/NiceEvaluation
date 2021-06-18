require 'erb'

CLASSESDIR = File.dirname(__FILE__)
BASEDIR = "#{CLASSESDIR}/.."

class Template
  def initVars
    @@themes = self.getThemes()
    @@initialized = true
  end

  def initialize(name, theme, questions)
    begin
      unless @@initialized
        self.initVars()
      end
    rescue
      self.initVars()
    end
    
    @questions = questions
    @theme = self.getTheme(theme)
    @subjectName = name
    self.loadRenders()
  end

  def getThemes
    archives = Dir["#{BASEDIR}/prova/*.erb"]
    names = archives.map do |archive|
      archive.gsub("#{BASEDIR}/prova/", '').gsub('.erb', '')
    end
    themes = {}

    for number in 0..names.length-1 do
      name = names[number]
      archive = archives[number]

      themes[name] = {
        'name'=>name,
        'prova'=>archive,
        'gabarito'=>"#{BASEDIR}/gabarito/#{name}.erb"
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

  def loadRenders
    erbProva = ERB.new(File.read(@theme['prova']))
    erbProva.def_method(Template, 'renderProva()')

    erbGabarito = ERB.new(File.read(@theme['gabarito']))
    erbGabarito.def_method(Template, 'renderGabarito()')
  end
end
