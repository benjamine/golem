
# nasty fix for "stdin: is not a tty" false error msg
sed -i 's/^mesg n$/tty -s \&\& mesg n/g' /root/.profile

aptgetupdate=true
if [ -f /var/cache/apt.lastday ]; then
    if [ `date +%Y-%m-%d` = `cat /var/cache/apt.lastday` ]; then
        echo 'apt-get already updated today'
        aptgetupdate=false
    fi
fi
if $aptgetupdate; then
    echo -n "apt-get update..."
    apt-get -y update -qq
    echo "done"
    date +%Y-%m-%d > /var/cache/apt.lastday
fi

if ! grep -q HEADLESS /etc/environment
then
    echo 'setting HEADLESS="true"'
    echo 'HEADLESS="true"' >> /etc/environment
fi
if ! grep -q GOLEM /etc/environment
then
    echo 'setting GOLEM="true"'
    echo 'GOLEM="true"' >> /etc/environment
fi

if ! grep -q LC_INITIALDIR /home/vagrant/.bashrc
then
    echo 'setting cd initial dir at .bashrc'
    echo '# Take ssh initial dir from client var' >> .bashrc
    echo 'export INITIALDIR=$LC_INITIALDIR' >> .bashrc
    echo 'if [ -n $INITIALDIR ]; then cd $INITIALDIR;fi' >> .bashrc
fi

if [ -f /home/vagrant/.zshrc ]; then
  if ! grep -q "golem $PROMPT" /home/vagrant/.zshrc
  then
    echo 'setting golem prompt at .zshrc'
    echo '# identify as golem in prompt' >> .zshrc
    echo 'export PROMPT="golem $PROMPT"' >> .zshrc
  fi
  if ! grep -q LC_INITIALDIR /home/vagrant/.zshrc
  then
    echo 'setting cd initial dir at .zshrc'
    echo '# Take ssh initial dir from client var' >> .zshrc
    echo 'export INITIALDIR=$LC_INITIALDIR' >> .zshrc
    echo 'if [ -n $INITIALDIR ]; then cd "${INITIALDIR#* }";fi' >> .zshrc
  fi
fi
