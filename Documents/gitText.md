# Guía de Git para este proyecto

Última actualización: enero 2026  
Versión recomendada de Git: ≥ 2.35

## Tabla de contenido

1. [Configuración inicial](#configuración-inicial)
2. [Flujo de trabajo recomendado](#flujo-de-trabajo-recomendado)
3. [Nomenclatura de ramas](#nomenclatura-de-ramas)
4. [Mensajes de commit (Convención)](#mensajes-de-commit-convención)
5. [Comandos más útiles](#comandos-más-útiles)
6. [Flujo típico día a día](#flujo-típico-día-a-día)
7. [Resolución de conflictos](#resolución-de-conflictos)
8. [Buenas prácticas & Tips](#buenas-prácticas--tips)
9. [Comandos de emergencia / recuperación](#comandos-de-emergencia--recuperación)
10. [Recursos recomendados](#recursos-recomendados)

## Configuración inicial (hacer UNA VEZ)

```bash
# Tu identidad (¡muy importante!)
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tu.email@empresa.com"

# Editor preferido (elige el tuyo)
git config --global core.editor "code --wait"          # VS Code
# git config --global core.editor "nvim"               # Neovim
# git config --global core.editor "nano"               # Nano (básico)

# Muy recomendado - habilita colores y mejora la experiencia
git config --global color.ui auto
git config --global core.autocrlf input               # Linux/Mac
# git config --global core.autocrlf true              # Windows

# Opcionales pero muy útiles
git config --global pull.rebase true                  # pull hace rebase por defecto
git config --global fetch.prune true                  # elimina ramas remotas borradas
git config --global init.defaultBranch main           # rama principal = main (no master)