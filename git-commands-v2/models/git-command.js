class GitCommand {
    constructor(working_directory){
        this.working_directory = working_directory;
    }
    //Command: git init 
    init(){
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    status(){
        const modified_files = Object.keys(this.working_directory.new_changes);
    
        if (modified_files.length > 0) {
            const modified_files_str = modified_files.join('\n');
            const num_changes = modified_files.length;
            return `You have ${num_changes} change/s.\n${modified_files_str}`;
        } else {
            return 'You have 0 change/s.\n';
        }
    }

    //Command: git add <filename/file directory/wildcard> 
    add(path_file){
        let modified_files = this.working_directory.new_changes;
    
        if (path_file === ".") {
            for (let file in modified_files) {
              this.staging.push(modified_files[file]);
              delete modified_files[file];
            }
            return "Successfully added as index file/s.";
          }
    
        if(path_file === "*") {
            let added = false;
            for(let file in modified_files) {
                this.staging.push(modified_files[file]);
                delete modified_files[file];
                added = true;
            }
            if(added) {
                return "Successfully added as index file/s.";
            } else {
                return `Failed to add ${path_file}! File is not modified or missing.`;
            }
        }
    
        if(modified_files[path_file]){
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];
            return "Successfully added as index file/s.";
        }
    
        return `Failed to add ${path_file}! File is not modified or missing.`;
    }
    

    //Command: git commit -m "<message>"
    commit(message){
        if(this.staging.length > 0){
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push(){   
        if(this.local_repository.length > 0){
            return "Done pushing to remote repository.";
        } 
        else {
            return "Nothing to push. No committed file found.";
        }     
    }
}


module.exports = GitCommand;
